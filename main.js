var whiteTurn=true;
var currentPlayer = 1;
var oppositePlayer = 2;
var mute = false;
var mainMusic;
var effectsVol = .05;
var musicVol = .05;
var winVol = .1;
$(document).ready(initializeApp);


function appendDivs(){
    var newSquare;
    var newToken;
    for(var x=0;x<8;x++){
        for(var y=0;y<8;y++){
            newSquare=$('<div />',{
                'class':'square',
                'row':''+x,
                'column':''+y
            });
            newSquare.appendTo('.gameBoard');
            if(x===3 && y===3 || x===4 && y===4){
                newToken=$('<div />',{
                    'class':'white'
                })
            }else if(x===4 && y===3 || x===3 && y===4){
                newToken=$('<div />',{
                    'class':'black'
                })
            }else{
                newToken=$('<div />',{
                    'class':'empty'
                })
            }
            newToken.appendTo('[row='+x+'][column='+y+']');
        }
    }
}


/////////////////////////////////////////// game audio ///////////////////////////////////////////

function muteAudio() {
    mainMusic.muted=!mainMusic.muted;
    mute = !mute;
    if (mute === false) {
       $(".audioIcon").attr("src", "images/audio-icon.svg")
   } else {
       $(".audioIcon").attr("src", "images/mute-icon.svg")
   }

}

function adjustAudio() {
    $("#volume-modal").show();
}

function musicVolumeAdjust(value) {
    mainMusic.volume = value / 10;
}

function effectsVolumeAdjust(value) {
    effectsVol = value / 10;
}

function winModalVolume(value) {
    winVol = value / 10;
}

function clickAudio(turn) {
    if (mute === true) {
        return;
    }

    var clickSound;
    if (turn) {
        clickSound = new Audio('sounds/player1.mp3');
        clickSound.volume = effectsVol;

    } else {
        clickSound = new Audio('sounds/player2.mp3');
        clickSound.volume = effectsVol;

    }
    clickSound.play();
}

function winSound () {
    if (mute === true) {
        return;
    }
    var winTone = new Audio("sounds/win.mp3");
    winTone.volume = winVol;
    winTone.play();
}

function backGroundMusic () {
    if (mute === true) {
        return;
    }
    mainMusic.volume = musicVol;
    mainMusic.play();
}




// creating Game board dynamically
var gameBoardArray = [];
function createGameBoardArray() {
    for(var i =0; i < 8; i ++) {
        gameBoardArray.push([]);
        for(var e = 0; e < 8; e++) {
            gameBoardArray[i][e] = 0
        }
     }
    gameBoardArray[3][3] = 1;
    gameBoardArray[3][4] = 2;
    gameBoardArray[4][3] = 2;
    gameBoardArray[4][4] = 1;
    return gameBoardArray;
}

function updateGameBoard(row, column) {
    gameBoardArray[row][column] = currentPlayer;

}

function determineValidMove(player, antiPlayer) {
    var countPossibleMoves=0;
    // Coordinates for all 8 possible directions to look
    var directions = [
        [-1, 0],    // N
        [1, 0],     // S
        [0, 1],     // E
        [0, -1],    // W
        [-1, -1],   // NW
        [-1, 1],    // NE
        [1, 1],     // SE
        [1, -1]     // SW
    ];
    // Looking through every single array
    for (var y = 0; y < 8; y++) {
        //Looking through every single item in the outer array
        for (var x = 0; x < 8; x++) {
            //if the spot we are looking at is the current player,
            if (gameBoardArray[y][x] === player) {
                // for all 8 directions
                for(var directionIndex = 0; directionIndex < 8; directionIndex++) {
                    // setting yDirection equal to the 0th item of the directions variable coordinates
                    var yDirection = directions[directionIndex][0];
                    // setting xDirection equal to the 0th item of the directions variable coordinates
                    var xDirection = directions[directionIndex][1];
                    // if the square of the current position PLUS the y direction of interest is NOT undefined,
                    if (gameBoardArray[y + yDirection] !== undefined) {
                        // run the checInDirection function, passing in the current y, current x, yDirection of interest, xDirection of interest,
                        // the current player, and the opposite player
                        checkInDirection(y, x, yDirection, xDirection, player, antiPlayer);
                    }
                }
            }
        }
    }
    // this function will look until finding an empty space, and will stop if the reaching a position that is undefined(outside the grid)
    function checkInDirection(startY, startX, yDirection, xDirection, player, antiPlayer) {
        // if current position plus the direction of interest for both X and Y is undefined(outside the grid)
        if (gameBoardArray[startY + yDirection][startX + xDirection] === undefined) {
            // stop the function
            return;
        }
        // if current position plus the direction of interest for both X and Y is 0,
        if(gameBoardArray[startY + yDirection][startX + xDirection] === 0) {
            // stop the function.
            return;
        }
        // if current position plus the direction of interest for both X and Y is the opposite player (antiplayer),
        if(gameBoardArray[startY + yDirection][startX + xDirection] === antiPlayer) {
            // as long as the current position plus the y and x direction of interest is the opposite player (antiplayer),
            while(gameBoardArray[startY + yDirection][startX + xDirection] === antiPlayer) {
                //increment both Y and X
                // this is so you can keep checking until the end of the board
                // us the initial condition to check if within board, then increment to do work
                startY += yDirection;
                startX += xDirection;
                // if the next y position is undefined,
                if (checkingVerticalBounds(startY, yDirection, startX, xDirection)) {
                    // stop the function
                    return;
                }
                // if the next y and x position is undefined
                if (checkingHorizontalBounds(startY, yDirection, startX, xDirection)) {
                    // stop the function
                    return;
                }
                // if the next position for y and x is empty
                if (checkEmptySpace(startY, yDirection, startX, xDirection)) {
                    // increase possible moves
                    countPossibleMoves++;
                    // add a click handler to the next position for where we are looking at
                    addClickHandler(startY + yDirection, startX + xDirection);
                    // change the value of the corresponding gameboard array to 3 (numeric representation of a valid move)
                    gameBoardArray[startY + yDirection][startX + xDirection] = 3;
                    // then stop the function
                    return;
                }
            }
        }
    }
    function checkingVerticalBounds(startY, yDirection) {
        // if the next y position is undefined,
        if (gameBoardArray[startY + yDirection] === undefined) {
            // stop the function
            return true;
        }
    }

    function checkingHorizontalBounds(startY, yDirection, startX, xDirection) {
        // if the next y and x position is undefined
        if (gameBoardArray[startY + yDirection][startX + xDirection] === undefined) {
            // stop the function
            return true;
        }
    }

    function checkEmptySpace(startY, yDirection, startX, xDirection) {
        // if current position plus the direction of interest for both X and Y is 0,
        if(gameBoardArray[startY + yDirection][startX + xDirection] === 0) {
            // stop the function.
            return true;
        }
    }
    if(blackCount === 0) {
        $(".winPara1").text("Doggo wins!");
    } else if (whiteCount === 0) {
        $(".winPara1").text("Gato wins!");
    }

    if (oppositePlayer === 1) {
        currentPlayer = 1;
        oppositePlayer = 2;
    } else {
        currentPlayer = 2;
        oppositePlayer = 1;
    }
    if(countPossibleMoves===0){
        gameOver(countPieces());
        $(".winModal").css("display", "block");
    }
}

function addClickHandler(row, column) {
    $('div[row='+row+'][column='+column+']').click(addPiece);
    $('div[row='+row+'][column='+column+']').addClass("legalMove");
    if($(".square").hasClass("white") || $(".square").hasClass()) // is this or check needed?
         {
        $("*").off("click").removeClass("legalMove");
    }
}

function removeClickHandlers() {
    $('.square').off("click");
    $('*').removeClass("legalMove");
}


function resetGame() {
    mainMusic.pause();
    mainMusic.currentTime = 0;
    backGroundMusic();
    startTimeMinutes=30;
    startTimeSeconds=0;
    whiteTurn=true;
    currentPlayer = 1;
    oppositePlayer = 2;
    $('.white').removeClass('white');
    $('.black').removeClass('black');
    $('div[row='+3+'][column='+3+']>div').addClass("white");
    $('div[row='+3+'][column='+4+']>div').addClass("black");
    $('div[row='+4+'][column='+3+']>div').addClass("black");
    $('div[row='+4+'][column='+4+']>div').addClass("white");
    recreateBoardArray();
    removeClickHandlers();
    updateStats(countPieces());
    determineValidMove(1, 2);
    $("#player1Marker").addClass('white');
    $("#player2Marker").addClass('black');
    $("#player1Marker").show();
    $("#player2Marker").show();
    $(".winModal").hide();
    $('.scoreP1>div').addClass('white');
    $('.scoreP2>div').addClass('black');
    $('.animate').removeClass('animate');
    $('.animate2').removeClass('animate2');
}







/*-----------------Omer's Code-----------------*/

var pageClicks=0;
function initializeApp(){
    appendDivs();
    mainMusic = new Audio("sounds/background-music.mp3");
    $("*").on("click", function(){
        if(pageClicks===0){
            $(".instructionModal").addClass("hideModals");
            $(".timer").show();
            countDown();
            backGroundMusic();
        }
        pageClicks++;
    });
    createGameBoardArray();
    $(".winModal").hide();
    $("#volume-modal").hide();
    $("#audio-icon").click(adjustAudio);
    updateStats(countPieces());
    addClickHandler();
    determineValidMove(currentPlayer, oppositePlayer);
    $('#player1Marker').addClass('highlightPlayerTurn');
    $('.resetButton').click(resetGame);
    $(".winReset").click(resetGame);

}

function addPiece(){
    var updateBoardRow = $(this).attr("row");
    var updateBoardColumn = $(this).attr("column");
    clickAudio(whiteTurn);
    if(whiteTurn){
        $("#player1Marker").removeClass('highlightPlayerTurn');
        $("#player2Marker").addClass('highlightPlayerTurn');
        $('div',this).removeClass('empty');
        $('div',this).addClass('white');
        clicked($(this).attr('row'),$(this).attr('column'));
        whiteTurn=false;
    }else{
        $("#player1Marker").addClass('highlightPlayerTurn');
        $("#player2Marker").removeClass('highlightPlayerTurn');
        $('div',this).removeClass('empty');
        $('div',this).addClass('black');
        clicked($(this).attr('row'),$(this).attr('column'));
        whiteTurn=true;
    }
    updateGameBoard(updateBoardRow, updateBoardColumn);
}

function clicked(rowNum,colNum){
    var outerSquareSelector='div[row='+rowNum+'][column='+colNum+']';
    for(var i=0;i<8;i++){
        sideFlip(i, outerSquareSelector);
    }
    endTurn();
}

function sideFlip(sideToCheck, squareSelector){//takes in number and checks corresponding adjacent side (1 is top left, rest is clockwise, so left is 7) and flips the tokens that need to be flipped
    var squareOn=$(squareSelector);
    var currRow=parseInt(squareOn.attr('row'));
    var currCol=parseInt(squareOn.attr('column'));
    var colChange=0;
    var rowChange=0;
    var directionArray=[
        function(){
            rowChange=-1;
            colChange=-1;
        },
        function(){
            rowChange=-1;
            colChange=0;
        },
        function(){
            rowChange=-1;
            colChange=1;
        },
        function(){
            rowChange=0;
            colChange=1;
        },
        function(){
            rowChange=1;
            colChange=1;
        },
        function(){
            rowChange=1;
            colChange=0;
        },
        function(){
            rowChange=1;
            colChange=-1;
        },
        function(){
            rowChange=0;
            colChange=-1;
        },
    ];
    directionArray[sideToCheck]();



    var squareOverSelector='div[row='+(currRow+rowChange)+'][column='+(currCol+colChange)+']>div';
    var squareOverSelectorJ='div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div';

    //goes through all adjacent squares starting from north-west, going clockwise
    for(var i=0;i<7;i++){
        if(whiteTurn){

            //if the square being checked is black (opposite)
            if($(squareOverSelector).hasClass('black')){
                $(squareOverSelector).addClass('tag');//give it tag class
                currRow=parseInt(squareOn.attr('row'));
                currCol=parseInt(squareOn.attr('column'));
                var j=2;

                //performs check on squares in the same direction (automatically stops if out of bounds)
                while(currCol + colChange * j <= 7 && currCol + colChange * j >= 0 && currRow + rowChange * j <= 7 && currRow + rowChange * j >= 0){
                    squareOverSelectorJ='div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div';

                    //if its black (opposite)
                    if($(squareOverSelectorJ).hasClass('black')){
                        $(squareOverSelectorJ).addClass('tag');
                    }

                    //if its white (same)
                    else if($(squareOverSelectorJ).hasClass('white')){
                        //changes anything with tag class to white
                        $('.tag').removeClass('black');
                        $('.tag').addClass('animate');
                        setTimeout(function(){$('.animate').removeClass('animate')},800);
                        $('.tag').addClass('white');
                        j+=10;
                    }

                    //if its empty or out of bounds
                    else{
                        j+=10;
                    }

                    j++;
                }
                $('.tag').removeClass('tag');
            }
        }else{
            //does the same of everything above but for the opposite color (black)
            if($(squareOverSelector).hasClass('white')){
                $(squareOverSelector).addClass('tag');
                currRow=parseInt(squareOn.attr('row'));
                currCol=parseInt(squareOn.attr('column'));
                var j=2;
                while(currCol + colChange * j <= 7 && currCol + colChange * j >= 0 && currRow + rowChange * j <= 7 && currRow + rowChange * j >= 0 ){
                    squareOverSelectorJ='div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div';
                    if($(squareOverSelectorJ).hasClass('white')){
                        $(squareOverSelectorJ).addClass('tag');
                    }else if($(squareOverSelectorJ).hasClass('black')){
                        $('.tag').removeClass('white');
                        $('.tag').addClass('animate');
                        setTimeout(function(){$('.animate').removeClass('animate')},800);
                        $('.tag').addClass('black');
                        j+=10;
                    }else{
                        j+=10;
                    }

                    j++;
                }
                $('.tag').removeClass('tag');
            }
        }
    }
}

function endTurn() {
  updateStats(countPieces());
  removeClickHandlers();
  recreateBoardArray();
  determineValidMove(currentPlayer, oppositePlayer);
}

var whiteCount=0;
var blackCount=0;

function countPieces(){//when called returns an array with the amount of white and black pieces ordered respectively
    whiteCount=0;
    blackCount=0;
    whiteCount=$('.gameBoard .white').length;
    blackCount=$('.gameBoard .black').length;
    return [whiteCount, blackCount];
}

function updateStats(arr){
    var whiteScore=arr[0];
    var blackScore=arr[1];
    $('#player-one-score').text(whiteScore);
    $('#player-two-score').text(blackScore);
}

function recreateBoardArray() {
    for(var y=0;y<=7;y++) {
        for (var x = 0; x <= 7; x++) {
            var squareSelector = 'div[row='+y+'][column='+x+']>div';
            if($(squareSelector).hasClass('white')){
                gameBoardArray[y][x]=1;
            }else if($(squareSelector).hasClass('black')){
                gameBoardArray[y][x]=2;
            }else{
                gameBoardArray[y][x]=0;
            }
        }
    }
}

function gameOver(scoreArr){
    winSound();
    overRainbow();
    if(scoreArr[0]>scoreArr[1]){
        $(".winPara1").text("Doggo wins!");
        $(".winImage").addClass("white");
    }else if(scoreArr[1]>scoreArr[0]){
        $(".winPara1").text("Gato wins!");
        $(".winImage").addClass("black");
    }else{
        $(".winPara1").text("Hekin' Wao! You Tied!");
    }
    $('.scoreP1>div').addClass('white');
    $('.scoreP2>div').addClass('black');
}

function overRainbow(){
    var rainbowCount=0;
    var rowStart=0;
    var colStart=0;
    $('.white').removeClass('white');
    $('.black').removeClass('black');
    $('.empty').removeClass('empty');
    $('.square>div').addClass('white');
    var timer=setInterval(function(){
        rowStart=rainbowCount-7;
        if(rowStart<0){ rowStart=0; }
        colStart=rainbowCount-rowStart;
        for(var i=0;i<=colStart - rowStart + 1;i++){
            $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
        }
        if(rainbowCount===14){
            clearTimeout(timer);
        }
        rainbowCount++;
    },200);
}

var startTimeMinutes=30;
var startTimeSeconds=0;

function countDown(){
    var time='';
    var timer=setInterval(function(){
        if(startTimeSeconds === 0 && startTimeMinutes > 0){
            startTimeMinutes--;
            startTimeSeconds = 59;
        }else if(startTimeMinutes === 0 && startTimeSeconds === 0){
            clearTimeout(timer);
            gameOver(countPieces());
        }else if(startTimeSeconds > 0){
            startTimeSeconds--;
        }
        if(startTimeSeconds < 10){
            time = startTimeMinutes + ':0' + startTimeSeconds;
        } else {
            time = startTimeMinutes + ':' + startTimeSeconds;
        }
        $('.timer').text(time);
    },1000);
}
