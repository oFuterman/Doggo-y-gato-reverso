/*-----------------Dylan's Code-----------------*/

$(document).ready(function() {
    addClickHandlerTest();
});


var currentPlayer = 1;
var oppositePlayer = 2;

function determineValidMove(oppositePlayer) {
    /* Location of adjacent pieces */
    var squareNumber =  parseInt($(this).attr("squareNumber"));

    var gameBoardArray =
        [
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,1,2,0,0,0],
            [0,0,0,2,1,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0]
    ];

    // var diagonalUpLeft = (squareNumber - 9);
    // var diagonalUpRight = (squareNumber - 7);
    // var abovePiece = (squareNumber - 8);
    // var rightPiece = (squareNumber + 1);
    // var leftPiece = (squareNumber - 1);
    // var diagonalDownLeft = (squareNumber + 7);
    // var diagonalDownRight = (squareNumber + 9);
    // var belowPiece = (squareNumber + 8);

    // for the entire grid, look for color of current player
    // from that current color, look all the way up, up right, right, down right, down, down left, left, and up left until empty space or same color.
    // if empty space after opposite color, add click handler



    //Player 1 turn (white, 1)

    for(var y = 0; y < 8; y++) {
        for(var x = 0; x < 8; x++) {
            if (gameBoardArray[y][x] === currentPlayer) {
                // North
                for(var yIndex = y; yIndex >= 0; ) {
                    if(gameBoardArray[yIndex - 1][x] === oppositePlayer) {
                        yIndex = yIndex - 1
                    } else if (gameBoardArray[yIndex - 1][x] === 0) {
                        addClickHandler();
                    }
                }
                //East
                for(var xIndex = x; xIndex > 0; xIndex++) {

                }
            }
        }
    }

    if(oppositePlayer === 1) {
        currentPlayer = 1;
        oppositePlayer = 2;
    } else {
        currentPlayer = 2;
        oppositePlayer = 1;
    }
}

function addClickHandlerTest() {
    $(".square").click(determineValidMove);
}








function resetGame() {

}


























/*-----------------Omer's Code-----------------*/

$(document).ready(initializeApp);

function initializeApp(){
    $('div[squareNumber]').on('click',clickTest2);
}

function clickTest2(){
    debugger
    if($('div',this).hasClass('white')){
        $('div',this).removeClass('white');
        $('div',this).addClass('black');
    }else if($('div',this).hasClass('black')){
        $('div',this).removeClass('black');
    }else{
        $('div',this).addClass('white')
    }
}

function countPieces(){//when called returns an array with the amount of white and black pieces ordered respectively
    var whiteCount=0;
    var blackCount=0;
    var squareSelector='';

    for(var i=1;i<=64;i++){
        squareSelector = 'div[squareNumber='+i+']';
        if($(squareSelector).hasClass('white')){
            whiteCount++;
        }else if($(squareSelector).hasClass('black')){
            blackCount++;
        }
    }
    var pieceCountArr=[whiteCount, blackCount];
    return pieceCountArr;
}