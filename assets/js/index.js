//"How to play" pop up/close click handler
$(window).click(function() {
    $('.popup').click(function(){
       $('.box').show();
    });
  
    $('.popupCloseButton').click(function(){
        $('.box').hide();
    });
});










