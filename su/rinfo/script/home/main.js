let wholeUtil = {
    init: function () {
        this.bind();
    },
  
    bind: function () {
        $('.wholeMenu').scroll(function () {
          wholeUtil.menuSelect();
        });
    },
  
    menuSelect: function () {
      $('.wholeMenuNav').find('.on').removeClass('on');
      //$('.wholeMenuNav').find('.strong').removeClass('strong');
      if (this.checkVisible($('#wm1'))) {
        $('[href="#wm1"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm2'))) {
        $('[href="#wm2"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm3'))) {
        $('[href="#wm3"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm4'))) {
        $('[href="#wm4"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm5'))) {
        $('[href="#wm5"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm6'))) {
        $('[href="#wm6"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm7'))) {
        $('[href="#wm7"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm8'))) {
        $('[href="#wm8"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm9'))) {
        $('[href="#wm9"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm10'))) {
        $('[href="#wm10"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm11'))) {
        $('[href="#wm11"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm12'))) {
        $('[href="#wm12"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm13'))) {
        $('[href="#wm13"]').parent('div').addClass('on');
      } else if (this.checkVisible($('#wm14'))) {
        $('[href="#wm14"]').parent('div').addClass('on');
      }
    },
  
    checkVisible: function (elm, eval) {
        eval = eval || 'object visible';
        let viewportHeight = $(window).height(); // Viewport Height
        let scrolltop = $(window).scrollTop(); // Scroll Top
        let y;
        try {
            y = $(elm).offset().top;
        } catch (e) {
            y = $(window).height();
        }
  
        let elementHeight = $(elm).height() + 10;
  
        if (eval == 'object visible') return y < viewportHeight + scrolltop && y > scrolltop - elementHeight;
        if (eval == 'above') return y < viewportHeight + scrolltop;
    },
  };
$(document).ready(function(){
    let winWidth = window.innerWidth || document.documentElement.clientWidth;
    let scroll = $(window).scrollTop();
    
    $(window).enllax();

    $('#divTopMenu>ul>li>a').click(function(e){
        e.preventDefault();
        if($(this).parent().hasClass('on')){
            $(this).parent().removeClass('on');
        }else{
            $('#divTopMenu>ul>li').removeClass('on')
            $(this).parent().addClass('on');
        }
    });
    
    $(window).on('scroll',function(){
        scroll = $(window).scrollTop();
        if(scroll>0){
            $('#header').addClass('fix')
            $('#divContent').addClass('up')
        }else{
            $('#header').removeClass('fix')
            $('#divContent').removeClass('up')
        }

    });

    //wholeMenu
    $('.wholeMenuBtn').click(function(e){
        e.preventDefault();
        $('#header').css('z-index',40)
        $('.blackBg1').show();
        $('.wholeMenu').addClass('on');
        $('html, body').css('overflow','hidden')
    });
    $('.wholeMenuClose').click(function(e){
        e.preventDefault();
        $('#header').css('z-index',30)
        $('.blackBg1').hide();
        $('.wholeMenu').removeClass('on');
        $('html, body').css('overflow','visible')
    });
    let wholeMenuNav = new Swiper('.wholeMenuNav .inner', {
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
    });


    $('.wholeMenuNav .tab>a').click(function(){
        let i1 = $(this).parent().index();
        $('.wholeMenuNav .tab').removeClass('on');
        $('.wholeMenuNav .tab').addClass('strong');
        $(this).parent().addClass('on');
        $(this).parent().removeClass('strong');
        wholeMenuNav.slideTo(i1);

    });
    let wm1 = $('#wm1').offset().top - 63;
    let wm2 = $('#wm2').offset().top - 63;
    let wm3 = $('#wm3').offset().top - 63;
    let wm4 = $('#wm4').offset().top - 63;
    $('.wholeMenu').on('scroll', function(){
        scroll = $(this).scrollTop();
        console.log(scroll)
        wholeTopH = $('.wholeMenuTop').outerHeight(true);
        $('.wholeMenuNav .tab').removeClass('strong');
        if(scroll > wholeTopH) {
            $('.wholeMenuNav').addClass('fix');
            $('.wholeMenuList').addClass('on');
        }else{
            $('.wholeMenuNav').removeClass('fix');
            $('.wholeMenuList').removeClass('on');
        }

        if(scroll > wm1 && scroll < wm2) {
            wholeMenuNav.slideTo(0);
        }else if(scroll > wm2 && scroll < wm3) {
            wholeMenuNav.slideTo(1);
        } else if(scroll > wm3 && scroll < wm4) {
            wholeMenuNav.slideTo(2);
        }
    });

    //wholeUtil.init();

    //chartTab
    let mainChartTab = new Swiper('.chartTab .inner',{
        slidesPerView:'auto',
        spaceBetween: 0,
        freeMode: true,
    });

    $('.chartTab .inner .tab>a').click(function(e){
        e.preventDefault();
        //var tIdx = $(this).parent().index();
        //var cId = '"' + '#mainChart' + (tIdx + 1) + '"'; 
        $('.chartTab .inner .tab').removeClass('on');
        $(this).parent().addClass('on');
        $('.chartCont .chartContent').removeClass('on')
        $('.chartCont .chartContent').eq($(this).parent().index()).addClass('on');
        $("#mainChart1").highcharts().reflow();
        $("#mainChart2").highcharts().reflow();
        $("#mainChart3").highcharts().reflow();
        $("#mainChart4").highcharts().reflow();
        
    });

    function chartTabChk(){
        let sum1 = 0;
        let divTabWidth1 = $('.chartTab').width();
        $('.chartTab .tab').each(function(){
            let tw1 = $(this).outerWidth(true);
            sum1 += parseInt(tw1);
        });
        if(divTabWidth1 < sum1 + 20){
            $('.chartTab').addClass('add')
        }else{
            $('.chartTab').removeClass('add')
        }
        $(window).on('resize',function(){
            chk1 = $('.chartTab .tab.on').index();
            divTabWidth1 = $('.chartTab').width();
            sum1 = 0;
            $('.chartTab .tab').each(function(){
                let tw1 = $(this).outerWidth(true);
                sum1 += parseInt(tw1);
            });
            if(divTabWidth1 < sum1 + 20){
                $('.chartTab').addClass('add');
                mainChartTab.slideTo(chk1)
            }else{
                $('.chartTab').removeClass('add')
            }
        });
    }
    chartTabChk();


    //dataSlide
    function sizeAdt(){
        $('.dataSlide .data').each(function(){
            var wIf1 = $(this).find('.cnt').width();
            var wIf2 = $(this).find('.txt').width();
            var wIf3 = $(this).find('a').width();
            if(wIf1 > wIf3 - 18){
                $(this).addClass('cSmall')
            }
            if(wIf2 > wIf3 - 50){
                $(this).addClass('tSmall')
            }
        });
    }
    sizeAdt();
    let dataSlide = new Swiper('.dataSlide .inner',{
        centeredSlides: true,
		slidesPerView: 'auto',
		effect: "coverflow",
		coverflowEffect: {
			rotate: 0,
			stretch: 13,
			depth: 0,
			modifier: 1,
			slideShadows: false,
		},
		loop: true,
        loopAdditionalSlides: 5,
		observer: true,
		observeParents: true,
        navigation: {
            nextEl: $('.dataSlide .swiper-next'),
            prevEl: $('.dataSlide .swiper-prev'),
        },
        on: {
            beforeTransitionStart: function(){
                $('.swiper-slide').removeClass('left');
                $('.swiper-slide-prev').prev().addClass('left');
                $('.swiper-slide').removeClass('right');
                $('.swiper-slide-next').next().addClass('right');
                sizeAdt();
            },
            transitionEnd: function(){   
                //sizeAdt();
            }
        },
        breakpoints: {
            1025: {
                coverflowEffect: {
                    rotate: 0,
                    stretch: 13,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false,
                },
            },
            767: {
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false,
                },
            },
            500: {
                coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false,
                },
            },
            320: {
                coverflowEffect: {
                    rotate: 0,
                    stretch: 20,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false,
                },
            },
        }
    });

    //quickMenu
    let quickSlide = new Swiper('.quickSlide .inner',{
        slidesPerView:'auto',
        spaceBetween: 0,
        freeMode: true,
    });

    //dataTab
    let dataTab = new Swiper('.dataTab .inner',{
        slidesPerView:'auto',
        spaceBetween: 0,
        freeMode: true,
    });
    
    $('.dataTab .inner .tab>a').click(function(e){
        e.preventDefault();
        $('.dataTab .inner .tab').removeClass('on');
        $(this).parent().addClass('on');
        $('.dataCont .dataContent').removeClass('on')
        $('.dataCont .dataContent').eq($(this).parent().index()).addClass('on');
    });

    //banner
    let slickOpt1 = {
		slide: 'div',
		infinite : true,
        autoplay:true,
        autoplaySpeed:3500,
		speed : 500,
        variableWidth: true,
        swipeToSlide: true,
        prevArrow : $('.bannerPrev'),
        nextArrow : $('.bannerNext'),
		vertical : false,
		draggable : true,
	}

    $('.banner .bannerSlide').slick(slickOpt1);
    $('.bannerPause').click(function(e){
        e.preventDefault();
		$(this).hide();
		$(this).next().css('display','inline-block');
		$(this).next().focus();
		$('.banner .bannerSlide').slick('slickPause');
	});

	$('.bannerPlay').click(function(e){
        e.preventDefault();
		$(this).hide();
		$(this).prev().css('display','inline-block');
		$(this).prev().focus();
		$('.banner .bannerSlide').slick('slickPlay')
	});
    $('.bannerSlideW .toggleBtn').click(function(e){
        e.preventDefault();
        if($(this).hasClass('on')){
            $(this).removeClass('on');
            $('.bannerSlide').removeClass('on');
            $('.bannerSlide').not('.slick-initialized').slick(slickOpt1);
            $('.banner .bannerSlide').slick('slickPause');
            if($('.bannerPause').css('display') == 'none'){
                $('.banner .bannerSlide').slick('slickPause');
            }else if($('.bannerPlay').css('display') == 'none'){
                $('.banner .bannerSlide').slick('slickPlay');
            }
        }else{
            $('.bannerSlide').addClass('on');
            $(this).addClass('on');
            $('.bannerSlide').slick("unslick");
        }
    });

});