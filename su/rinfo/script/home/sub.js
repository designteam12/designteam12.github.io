$(document).ready(function(){
    let winWidth = window.innerWidth || document.documentElement.clientWidth;
    let scroll = $(window).scrollTop();

    $(window).on('scroll',function(){
        scroll = $(window).scrollTop();
        if(scroll>0){
            $('#header').addClass('fix')
            $('#divContents').addClass('up')
        }else{
            $('#header').removeClass('fix')
            $('#divContents').removeClass('up')
        }

    });

    $('#divTopMenu>ul>li>a').click(function(e){
        e.preventDefault();
        if($(this).parent().hasClass('on')){
            $(this).parent().removeClass('on');
        }else{
            $('#divTopMenu>ul>li').removeClass('on')
            $(this).parent().addClass('on');
        }
    });
    
    if($('#divTabMenu').length){
        
        let tabSlide1 = new Swiper('#divTabMenu .inner',{
            slidesPerView:'auto',
            spaceBetween: 0,
            freeMode: true,
        });
        $(window).on('load',function(){
            let chk = $('#divTabMenu .tab.on').index();
            tabSlide1.slideTo(chk)
        });
        function tabSlide(){
            let sum = 0;
            let divTabWidth = $('#divTabMenu').width();
            $('#divTabMenu .tab').each(function(){
                let tw = $(this).outerWidth(true);
                sum += parseInt(tw);
            });
            if(divTabWidth < sum + 20){
                $('#divTabMenu').addClass('add')
            }else{
                $('#divTabMenu').removeClass('add')
            }
            $(window).on('resize',function(){
                chk = $('#divTabMenu .tab.on').index();
                divTabWidth = $('#divTabMenu').width();
                sum = 0;
                $('#divTabMenu .tab').each(function(){
                    let tw = $(this).outerWidth(true);
                    sum += parseInt(tw);
                });
                if(divTabWidth < sum + 20){
                    $('#divTabMenu').addClass('add');
                    tabSlide1.slideTo(chk)
                }else{
                    $('#divTabMenu').removeClass('add')
                }
            });
        }
        tabSlide();
    }

    //lineTabMenu
    if($('.lineTabMenu').length){
        
        let tabSlide2 = new Swiper('.lineTabMenu .inner',{
            slidesPerView:'auto',
            spaceBetween: 0,
            freeMode: true,
        });
        $(window).on('load',function(){
            let chk2 = $('.lineTabMenu .tab.on').index();
            tabSlide2.slideTo(chk2)
        });
        function lineSlide(){
            let sum2 = 0;
            let divTabWidth2 = $('.lineTabMenu').width();
            $('.lineTabMenu .tab').each(function(){
                let tw2 = $(this).outerWidth(true);
                sum2 += parseInt(tw2);
            });
            if(divTabWidth2 < sum2 + 20){
                $('.lineTabMenu').addClass('add')
            }else{
                $('.lineTabMenu').removeClass('add')
            }
            $(window).on('resize',function(){
                chk2 = $('.lineTabMenu .tab.on').index();
                divTabWidth2 = $('.lineTabMenu').width();
                sum2 = 0;
                $('.lineTabMenu .tab').each(function(){
                    let tw2 = $(this).outerWidth(true);
                    sum2 += parseInt(tw2);
                });
                if(divTabWidth2 < sum2 + 20){
                    $('.lineTabMenu').addClass('add');
                    tabSlide2.slideTo(chk2)
                }else{
                    $('.lineTabMenu').removeClass('add')
                }
            });
        }
        lineSlide();
    }

    if($('.lineTabMenu').length && $('#divTabMenu').length){
        $('#divContent').addClass('marginUp')
    }

    if($('.contentInnerTab').length){
        let innerTab = new Swiper('.contentInnerTab .inner',{
            slidesPerView:'auto',
            spaceBetween: 0,
            freeMode: true,
        });
    }

    if($('.mobileTable').length > 0) {
		$('.mobileTable').footable({
			breakpoints: {
				phone: 767
				, tablet: 1024
			}
		});
	};

});    