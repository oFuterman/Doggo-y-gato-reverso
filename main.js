/*-----------------Dylan's Code-----------------*/





























/*-----------------Omer's Code-----------------*/

$(document).ready(initializeApp);

function initializeApp(){
    clickTest();
}

function clickTest(){//test function, adds or removes class of white/black

    $('div[squareNumber]').on('click',function(){
        if($(this).hasClass('white')){
            $(this).removeClass('white');
            $(this).addClass('black');
        }else if($(this).hasClass('black')){
            $(this).removeClass('black');
        }else{
            $(this).addClass('white')
        }
    });
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