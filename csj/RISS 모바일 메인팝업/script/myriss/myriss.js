$(document).ready(function(){

    $('.chkOptionBtn').click(function(e){
        e.preventDefault();
        if($(this).hasClass('on')){
          $(this).removeClass('on');
          $(this).next().slideUp();
        }else{
          $(this).addClass('on');
          $(this).next().slideDown();
        }
      });
      $('.optBtn1').click(function(e){
        e.preventDefault();
        if($(this).hasClass('on')){
          $(this).removeClass('on');
          $(this).next().slideUp();
        }else{
          $(this).addClass('on');
          $(this).next().slideDown();
        }
      });
    $(".shelf .favorRadio[name='shelf']:radio").change(function () {
        $('.shelf').removeClass('mainShelf')
       $(this).parents('.shelf').addClass('mainShelf');         
    });

    //내 책장수정 팝업
    $('.shelfBtns .edit').click(function(e){
        e.preventDefault();
        let ph = $('.myPop .popHeader').outerHeight(true);
        $('.myPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
        $('.blackBg1').show();
        $('.myPop').addClass('on');
    });

    $('.creatShelf').click(function(e){
      e.preventDefault();
      let ph = $('.myPop .popHeader').outerHeight(true);
      $('.myPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
      $('.blackBg1').show();
      $('.myPop').addClass('on');
  });

    $('.myPop .divPopupClose').click(function(e){
        e.preventDefault();
        $('.blackBg1').hide();
        $('.myPop').removeClass('on');
        $(this).parents('.divPopup').removeClass('long');
    });

    //카테고리 팝업
    $('#interestCodeName1').click(function(){
        let ph = $('.categoryPop .popHeader').outerHeight(true);
        $('.categoryPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
        $('.blackBg1').show();
        $('.categoryPop').addClass('on');
        $('#newCabinet_div2').removeClass('long')
    });
    $('.categoryPopClose').click(function(e){
        e.preventDefault();
        $('.categoryPop').removeClass('on');
        $(this).parents('.divPopup').removeClass('long');
    });

    //내보내기
  $('.export').click(function(e){
    e.preventDefault();
    let ph = $('.exportPop .popHeader').outerHeight(true);
    $('.exportPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.exportPop').addClass('on');
  });
  $('.exportPopClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').hide();
    $('.exportPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  //최신논문들 팝업
  $('.interKeyList .viewListBtns a').click(function(e){
    e.preventDefault();
    let ph = $('.thesisPop .popHeader').outerHeight(true);
    $('.thesisPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.interKeyList .viewListBtns a').removeClass('on');
    $(this).addClass('on');
    $('.blackBg1').show();
    $('.thesisPop').addClass('on')
  });  

  $('.thesisPopClose').click(function(e){
    e.preventDefault();
    $('.interKeyList .viewListBtns a').removeClass('on');
    $('.blackBg1').hide();
    $('.thesisPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

  //월간이용현황
  let graphTab = new Swiper('.graphTab .inner',{
    slidesPerView:'auto',
    spaceBetween: 0,
    freeMode: true,
  });

  $('.myShList .memoBtn').click(function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).next().slideUp();
    }else{
      $(this).addClass('on');
      $(this).next().slideDown();
    }
  });

  $('.memoInputW .memoInput').keyup(function (){
		var content = $(this).val();
		$(this).next().children('.count').html(""+content.length+"/1000");    //글자수 실시간 카운팅
	
		if (content.length > 1000){
			alert("최대 1000자까지 입력 가능합니다.");
			$(this).val(content.substring(0, 1000));
			$(this).next().html("1000/1000");
		}
	});

  //내 복사대출신청현황
  $('.toggleList>ul>li .title').click(function(e){
    e.preventDefault();
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parent().find('.clickHidden').show();
      $(this).parent().find('.clickShow').hide();
    }else{
      $(this).addClass('on');
      $(this).parent().find('.clickHidden').hide();
      $(this).parent().find('.clickShow').show();
    }
  });

  //관심학술지 팝업
  $('.interKeywordBtn').click(function(e){
    e.preventDefault();
    let ph = $('.interSearchPop .popHeader').outerHeight(true);
    $('.interSearchPop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
    $('.blackBg1').show();
    $('.interSearchPop').addClass('on')
  });  

  $('.interSearchClose').click(function(e){
    e.preventDefault();
    $('.blackBg1').hide();
    $('.interSearchPop').removeClass('on');
    $(this).parents('.divPopup').removeClass('long');
  });

});    