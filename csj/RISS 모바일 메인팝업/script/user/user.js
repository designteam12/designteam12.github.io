$(document).ready(function(){

  //선택항목 토클
  $('.boardArea .joinTit.toggleBtn').click(function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
        $(this).removeClass('on');
        $(this).next('.toggleArea').slideUp();
    }else{
        $(this).addClass('on');
        $(this).next('.toggleArea').slideDown();
    }
  });

  //찾아보기 팝업
  $('.userWrite .browseBtn').click(function(e){
    e.preventDefault();
    let ph = $('.browsePop .popHeader').outerHeight(true);
    $('.browsePop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.browsePop').addClass('on');
  });
  $('.browsePop .divPopupClose').click(function(e){
      e.preventDefault();
      $('.blackBg1').hide();
      $('.browsePop').removeClass('on');
      $(this).parents('.divPopup').removeClass('long');
  });

  //우편번호 팝업
  $('.userWrite .zipBtn').click(function(e){
    e.preventDefault();
    let ph = $('.zipPop .popHeader').outerHeight(true);
    $('.zipPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.zipPop').addClass('on');
  });
  $('.zipPop .divPopupClose').click(function(e){
      e.preventDefault();
      $('.blackBg1').hide();
      $('.zipPop').removeClass('on');
      $(this).parents('.divPopup').removeClass('long');
  });

});    