var whiteTurn=true;
var currentPlayer = 1;
var oppositePlayer = 2;
var mute = false;
var mainMusic;
$(document).ready(initializeApp);





/*-----------------Dylan's Code-----------------*/

function muteAudio() {
    mainMusic.muted=!mainMusic.muted;
    mute = !mute;
    if (mute === false) {
       $(".audioIcon").attr("src", "images/audio-icon.svg")
   } else {
       $(".audioIcon").attr("src", "images/mute-icon.svg")
   }

}


var gameBoardArray =
    [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 2, 0, 0, 0],
        [0, 0, 0, 2, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

function updateGameBoard(row, column) {
    gameBoardArray[row][column] = currentPlayer;

}

function determineValidMove(player, antiPlayer) {

    var countPossibleMoves=0;
    // clear any previously declared valid moves
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            if (gameBoardArray[y][x] === 3) {
                gameBoardArray[y][x] = 0;
            }
        }
    }
    var totalCount = whiteCount + blackCount;
    if(totalCount === 64) {
        gameOver(countPieces());
    }
    //Player 1 turn (white, 1)
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            if (gameBoardArray[y][x] === player) {
                yIndex = y;
                xIndex = x;
                // North
                for (var yIndex = y; yIndex >= 0;) {
                    if (gameBoardArray[yIndex - 1] === undefined) {
                        break;
                    }
                    if (gameBoardArray[yIndex - 1][x] === antiPlayer) {
                        yIndex -= 1;
                    } else if (gameBoardArray[yIndex - 1][x] === 0 && gameBoardArray[yIndex][x] === antiPlayer) {
                        countPossibleMoves++;
                        addClickHandler(yIndex-1, x);
                        gameBoardArray[yIndex-1][x] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //East
                for (var xIndex = x; xIndex < 8; ) {
                    if (gameBoardArray[xIndex + 1] === undefined) {
                        break;
                    }
                    if(gameBoardArray[y][xIndex + 1] === antiPlayer) {
                        xIndex += 1;
                    } else if (gameBoardArray[y][xIndex + 1] === 0 && gameBoardArray[y][xIndex] === antiPlayer) {
                        countPossibleMoves++;
                        addClickHandler(y, xIndex + 1);
                        gameBoardArray[y][xIndex + 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //South
                for (var yIndex = y; yIndex < 8;) {
                    if (gameBoardArray[yIndex + 1 ] === undefined) {
                        break;
                    }
                    if (gameBoardArray[yIndex + 1][x] === antiPlayer) {
                        yIndex += 1;
                    } else if (gameBoardArray[yIndex + 1][x] === 0 && gameBoardArray[yIndex][x] === antiPlayer) {
                        countPossibleMoves++;
                        addClickHandler(yIndex + 1, x);
                        gameBoardArray[yIndex + 1][x] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //West
                for (var xIndex = x; xIndex > 0; ) {
                    if (gameBoardArray[xIndex - 1] === undefined) {
                        break;
                    }
                    if(gameBoardArray[y][xIndex - 1 ] === antiPlayer) {
                        xIndex -= 1;
                    } else if (gameBoardArray[y][xIndex - 1] === 0 && gameBoardArray[y][xIndex] === antiPlayer) {
                        countPossibleMoves++;
                        addClickHandler(y, xIndex - 1);
                        gameBoardArray[y][xIndex - 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                // NorthEast
                for (var yIndex = y, xIndex = x; yIndex >= 0 && xIndex < 8;) {
                    if (gameBoardArray[yIndex - 1] === undefined || gameBoardArray[xIndex + 1] === undefined) {
                        break;
                    }
                    if (gameBoardArray[yIndex - 1][xIndex + 1] === antiPlayer) {
                        yIndex -= 1;
                        xIndex += 1;
                    } else if (gameBoardArray[yIndex - 1][xIndex + 1] === 0 && gameBoardArray[yIndex][xIndex] === antiPlayer) {
                        countPossibleMoves++;
                        addClickHandler(yIndex-1, xIndex + 1);
                        gameBoardArray[yIndex-1][xIndex + 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //SouthEast
                for (var yIndex = y, xIndex = x; yIndex < 8 && xIndex < 8;) {
                    if (gameBoardArray[yIndex + 1] === undefined || gameBoardArray[xIndex + 1] === undefined) {
                        break;
                    }
                    if (gameBoardArray[yIndex + 1][xIndex + 1] === antiPlayer) {
                        yIndex += 1;
                        xIndex += 1;
                    } else if (gameBoardArray[yIndex + 1][xIndex + 1] === 0 && gameBoardArray[yIndex][xIndex] === antiPlayer) {
                        countPossibleMoves++;
                        addClickHandler(yIndex + 1, xIndex + 1);
                        gameBoardArray[yIndex + 1][xIndex + 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //SouthWest
                for (var yIndex = y, xIndex = x; yIndex < 8 && xIndex >= 0;) {
                    if (gameBoardArray[yIndex + 1] === undefined || gameBoardArray[xIndex - 1] === undefined) {
                        break;
                    }
                    if (gameBoardArray[yIndex + 1][xIndex - 1] === antiPlayer) {
                        yIndex += 1;
                        xIndex -= 1;
                    } else if (gameBoardArray[yIndex + 1][xIndex - 1] === 0 && gameBoardArray[yIndex][xIndex] === antiPlayer) {
                        countPossibleMoves++;
                        addClickHandler(yIndex + 1, xIndex - 1);
                        gameBoardArray[yIndex + 1][xIndex - 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //NorthWest
                for (var yIndex = y, xIndex = x; yIndex >= 0 && xIndex >= 0;) {
                    if (gameBoardArray[yIndex - 1] === undefined || gameBoardArray[xIndex - 1] === undefined) {
                        break;
                    }
                    if (gameBoardArray[yIndex - 1][xIndex - 1] === antiPlayer) {
                        yIndex -= 1;
                        xIndex -= 1;
                    } else if (gameBoardArray[yIndex - 1][xIndex - 1] === 0 && gameBoardArray[yIndex][xIndex] === antiPlayer) {
                        countPossibleMoves++;
                        addClickHandler(yIndex - 1, xIndex - 1);
                        gameBoardArray[yIndex - 1][xIndex - 1] = 3;

                        break;
                    } else {
                        break;
                    }
                }
            }
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
    if($(".square").hasClass("white") || $(".square").hasClass()) {
        $("*").off("click").removeClass("legalMove");
    }
}

function removeClickHandlers() {
    $('.square').off("click");
    $('*').removeClass("legalMove");
}

function clickAudio(turn) {
    if (mute === true) {
        return;
    }

    var clickSound;
    if (turn) {
        clickSound = new Audio('sounds/player1.mp3');
    } else {
        clickSound = new Audio('sounds/player2.mp3');
    }
    clickSound.play();


}

function winSound () {
    if (mute === true) {
        return;
    }
    var winTone = new Audio("sounds/win.mp3");
    winTone.play();
}

function backGroundMusic () {
    if (mute === true) {
        return;
    }
    // var mainMusic = new Audio("sounds/background-music.mp3");
    mainMusic.play();
}

function resetGame() {
    startTimeMinutes=30;
    startTimeSeconds=0;
    //countDown();
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
    $("#player2Marker").hide();
    $(".winModal").hide();
    $('.scoreP1>div').addClass('white');
    $('.scoreP2>div').addClass('black');
    $('.animate').removeClass('animate');
    $('.animate2').removeClass('animate2');
}







/*-----------------Omer's Code-----------------*/

var pageClicks=0;
function initializeApp(){
    mainMusic = new Audio("sounds/background-music.mp3");
    $(".timer").hide();
    $("*").on("click", function(){
        if(pageClicks===0){
            $(".instructionModal").addClass("hideModals");
            $(".timer").show();
            countDown();
            backGroundMusic();
        }
        pageClicks++;
    });

    $(".winModal").hide();
    //$('.square').on('click',addPiece);
    $(".audioMute").click(muteAudio);
    updateStats(countPieces());
    addClickHandler();
    determineValidMove(currentPlayer, oppositePlayer);
    $("#player2Marker").hide();
    $('.resetButton').click(resetGame);
    $(".winReset").click(resetGame);
}

function addPiece(){
    var updateBoardRow = $(this).attr("row");
    var updateBoardColumn = $(this).attr("column");
    clickAudio(whiteTurn);
    if(whiteTurn){
        $("#player1Marker").hide();
        $("#player2Marker").show();
        $('div',this).removeClass('empty');
        $('div',this).addClass('white');
        clicked($(this).attr('row'),$(this).attr('column'));
        whiteTurn=false;
    }else{
        $("#player1Marker").show();
        $("#player2Marker").hide();
        $('div',this).removeClass('empty');
        $('div',this).addClass('black');
        clicked($(this).attr('row'),$(this).attr('column'));
        whiteTurn=true;
    }
    updateGameBoard(updateBoardRow, updateBoardColumn);
}

function clicked(rowNum,colNum){
    var outterSquareSelector='div[row='+rowNum+'][column='+colNum+']';
    for(var i=0;i<8;i++){
        switch(i){
            case 0:
                sideFlip(0, outterSquareSelector);
                break;
            case 1:
                sideFlip(1, outterSquareSelector);
                break;
            case 2:
                sideFlip(2, outterSquareSelector);
                break;
            case 3:
                sideFlip(3, outterSquareSelector);
                break;
            case 4:
                sideFlip(4, outterSquareSelector);
                break;
            case 5:
                sideFlip(5, outterSquareSelector);
                break;
            case 6:
                sideFlip(6, outterSquareSelector);
                break;
            case 7:
                sideFlip(7, outterSquareSelector);
                break;
        }
    }
    endTurn();
}

function sideFlip(num, squareSelector){//takes in number and checks corresponding adjacent side (1 is top left, rest is clockwise, so left is 7) and flips the tokens that need to be flipped
    var squareOn=$(squareSelector);
    var currRow=parseInt(squareOn.attr('row'));
    var currCol=parseInt(squareOn.attr('column'));
    var colChange=0;
    var rowChange=0;

    switch(num){
        case 0:
            rowChange=-1;
            colChange=-1;
            break;
        case 1:
            rowChange=-1;
            colChange=0;
            break;
        case 2:
            rowChange=-1;
            colChange=1;
            break;
        case 3:
            rowChange=0;
            colChange=1;
            break;
        case 4:
            rowChange=1;
            colChange=1;
            break;
        case 5:
            rowChange=1;
            colChange=0;
            break;
        case 6:
            rowChange=1;
            colChange=-1;
            break;
        case 7:
            rowChange=0;
            colChange=-1;
            break;
    }

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
    var squareSelector='';
    for(var x=0;x<=7;x++){
        for(var y=0;y<=7;y++){
            squareSelector = 'div[row='+x+'][column='+y+']>div';
            if($(squareSelector).hasClass('white')){
                whiteCount++;
            }else if($(squareSelector).hasClass('black')){
                blackCount++;
            }
        }
    }
    var pieceCountArr=[whiteCount, blackCount];
    return pieceCountArr;
}

function updateStats(arr){
    var whiteScore=arr[0];
    var blackScore=arr[1];
    $('.scoreP1Count').text(whiteScore);
    $('.scoreP2Count').text(blackScore);
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
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            if (gameBoardArray[y][x] === 3) {
                gameBoardArray[y][x] = 0;
            }
        }
    }
}

function gameOver(arr){
    winSound();
    overRainbow();
    if(arr[0]>arr[1]){
        $(".winPara1").text("Doggo wins!");
        $(".winImage").addClass("white");
    }else if(arr[1]>arr[0]){
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
    //$('.square>div').addClass('empty');
    var timer=setInterval(function(){
        switch(rainbowCount){
            case 0:
                rowStart=0;
                colStart=0;
                for(var i=0;i<1;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 1:
                rowStart=0;
                colStart=1;
                for(var i=0;i<=2;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 2:
                rowStart=0;
                colStart=2;
                for(var i=0;i<=3;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 3:
                rowStart=0;
                colStart=3;
                for(var i=0;i<=4;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 4:
                rowStart=0;
                colStart=4;
                for(var i=0;i<=5;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 5:
                rowStart=0;
                colStart=5;
                for(var i=0;i<=6;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 6:
                rowStart=0;
                colStart=6;
                for(var i=0;i<=7;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 7:
                rowStart=0;
                colStart=7;
                for(var i=0;i<=8;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 8:
                rowStart=1;
                colStart=7;
                for(var i=0;i<=7;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 9:
                rowStart=2;
                colStart=7;
                for(var i=0;i<=6;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 10:
                rowStart=3;
                colStart=7;
                for(var i=0;i<=5;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 11:
                rowStart=4;
                colStart=7;
                for(var i=0;i<=4;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 12:
                rowStart=5;
                colStart=7;
                for(var i=0;i<=3;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 13:
                rowStart=6;
                colStart=7;
                for(var i=0;i<=2;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                break;
            case 14:
                rowStart=7;
                colStart=7;
                for(var i=0;i<=1;i++){
                    $("[row='"+(rowStart+i)+"'][column='"+(colStart-i)+"'] > div").addClass('animate2');
                }
                clearTimeout(timer);
                break;
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