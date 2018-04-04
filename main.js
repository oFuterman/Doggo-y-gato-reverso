/*-----------------Dylan's Code-----------------*/

$(document).ready(function() {
    addClickHandlerTest();
});

function determineValidMove() {
    /* Location of adjacent pieces */
    var squareNumber =  parseInt($(this).attr("squareNumber"));

    var diagonalUpLeft = (squareNumber - 9);
    var diagonalUpRight = (squareNumber - 7);
    var abovePiece = (squareNumber - 8);
    var rightPiece = (squareNumber + 1);
    var leftPiece = (squareNumber - 1);
    var diagonalDownLeft = (squareNumber + 7);
    var diagonalDownRight = (squareNumber + 9);
    var belowPiece = (squareNumber + 8);




}

function removeClickHandlers() {
    if($(".square").hasClass("clicked")) {

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