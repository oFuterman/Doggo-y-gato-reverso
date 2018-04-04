var whiteTurn=true;

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
    $('div[squareNumber]').on('click',addPiece);
}

function addPiece(){
    if(whiteTurn){
        $('div',this).removeClass('empty');
        $('div',this).addClass('white');
        whiteTurn=false;
    }else{
        $('div',this).removeClass('empty');
        $('div',this).addClass('black');
        whiteTurn=true;
    }
    clicked($(this).attr('row'),$(this).attr('column'));
}

//<div class=*** row=4 column=6

function clicked(rowNum,colNum){
    var squareSelector='div[row='+rowNum+'][column='+colNum+']>div';
    var squareTarget=$(squareSelector);
    for(var i=0;i<8;i++){
        switch(i){
            case 0:
                sideFlip(0, squareTarget);
                i+=10;
                break;
            case 1:
                sideFlip(1, squareTarget);
                break;
            case 2:
                sideFlip(2, squareTarget);
                break;
            case 3:
                sideFlip(3, squareTarget);
                break;
            case 4:
                sideFlip(4, squareTarget);
                break;
            case 5:
                sideFlip(5, squareTarget);
                break;
            case 6:
                sideFlip(6, squareTarget);
                break;
            case 7:
                sideFlip(7, squareTarget);
                break;
        }
    }
}

function sideFlip(num, squareOn){//takes in number and checks corresponding adjacent side (1 is top left, rest is clockwise, so left is 7) and returns 0 if its the same number, 1 if its the opposite number, and 2 if its empty or end of board
    var sideNumber=0;
    var currRow=parseInt(squareOn.attr('row'));
    var currCol=parseInt(squareOn.attr('col'));
    console.log('row: '+currRow+' col: '+currCol);
    switch(num){
        case 0:
            sideNumber=-9;
            break;
        case 1:
            sideNumber=-8;
            break;
        case 2:
            sideNumber=-7;
            break;
        case 3:
            sideNumber=1;
            break;
        case 4:
            sideNumber=9;
            break;
        case 5:
            sideFlip(5);
            break;
        case 6:
            sideFlip(6);
            break;
        case 7:
            sideFlip(7);
            break;
    }

    for(var i=0;i<7;i++){
        if(whiteTurn){

        }
    }
}

function endTurn(){

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