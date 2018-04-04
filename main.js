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
    $('.square').on('click',addPiece);
}

function addPiece(){
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
}

function clicked(rowNum,colNum){
    var outterSquareSelector='div[row='+rowNum+'][column='+colNum+']';
    var squareSelector='div[row='+rowNum+'][column='+colNum+']>div';
    var squareTarget=$(squareSelector);
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

    for(var i=0;i<7;i++){
        if(whiteTurn){
            if($('div[row='+(currRow+rowChange)+'][column='+(currCol+colChange)+']>div').hasClass('black')){
                $('div[row='+(currRow+rowChange)+'][column='+(currCol+colChange)+']>div').addClass('tag');
                currRow=parseInt(squareOn.attr('row'));
                currCol=parseInt(squareOn.attr('column'));
                var j=2;
                while(currCol+colChange*j<=7&&currCol+colChange*j>=0&&currRow+rowChange*j<=7&&currRow+rowChange*j>=0){
                    if($('div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div').hasClass('black')){
                        $('div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div').addClass('tag');
                    }else if($('div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div').hasClass('white')){
                        $('.tag').removeClass('black');
                        $('.tag').addClass('white');
                        j+=10;
                    }else{
                        j+=10;
                    }

                    j++;
                }
                $('.tag').removeClass('tag');
            }
        }else{
            if($('div[row='+(currRow+rowChange)+'][column='+(currCol+colChange)+']>div').hasClass('white')){
                $('div[row='+(currRow+rowChange)+'][column='+(currCol+colChange)+']>div').addClass('tag');
                currRow=parseInt(squareOn.attr('row'));
                currCol=parseInt(squareOn.attr('column'));
                var j=2;
                while(currCol+colChange*j<=7&&currCol+colChange*j>=0&&currRow+rowChange*j<=7&&currRow+rowChange*j>=0){
                    if($('div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div').hasClass('white')){
                        $('div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div').addClass('tag');
                    }else if($('div[row='+(currRow+rowChange*j)+'][column='+(currCol+colChange*j)+']>div').hasClass('black')){
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