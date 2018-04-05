var whiteTurn=true;
var currentPlayer = 1;
var oppositePlayer = 2;
$(document).ready(initializeApp);

/*-----------------Dylan's Code-----------------*/

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
    // clear any previously declared valid moves
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            if (gameBoardArray[y][x] === 3) {
                gameBoardArray[y][x] = 0;
            }
        }
    }
    //Player 1 turn (white, 1)
    for (var y = 0; y < 8; y++) {
        for (var x = 0; x < 8; x++) {
            if (gameBoardArray[y][x] === player) {
                // North
                for (var yIndex = y; yIndex >= 0;) {
                    if (gameBoardArray[yIndex - 1][x] === antiPlayer) {
                        yIndex -= 1;
                    } else if (gameBoardArray[yIndex - 1][x] === 0 && gameBoardArray[yIndex][x] === antiPlayer) {
                        addClickHandler(yIndex-1, x);
                        gameBoardArray[yIndex-1][x] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //East
                for (var xIndex = x; xIndex < 8; ) {
                    if(gameBoardArray[y][xIndex + 1] === antiPlayer) {
                        xIndex += 1;
                    } else if (gameBoardArray[y][xIndex + 1] === 0 && gameBoardArray[y][xIndex] === antiPlayer) {
                        addClickHandler(y, xIndex + 1);
                        gameBoardArray[y][xIndex + 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //South
                for (var yIndex = y; yIndex < 8;) {
                    if (gameBoardArray[yIndex + 1][x] === antiPlayer) {
                        yIndex += 1;
                    } else if (gameBoardArray[yIndex + 1][x] === 0 && gameBoardArray[yIndex][x] === antiPlayer) {
                        addClickHandler(yIndex + 1, x);
                        gameBoardArray[yIndex + 1][x] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //West
                for (var xIndex = x; xIndex > 0; ) {
                    if(gameBoardArray[y][xIndex - 1 ] === antiPlayer) {
                        xIndex -= 1;
                    } else if (gameBoardArray[y][xIndex - 1] === 0 && gameBoardArray[y][xIndex] === antiPlayer) {
                        addClickHandler(yIndex, xIndex - 1);
                        gameBoardArray[yIndex][xIndex - 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                // NorthEast
                for (var yIndex = y, xIndex = x; yIndex >= 0 && xIndex < 8;) {
                    if (gameBoardArray[yIndex - 1][xIndex + 1] === antiPlayer) {
                        yIndex -= 1;
                        xIndex += 1;
                    } else if (gameBoardArray[yIndex - 1][xIndex + 1] === 0 && gameBoardArray[yIndex][xIndex] === antiPlayer) {
                        addClickHandler(yIndex-1, xIndex + 1);
                        gameBoardArray[yIndex-1][xIndex + 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //SouthEast
                for (var yIndex = y, xIndex = x; yIndex < 8 && xIndex < 8;) {
                    if (gameBoardArray[yIndex + 1][xIndex + 1] === antiPlayer) {
                        yIndex += 1;
                        xIndex += 1;
                    } else if (gameBoardArray[yIndex + 1][xIndex + 1] === 0 && gameBoardArray[yIndex][xIndex] === antiPlayer) {
                        addClickHandler(yIndex + 1, xIndex + 1);
                        gameBoardArray[yIndex + 1][xIndex + 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //SouthWest
                for (var yIndex = y, xIndex = x; yIndex < 8 && xIndex >= 0;) {
                    if (gameBoardArray[yIndex + 1][xIndex - 1] === antiPlayer) {
                        yIndex += 1;
                        xIndex -= 1;
                    } else if (gameBoardArray[yIndex + 1][xIndex - 1] === 0 && gameBoardArray[yIndex][xIndex] === antiPlayer) {
                        addClickHandler(yIndex + 1, xIndex - 1);
                        gameBoardArray[yIndex + 1][xIndex - 1] = 3;
                        break;
                    } else {
                        break;
                    }
                }
                //NorthWest
                for (var yIndex = y, xIndex = x; yIndex >= 0 && xIndex >= 0;) {
                    if (gameBoardArray[yIndex - 1][xIndex - 1] === antiPlayer) {
                        yIndex -= 1;
                        xIndex -= 1;
                    } else if (gameBoardArray[yIndex - 1][xIndex - 1] === 0 && gameBoardArray[yIndex][xIndex] === antiPlayer) {
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

    if (oppositePlayer === 1) {
        currentPlayer = 1;
        oppositePlayer = 2;
    } else {
        currentPlayer = 2;
        oppositePlayer = 1;
    }
}


function addClickHandler(row, column) {
    $('div[row='+row+'][column='+column+']').click(addPiece);
}

function removeClickHandlers() {
    $('*').off("click");
}

function resetGame() {

}







/*-----------------Omer's Code-----------------*/


function initializeApp(){
    $("*").on("click", function(){
        $(".instructionModal").addClass("hideModals");
    });
    //$('.square').on('click',addPiece);
    updateStats(countPieces());
    addClickHandler();
    determineValidMove(currentPlayer, oppositePlayer);
}

function addPiece(){
    var updateBoardRow = $(this).attr("row");
    var updateBoardColumn = $(this).attr("column");
    if(whiteTurn){
        $('div',this).removeClass('empty');
        $('div',this).addClass('white');
        clicked($(this).attr('row'),$(this).attr('column'));
        whiteTurn=false;
    }else{
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
                while(currCol+colChange*j<=7&&currCol+colChange*j>=0&&currRow+rowChange*j<=7&&currRow+rowChange*j>=0){
                    squareOverSelectorJ='div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div';

                    //if its black (opposite)
                    if($(squareOverSelectorJ).hasClass('black')){
                        $(squareOverSelectorJ).addClass('tag');
                    }

                    //if its white (same)
                    else if($(squareOverSelectorJ).hasClass('white')){
                        //changes anything with tag class to white
                        $('.tag').removeClass('black');
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
                while(currCol+colChange*j<=7&&currCol+colChange*j>=0&&currRow+rowChange*j<=7&&currRow+rowChange*j>=0){
                    squareOverSelectorJ='div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div';
                    if($(squareOverSelectorJ).hasClass('white')){
                        $(squareOverSelectorJ).addClass('tag');
                    }else if($(squareOverSelectorJ).hasClass('black')){
                        $('.tag').removeClass('white');
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
    // updateGameBoard($(this).attr("row"),$(this).attr("column"));
}

function endTurn() {
  updateStats(countPieces());
  removeClickHandlers();
  determineValidMove(currentPlayer, oppositePlayer);
  recreateBoard();
}

function countPieces(){//when called returns an array with the amount of white and black pieces ordered respectively
    var whiteCount=0;
    var blackCount=0;
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

function recreateBoard() {
    // for(var y=0;y<=7;x++){
    //     for(var x=0;x<=7;y++){
    //         if ()
    //     }
}