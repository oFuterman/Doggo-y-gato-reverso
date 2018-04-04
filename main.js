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