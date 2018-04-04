/*-----------------Dylan's Code-----------------*/





























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