$(document).ready(function () {

  let slickOpt1 = {
    infinite: false,
    arrows: false,
    swipeToSlide: true,
    speed: 500,
    variableWidth: true,
  }

  //카드뉴스
  if ($('.cardSlideW').length) {
    $('.cardSlideW').slick(slickOpt1);
  };
  $('.cardnews .exhibitAll').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('on')) {
      $('.cardSlideW').removeClass('on')
      $(this).text('전체보기');
      $(this).removeClass('on');
      $('.cardSlideW').not('.slick-initialized').slick(slickOpt1);
    } else {
      $('.cardSlideW').slick("unslick");
      $('.cardSlideW').addClass('on');
      $(this).text('닫기')
      $(this).addClass('on');
      $('.cardCont .cardItem').click(function (e) {
        e.preventDefault();
        $('.cardDetailLayer').addClass('on')
      });
    }
  });
  $('.cardCont .cardItem').click(function (e) {
    e.preventDefault();
    $('.cardDetailLayer').addClass('on')
  });
  if ($('.cardDetailLayer').length > 0) {
    $('.cardDetailLayer .layerSlide').slick({
      arrows: false,
    });
  };
  $('.cardDetailClose').click(function (e) {
    e.preventDefault();
    $('.cardDetailLayer').removeClass('on');

  });


  //동영상
  if ($('.videoSlideW').length) {
    $('.videoSlideW').slick(slickOpt1);
  };
  $('.videoCont .videoItem').click(function (e) {
    e.preventDefault();
    var vs = $(this).children().children().attr('src')
    $('.videoDetailLayer .layerVideo video').attr('src', vs)
    $('.videoDetailLayer').addClass('on');
  });
  $('.videoDetailClose').click(function (e) {
    e.preventDefault();
    $('.videoDetailLayer').removeClass('on');
  });

  $('.rissVideo .exhibitAll').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('on')) {
      $('.videoSlideW').removeClass('on')
      $(this).text('전체보기');
      $(this).removeClass('on');
      $('.videoSlideW').not('.slick-initialized').slick(slickOpt1);
    } else {
      $('.videoSlideW').slick("unslick");
      $('.videoSlideW').addClass('on');
      $(this).text('닫기')
      $(this).addClass('on');
      $('.videoCont .videoItem').click(function (e) {
        e.preventDefault();
        var vs = $(this).children().children().attr('src')
        $('.videoDetailLayer .layerVideo video').attr('src', vs)
        $('.videoDetailLayer').addClass('on');
      });
    }
  });

   //레이어 팝업 안 슬라이드 추가
   let detailCnt1 = $('.cardDetailSlideW .cardDetailSlide').length;
   let detailWidth1 = $('.cardDetailSlideW .cardDetailSlide').width();
   let detailCnt2 = $('.videoDetailSlideW .layerInner').length;
   let detailWidth2 = $('.videoDetailSlideW .layerInner').width();
 
   $('.cardBtns a.cardPrev').click(function (e) {
     e.preventDefault();
     detailWidth1 = $('.cardDetailSlideW .cardDetailSlide').width();
     if (!$('.cardDetailSlideW').is(":animated")) {
       $('.cardDetailSlideW').css('left', -detailWidth1);
       $('.cardDetailSlideW>.cardDetailSlide').last().prependTo($('.cardDetailSlideW'));
       $('.cardDetailSlideW').animate({ "left": "0" }, 400);
     }
   });
 
   $('.cardBtns a.cardNext').click(function (e) {
     e.preventDefault();
     detailWidth1 = $('.cardDetailSlideW .cardDetailSlide').width();
     if (!$('.cardDetailSlideW').is(":animated")) {
       $('.cardDetailSlideW').animate({ "left": -detailWidth1 }, 400, function () {
         $('.cardDetailSlideW>.cardDetailSlide').first().appendTo($('.cardDetailSlideW'));
         $('.cardDetailSlideW').css('left', '0')
       });
 
     }
   });
 
   $('.videoBtns a.videoPrev').click(function (e) {
     e.preventDefault();
     detailWidth2 = $('.videoDetailSlideW .layerInner').width();
     if (!$('.videoDetailSlideW').is(":animated")) {
       $('.videoDetailSlideW').css('left', -detailWidth2);
       $('.videoDetailSlideW>.layerInner').last().prependTo($('.videoDetailSlideW'));
       $('.videoDetailSlideW').animate({ "left": "0" }, 400);
     }
   });
 
   $('.videoBtns a.videoNext').click(function (e) {
     e.preventDefault();
     detailWidth2 = $('.videoDetailSlideW .layerInner').width();
     if (!$('.videoDetailSlideW').is(":animated")) {
       $('.videoDetailSlideW').animate({ "left": -detailWidth2 }, 400, function () {
         $('.videoDetailSlideW>.layerInner').first().appendTo($('.videoDetailSlideW'));
         $('.videoDetailSlideW').css('left', '0')
       });
 
     }
   });

  let winH = $(window).height();
  $('.cardDetailSlide').css('height', winH - 100);
  $('.videoDetailSlideW .layerInner').css('height', winH - 100);
  $(window).on('resize', function () {
    winWidth = window.innerWidth || document.documentElement.clientWidth;
    winH = $(window).height();
    $('.cardDetailSlide').css('height', winH - 100);
    $('.videoDetailSlideW .layerInner').css('height', winH - 100);
  });

  //지식더하기
  if ($('.temSlideW').length) {
    $('.temSlideW').slick(slickOpt1);
  };

  $('.rissTem .exhibitAll').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('on')) {
      $('.temSlideW').removeClass('on')
      $(this).text('전체보기');
      $(this).removeClass('on');
      $('.temSlideW').not('.slick-initialized').slick(slickOpt1);
    } else {
      $('.temSlideW').slick("unslick");
      $('.temSlideW').addClass('on');
      $(this).text('닫기')
      $(this).addClass('on');
      $('.temCont .temItem').click(function(e){
        e.preventDefault();
        let ph = $('.thesisPop .popHeader').outerHeight(true);
        $('.thesisPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
        $('.temCont .temItem').removeClass('on');
        $(this).addClass('on');
        $('.blackBg1').show();
        $('.thesisPop').addClass('on')
      });  
    }
  });

  $('.temCont .temItem').click(function(e){
    e.preventDefault();
    let ph = $('.thesisPop .popHeader').outerHeight(true);
    $('.thesisPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.temCont .temItem').removeClass('on');
    $(this).addClass('on');
    $('.blackBg1').show();
    $('.thesisPop').addClass('on')
  });  

  $('.thesisPopClose').click(function(e){
    e.preventDefault();
    $('.temCont .temItem').removeClass('on');
    $('.blackBg1').hide();
    $('.thesisPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  //꿀팁 내보내기
  $('.slideInfo .infoBottom .function .export').click(function(e){
    e.preventDefault();
    let ph = $('.tipExportPop .popHeader').outerHeight(true);
    $('.tipExportPop .popCont').css({'height':'calc(100% - ' +ph+'px)'});
    $('.blackBg1').css('z-index',399).show();
    $('.tipExportPop').addClass('on')
  });

  $('.tipExportPopClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').css('z-index',11).hide();
    $('.tipExportPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });
});    