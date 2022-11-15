$(document).ready(function(){

    if($('.innerContTab').length){
        let innerContTab = new Swiper('.innerContTab .inner',{
            slidesPerView:'auto',
            spaceBetween: 0,
            freeMode: true,
        });
    }
    
    $('.chartTab .tab>a').click(function(e){
        e.preventDefault();
        $('.chartTab .tab').removeClass('on');
        $(this).parents('.tab').addClass('on');
        $('.chartTabCont>div').hide();
        $('.chartTabCont>div').eq($(this).parent().index()).show();
    });

    //검색어 수정 팝업
    $('.srhKeyEditBtn').click(function(e){
        e.preventDefault();
        $('.blackBg1').fadeIn();
        $('.srhKeyEditPop').fadeIn();
    });

    $('.srhKeyEditClose').click(function(e){
        e.preventDefault();
        $('.blackBg1').fadeOut();
        $('.srhKeyEditPop').fadeOut();
    });

    //기관검색팝업
    $('.srhOrgBtn').click(function(e){
        e.preventDefault();
        $('.blackBg1').fadeIn();
        $('.srhOrgPop').fadeIn();
    });

    $('.srhOrgClose').click(function(e){
        e.preventDefault();
        $('.blackBg1').fadeOut();
        $('.srhOrgPop').fadeOut();
    });

});