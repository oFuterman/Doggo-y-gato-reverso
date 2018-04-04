/*-----------------Dylan's Code-----------------*/





























/*-----------------Omer's Code-----------------*/

$(document).ready(initializeApp);

function initializeApp(){
    clickTest();
}

function clickTest(){
    $('.square').on('click',function(){
        if($(this > 'div').hasClass('white')){
            $(this > 'div').removeClass('white');
            $(this > 'div').addClass('black');
        }else if($(this > 'div').hasClass('black')){
            $(this > 'div').removeClass('black');
        }else{
            $(this > 'div').addClass('white')
        }
    });
}