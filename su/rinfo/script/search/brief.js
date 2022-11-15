$(document).ready(function(){


    //facet
    $('.facetBtn').on('click',function(){
      winWidth = window.innerWidth || document.documentElement.clientWidth;
      if(winWidth > 1024){
        if($(this).hasClass('pc')){
          $('.briefContent .briefResult').removeClass('pc');
          $('.facetContent').removeClass('pc');
          $(this).removeClass('pc');
          if($('.tableNarrow').length){
            $('.tableNarrow').hide();
          }
        }else{
          $('.briefContent .briefResult').addClass('pc');
          $('.facetContent').addClass('pc');
          $(this).addClass('pc');
          if($('.tableNarrow').length){
            $('.tableNarrow').css('display','inline-block');
          }
        }
      }else{
        if($('.facetContent').hasClass('on')){
          $('.facetContent').removeClass('on');
        }else{
          $('.facetContent').addClass('on');
        }
      }
      if($('.chartBox').length){
        setTimeout(function(){
          $('.chartBox').highcharts().reflow();
        },300);
      }
      return false;
    });

    // 영역외 클릭시 facet 닫기
    $('body').click(function(e){
      if(!$('.facetContent').has(e.target).length){
        $('.facetContent').removeClass('on');
        $('.briefContent .result').removeClass('on');
        $('.facetBtn').removeClass('on');
      }
    });
    
    
    $('.facetList>ul>li>a').click(function(e){
      e.preventDefault();
      if($(this).hasClass('disable')){
        $(this).removeClass('disable')
      }else{
        $(this).addClass('disable')
      }
    });

    //narrowBtn
    $('.narrowBtn').click(function(e){
      e.preventDefault();
      var listH = $('.narrowList').outerHeight();
      $('.narrowList').css('bottom',-listH)
      if($(this).hasClass('on')){
        $(this).removeClass('on').text('모아보기 열기').attr('title','모아보기 열기');
        $(this).parents('.tableNarrow').find('.narrowList').removeClass('on');
      }else{
        $(this).addClass('on').text('모아보기 닫기').attr('title','모아보기 닫기');
        $(this).parents('.tableNarrow').find('.narrowList').addClass('on');
      }
    });

    //윈도우 리사이즈시 차트 reflow
    var resizeTimer = false;

    $(window).on('resize', function (e) {
      listH = $('.narrowList').outerHeight();
      $('.narrowList').css('bottom',-listH)
      if (!resizeTimer) {
        $(window).trigger('resizestart');
      }

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {

        resizeTimer = false;
        $(window).trigger('resizeend');

      }, 250);

    }).on('resizestart', function () {
      //console.log('Started resizing the window');
    }).on('resizeend', function () {
      if($('.chartBox').length){
        $('.chartBox').highcharts().reflow();
      }
    });




});