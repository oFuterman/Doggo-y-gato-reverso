var whiteTurn=true;

/*-----------------Dylan's Code-----------------*/





























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
    clicked($(this).attr('squareNumber'));
}

function clicked(squareNum){
    var squareSelector='div[squareNumber='+squareNum+']>div';
    var squareTarget=$(squareSelector);
    for(var i=0;i<8;i++){
        switch(i){
            case 0:
                sideCheck(0);
                break;
            case 1:
                sideCheck(1);
                break;
            case 2:
                sideCheck(2);
                break;
            case 3:
                sideCheck(3);
                break;
            case 4:
                sideCheck(4);
                break;
            case 5:
                sideCheck(5);
                break;
            case 6:
                sideCheck(6);
                break;
            case 7:
                sideCheck(7);
                break;
        }
    }
}

function sideCheck(num){//takes in number and checks corresponding adjacent side (1 is top left, rest is clockwise, so left is 7) and returns 0 if its the same number, 1 if its the opposite number, and 2 if its empty or end of board
    
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