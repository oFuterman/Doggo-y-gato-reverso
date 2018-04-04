/*-----------------Dylan's Code-----------------*/

$(document).ready(function() {
    addClickHandlerTest();
});

function determineValidMove() {
    /* Location of adjacent pieces */
    var square =  $(this);
    var diagonalUpLeft = (parseInt(square.attr("squareNumber")) - 9);
    var diagonalUpRight = (parseInt(square.attr("squareNumber")) - 7);
    var abovePiece = (parseInt(square.attr("squareNumber")) - 8);
    var rightPiece = (parseInt(square.attr("squareNumber")) + 1);
    var leftPiece = (parseInt(square.attr("squareNumber")) - 1);
    var diagonalDownLeft = (parseInt(square.attr("squareNumber")) + 7);
    var diagonalDownRight = (parseInt(square.attr("squareNumber")) + 9);
    var belowPiece = (parseInt(square.attr("squareNumber")) + 8);




}


function addClickHandlerTest() {
    $(".square").click(determineValidMove);
}








function resetGame() {

}


























/*-----------------Omer's Code-----------------*/