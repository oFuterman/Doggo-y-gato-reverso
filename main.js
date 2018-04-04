/*-----------------Dylan's Code-----------------*/

$(document).ready(function() {
    addClickHandlerTest();
});

function determineValidMove() {
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
    // var rightPiece = (squareNum`ber + 1);
    // var leftPiece = (squareNumber - 1);
    // var diagonalDownLeft = (squareNumber + 7);
    // var diagonalDownRight = (squareNumber + 9);
    // var belowPiece = (squareNumber + 8);

    //Player 1 turn (black, 1)

    for(var y = 0; y < 8; y++) {
        for(var x = 0; x<8; x++) {
            if(gameBoardArray[x][y] === 1) {
                if (gameBoardArray[x-1][y] === 0) {

                }
            }
        }
    }

//     Determine legal move for black:
// // look through entire grid until find a piece
// // check color of piece
// // if white,
//     Look at all piece bottom right until black piece
//     If top left(opposite direction) empty,
//         Add click handler to top left
//     Repeat for all directions





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