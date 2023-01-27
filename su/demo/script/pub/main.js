$(document).ready(function(){
    //사이즈 변수 선언(공통 사용)
    var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언

    //상단공지 닫기
    $('.topInfo .closeBtn').on('click',function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        var HeaderH1 = $('.header1').height()
        var HeaderH2 = $('.header2').height()
        var HeaderH =  HeaderH1 + HeaderH2;
        var windowH = $(window).height();
        divH = windowH - HeaderH;
        $('.wholeMenu .menuArea .menuList .divMenuList').css('height',divH-85);
        $(this).closest('.topInfo').slideUp(200);
        return false;
    });

    //레이어 공지 닫기
    $('.layerNotice .closeBtn').on('click',function(){
        $('.layerNotice').fadeOut();
        return false;
    });

    $('a').each(function(index) {
        if($(this).attr('target') != 'undefined' && $(this).attr('target') != undefined && $(this).attr('target') != '' )
        {
            $(this).attr('rel', 'noopener noreferrer');
        }
    });

    //슬라이드메뉴 상단 고정
    var fixPosition = $('.topInfo').height();
    var fixPosition2 = $('.headerTop').height();
    var scroll = $(window).scrollTop();

    $(window).on('scroll load',function(){
        fixPosition = $('.topInfo').height();
        fixPosition2 = $('.header1').height();
        scroll = $(window).scrollTop();
        if($('.topInfo').css('display') == 'block'){//상단팝업 있을경우
            if(scroll > fixPosition+fixPosition2){
                $('.header2').addClass( 'fixed' );
                $('.header1').addClass( 'fixed' );
            }else{
                $('.header2' ).removeClass( 'fixed' );
                $('.header1').removeClass( 'fixed' );
            }
        }else{
            if(scroll > fixPosition2){
                $('.header2').addClass( 'fixed' );
                $('.header1').addClass( 'fixed' );
                $('.wholeMenu').addClass('fixed');
            }else{
                $('.header2' ).removeClass( 'fixed' );
                $('.header1').removeClass( 'fixed' );
                $('.wholeMenu').removeClass('fixed');
            }
        }
        // 전체메뉴 위치
        if(scroll > 1){
            $('.wholeMenu').addClass('fixed');
        }else{
            $('.wholeMenu').removeClass('fixed');
        }
    });

    // 슬라이드 메뉴
    $("#divTopMenu>ul>li>a").on('click focus',function(){
        if($("#divTopMenu>ul>li.on").length < 1){
            $(this).parent().addClass("on").siblings().removeClass("on");
            $(this).siblings().stop().slideDown();
        }else{
            $(this).parent().addClass("on").siblings().removeClass("on");
            $("#divTopMenu>ul>li>div").hide();
            $(this).stop().next().show();
        }
        $('.blackBg').addClass('on');
        return false;
    });

    // 슬라이드 메뉴 닫기
    $('.blackBg').on('click', function(){
        $("#divTopMenu>ul>li>div").slideUp(300);
        $("#divTopMenu>ul>li").removeClass('on');

        $('.wholeMenu').removeClass('on');
        $('.wholeMenu .menuClose').removeClass('on');
        $('html, body').css('overflow','visible');
        $('.blackBg').removeClass('on');
        return false;
    });

    $(window).on('resize',function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        if(winWidth < 1025){
            if(!$('.wholeMenu').hasClass('on')){
                $('.blackBg').removeClass('on');
            }else{
                $('.blackBg').addClass('on');
                $('.blackBg').addClass('mo');
            }
            if(!$('.divMenuList > ul > li > ul > li').hasClass('on')){
                $('.divMenuList > ul > li > ul > li > ul').slideUp(300);
            }
            $("#divTopMenu>ul>li").removeClass('on')
            $("#divTopMenu>ul>li>div").slideUp();
            $('.header').removeClass('topMenuOn');
        }else{
            // mo -> pc 3dept On
            $('.divMenuList > ul > li > ul > li > ul').slideDown(300);
            $('.divMenuList > ul > li > ul > li').removeClass('on');
            $('.blackBg').removeClass('mo');
            if(!$('#divTopMenu > ul > li').hasClass('on')){
                $('.blackBg').removeClass('on');
            }
        }
    });

    // 전체메뉴
    $('.wholeMenuBtn').click(function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        $('html, body').css('overflow','hidden');
        $('.wholeMenu').addClass('on');
        $('.wholeMenu .menuClose').focus();
        if(winWidth < 1025){
            $('.blackBg').addClass('on');
            $('.blackBg').addClass('mo');
        }
        return false;
    });
    $('.wholeMenuBtn').on('focus', function(){
        $("#divTopMenu>ul>li>div").slideUp(300);
        $("#divTopMenu>ul>li").removeClass('on');
        $('.blackBg').removeClass('on');
    });
    $('.menuClose').click(function(){
        $('.wholeMenu').removeClass('on');
        $('.wholeMenu .menuClose').removeClass('on');
        $('html, body').css('overflow','visible');
        $('.wholeMenuBtn').focus();
        if(winWidth < 1025){
            $('.blackBg').removeClass('on');
            $('.blackBg').removeClass('mo');
        }
        return false;
    });
    var lastChk= $('.divMenuList > ul > li:last-child > ul > li:last-child > ul').length;
    if(lastChk == 0){
        $('.divMenuList > ul > li:last-child > ul > li:last-child > a').focusout(function(){
            $('.wholeMenu').removeClass('on');
            $('.wholeMenu .menuClose').removeClass('on');
            $('html, body').css('overflow','visible');
            $('.wholeMenuBtn').focus();
            if(winWidth < 1025){
                $('.blackBg').removeClass('on');
                $('.blackBg').removeClass('mo');
            }
        });
    }else if (lastChk ==1){
        $('.divMenuList > ul > li:last-child > ul > li:last-child > ul > li:last-child > a').focusout(function(){
            $('.wholeMenu').removeClass('on');
            $('.wholeMenu .menuClose').removeClass('on');
            $('html, body').css('overflow','visible');
            $('.wholeMenuBtn').focus();
            if(winWidth < 1025){
                $('.blackBg').removeClass('on');
                $('.blackBg').removeClass('mo');
            }
        });
    }

    // Mobile WholeMenu 1dept
    $('.divMenuList > ul > li > a').on('click',function(){
        if(winWidth < 1024){
            $('.divMenuList > ul > li').removeClass('on');
            $(this).parent().addClass('on');
        }
        return false;
    });
    // Mobile WholeMenu 2dept
    $('.divMenuList > ul > li > ul > li > a.arrow').on('click',function(){
        if(winWidth < 1025){
            if($(this).parent().hasClass('on')){
                $(this).parent().removeClass('on');
                $(this).siblings().slideUp(300);
            }else{
                $('.divMenuList > ul > li > ul > li').removeClass('on');
                $('.divMenuList > ul > li > ul > li > ul').slideUp(300);
                $(this).parent().addClass('on');
                $(this).siblings().slideDown(300);
            }
        }
        return false;
    });

    /* 인기검색어 슬라이드 */
    var keywordRanking = function(){
        if(!$('.keywordList ul').is(":animated")){
            $('.keywordList ul').animate({"top":-48},1500,function(){
                $('.keywordList ul li').first().appendTo($('.keywordList ul'));
                $('.keywordList ul').css('top','0')
            });
        }
    };
    // 자동재생
    var keywordRanking2 = function(){
        intervalKeyWord = setInterval(function(){
            keywordRanking()},3000);
    };
    keywordRanking2();

    $('#keywordRanking .keywordList').on('mouseover click',function(){
        $('.keywordAll').addClass('on');
        return false;
    });
    $('.keywordAll').on('mouseleave',function(){
        $('.keywordAll').removeClass('on');
    });
    $('#keywordRanking .keywordList a').on('focus', function(){
        $('.keywordAll').addClass('on');
        $('.keywordAll li:first-of-type a').focus();
    });
    $('.searchSelect').on('focus', function(){
        $('.keywordAll').removeClass('on');
    });
    $('body').click(function(e){
        if(!$('.keywordAll').has(e.target).length){
            $('.keywordAll').removeClass('on');
        }
    });
    /* 인기검색어 슬라이드 */

    // 자동완성
    $('.autoComBtn').on('click', function(){
        $('.autoComW').addClass('on');
        $('.autoComW .autoComContent ul li:first-of-type a').focus();
        return false;
    });

    $('.autoComClose').on('click', function(){
        $('.autoComW').removeClass('on');
        $('.autoComBtn').focus();
        return false;
    });

    $('body').click(function(e){
        if(!$('.autoComW').has(e.target).length){
            $('.autoComW').hide();
        }
    });
    // 자동완성

    // DotDotDot
    $('.notice >  ul > li .noticeContent .noticeFirst .noticeFirstContent p').dotdotdot({
        ellipsis: "\u2026 ",
        watch: "true"
    });

    /* quick 다음버튼 */
    $('.quickMenuW .next').click(function(){
        var listWidth = $('.quickMenu ul li').width();
        if(!$('.quickMenu ul').is(":animated")){
            $('.quickMenu ul').animate({"left":-listWidth},300,function(){
                $('.quickMenu ul li').first().appendTo($('.quickMenu ul'));
                $('.quickMenu ul').css('left','0')
            });
        }
        return false;
    });

    /* quick 이전버튼 */
    $('.quickMenuW .prev').click(function(){
        var listWidth = $('.quickMenu ul li').width();
        if(!$('.quickMenu ul').is(":animated")){
            $('.quickMenu ul').css('left',-listWidth);
            $('.quickMenu ul li').last().prependTo($('.quickMenu ul'));
            $('.quickMenu ul').animate({"left":"0"},300);
        }
        return false;
    });

    // 공지사항 탭
    $('.notice > ul > li > a').on('click focus',function(){
        $(this).parent().addClass('on').siblings().removeClass('on');
        return false;
    });
    $('.noticeW .noticeType1 .title a').on('mouseleave focusout',function(){
        $(this).parent().removeClass('on');
    });

    /* 도서관일정 다음버튼 */
    $('.scheduleListW .next').click(function(){
        var listWidth = $('.scheduleList ul.on li').width();
        if(!$('.scheduleList ul.on').is(":animated")){
            $('.scheduleList ul.on').animate({"left":-listWidth},300,function(){
                $('.scheduleList ul.on li').first().appendTo($('.scheduleList ul.on'));
                $('.scheduleList ul.on').css('left','0')
            });
        }
        return false;
    });

    /* 도서관일정 이전버튼 */
    $('.scheduleListW .prev').click(function(){
        var listWidth = $('.scheduleList ul.on li').width();
        if(!$('.scheduleList ul.on').is(":animated")){
            $('.scheduleList ul.on').css('left',-listWidth);
            $('.scheduleList ul.on li').last().prependTo($('.scheduleList ul.on'));
            $('.scheduleList ul.on').animate({"left":"0"},300);
        }
        return false;
    });

    /* 도서관 일정 Month 슬라이드 */
    $('.scheduleMonth .prev').click(function(){
        var currentMonth = $('.scheduleMonth ul li.on').index();
        $('.scheduleMonth ul li').removeClass('on');
        $('.scheduleMonth ul li').eq(currentMonth-1).addClass('on');
        $('.scheduleList ul').removeClass('on');
        $('.scheduleList ul').eq(currentMonth-1).addClass('on');
        currentMonth--;
        console.log(currentMonth)
        return false
    });
    $('.scheduleMonth .next').click(function(){
        var currentMonthCnt = $('.scheduleMonth ul li').length;
        var currentMonth = $('.scheduleMonth ul li.on').index();
        if((currentMonthCnt-1) == currentMonth){
            currentMonth=0;
        }else if(currentMonthCnt > currentMonth){
            currentMonth++;
        }
        $('.scheduleMonth ul li').removeClass('on');
        $('.scheduleMonth ul li').eq(currentMonth).addClass('on');

        $('.scheduleList ul').removeClass('on');
        $('.scheduleList ul').eq(currentMonth).addClass('on');

        console.log(currentMonth);
        return false
    });

    $('.collectionList .bookList').slick({
        slide: 'div',
        infinite : true,
        slidesToShow : 6,
        //slidesToScroll : 1,
        swipeToSlide:true,
        speed : 500,
        arrows : true,
        vertical : false,
        prevArrow : "<a href='#' class='slickPrev'>Previous</a>",       // 이전 화살표 모양 설정
        nextArrow : "<a href='#' class='slickNext'>Next</a>",   // 다음 화살표 모양 설정
        draggable : true,
        responsive: [ // 반응형 웹 구현 옵션
            {
                breakpoint: 1560, //화면 사이즈 1560px
                settings: {
                    slidesToShow:5
                }
            },
            {
                breakpoint: 1450, //화면 사이즈 1450px
                settings: {
                    slidesToShow:4
                }
            },
            {
                breakpoint: 1024, //화면 사이즈 1024
                settings: {
                    slidesToShow:3,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '60px',
                }
            },
            {
                breakpoint: 800, //화면 사이즈 800
                settings: {
                    slidesToShow:2,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '120px',
                }
            },
            {
                breakpoint: 690, //화면 사이즈 690
                settings: {
                    slidesToShow:2,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '90px',
                }
            },
            {
                breakpoint: 630, //화면 사이즈 630
                settings: {
                    slidesToShow:2,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '60px',
                }
            },
            {
                breakpoint: 560, //화면 사이즈 560
                settings: {
                    slidesToShow:2,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '30px',
                }
            },
            {
                breakpoint: 500, //화면 사이즈 500
                settings: {
                    slidesToShow:1,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '120px',
                }
            }
            ,
            {
                breakpoint: 460, //화면 사이즈 460
                settings: {
                    slidesToShow:1,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '70px',
                }
            },{
                breakpoint: 400, //화면 사이즈 400
                settings: {
                    slidesToShow:1,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '60px',
                }
            },{
                breakpoint: 380, //화면 사이즈 380px
                settings: {
                    slidesToShow:1,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '50px',
                }
            },{
                breakpoint: 330, //화면 사이즈 330px
                settings: {
                    slidesToShow:1,
                    arrows : false,
                    centerMode: true,
                      centerPadding: '30px',
                }
            }
        ]
    });

    var collectionTotal = $('.collectionList .bookList').slick("getSlick").slideCount;
    $('.collectionList .slickCounter .total').text(collectionTotal);

    $('.collectionList .bookList').on('init', function(event, slick) {
        $('.collectionList .slickCounter .current').text(slick.currentSlide + 1);
    })
    .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.collectionList .slickCounter .current').text(nextSlide + 1);
    });

    $('.tabList a.tab').on('click', function(){
    if($(this).siblings().children('.bookList').html().length > 20)
    {
        var total = $(this).siblings().children('.bookList').slick("getSlick").slideCount;
        $('.tabListW .slickCounter .total').text(total);

         $('.tabListW .tabList a.tab').parent().removeClass('on')
        $(this).parent().addClass('on');
        $('.tabListW .tabList .bookListW').hide();
        $('.tabListW .tabList li.on .bookListW').show();

        $(this).siblings().children('.bookList').slick('setPosition');
        $(this).siblings().children('.bookList').on('init', function(event, slick) {
            $('.tabListW ul li.on .slickCounter .current').text(slick.currentSlide + 1);
        })
        .on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('.tabListW ul li.on .slickCounter .current').text(nextSlide + 1);
        });
    }
    else
    {
        $('.tabListW .slickCounter .total').text(0);
        $('.tabListW .tabList a.tab').parent().removeClass('on')
        $(this).parent().addClass('on');
        $('.tabListW .tabList .bookListW').hide();
        $('.tabListW .tabList li.on .bookListW').show();
    }
        return false;
    });

    var tabCnt = $('.tabList > div > ul > li').length;
    if(tabCnt > 3){
        $('.contents4').addClass('tabBox');
    }

    // 하단 배너링크 마우스오버
    $(document).on('mouseover','.bannerList div a',function(e){
        var src = $(this).children('img').data('oversrc');
        if(src != ''){
            $(this).children('img').attr('src',src);
        }
    });
    $(document).on('mouseout','.bannerList div a',function(e){
        var src = $(this).children('img').data('orgsrc');
        if(src != ''){
            $(this).children('img').attr('src',src);
        }
    });

    $('.bannerList').slick({
        slide: 'div',
        infinite : true,
        slidesToShow : 6,
        slidesToScroll : 1,
        speed : 500,
        autoplay : true,
        autoplaySpeed : 3000,
        arrows : true,
        vertical : false,
        prevArrow : $('.bannerPrev'),
        nextArrow : $('.bannerNext'),
        draggable : true,
        responsive: [ // 반응형 웹 구현 옵션
            {
                breakpoint: 1100, //화면 사이즈 1100
                settings: {
                    slidesToShow:4,
                }
            },
            {
                breakpoint: 800, //화면 사이즈 800
                settings: {
                    slidesToShow:3
                }
            },
            {
                breakpoint: 570, //화면 사이즈 570
                settings: {
                    slidesToShow:2
                }
            },
            {
                breakpoint: 450, //화면 사이즈 450
                settings: {
                    slidesToShow:1
                }
            }
        ]
    });

    function chkClass() {
        if($('.banner .slick-arrow').hasClass('slick-hidden')){
            $('.bannerListW .play').addClass('hidden');
            $('.bannerListW .pause').addClass('hidden');
        }else{
            $('.bannerListW .play').removeClass('hidden');
            $('.bannerListW .pause').removeClass('hidden');
        }
    }
    setInterval(function(){
        chkClass();
    },1);

    $('.bannerListW .play').click(function(){
        $('.bannerList').slick('slickPlay');
        $(this).hide();
        $('.btnW .pause').show();
        $('.btnW .pause').focus();
        return false;
    });

    $('.bannerListW .pause').click(function(){
        $('.bannerList').slick('slickPause');
        $(this).hide();
        $('.btnW .play').css('display','inline-block');
        $('.btnW .play').focus();
        return false;
    });

    /*팝업존*/
    var interValPop;
    var popIdx=0;
    var popupListCnt = $('.control ul li').length;
    //자동슬라이드
    var startInterval = function(){
        $('.control ul li').eq(popIdx).addClass('on').siblings().removeClass('on');
        $('.popupImg li').eq(popIdx).addClass('on').siblings().removeClass('on');
    };
    //다음 인덱스 값 구하기
    var next_idx = function(){
        if(popIdx>popupListCnt-2){
            popIdx = 0;
        }else{
            popIdx++
        }
        return popIdx;
    };
    var prev_idx = function(){
        if(popIdx<popupListCnt-2){
            popIdx = popupListCnt - 1;
        }else{
            popIdx--;
        }
        return popIdx;
    };
    var playPop = function(){
        interValPop = setInterval(function(){
            startInterval(next_idx())},3300);
    };
    var stopPop = function(){
        clearInterval(interValPop);
    };
    playPop();

    //다음버튼 클릭
    $('.control .next').click(function(){
        stopPop();
        startInterval(next_idx())
        playPop();
        startInterval(popIdx);
        return false;
    });
    //이전버튼 클릭
    $('.control .prev').click(function(){
        stopPop();
        startInterval(prev_idx())
        playPop();
        startInterval(popIdx);
        return false;
    });

    //일시정지버튼 클릭
    $('.control .pause').click(function(){
        stopPop();
        $(this).hide();
        $('.control .play').css('display','block');
        $('.control .play').focus();
        return false;
    });
    //플레이버튼 클릭
    $('.control .play').click(function(){
        $(this).hide();
        $('.control .pause').css('display','block');
        $('.control .pause').focus();
        if($('.popupZone').hasClass('stop')){
            stopPop();
        }else{
            playPop();
        }
        return false;
    });

    $('.popupZone').mouseover(function(){
        $('.popupZone').addClass('stop')
        stopPop();
    });
    $('.popupZone').mouseleave(function(){
        $('.popupZone').removeClass('stop')
        if($('.control .pause').css('display') == 'block'){
            playPop();
        }
    });

    $('.popupZone').focusin(function(){
        $('.popupZone').addClass('stop')
        stopPop();
    });
    $('.popupZone').focusout(function(){
        $('.popupZone').removeClass('stop')
        if($('.control .pause').css('display') == 'block'){
            playPop();
        }
    });

    // 팝업 dot클릭
    $('.control ul li a').click(function(){
        stopPop();
        $(this).parent().addClass('on').siblings().removeClass('on');
        popIdx = $('.control ul li').index($(this).parent());
        //playPop();
        startInterval(popIdx);
        return false;
    });

    /* 관련사이트 */
    $('.relationSite > a').click(function(e){
        if($(this).parent().hasClass('on')){
            $(this).parent().removeClass('on');
            $('.relationSite ul').stop().slideUp();
            return false;
        }else{
            $(this).parent().addClass('on');
            $('.relationSite ul').stop().slideDown();
            return false;
        }
    });

    // 영역외 클릭시 관련사이트 닫기
    $('body').click(function(e){
        if(!$('.relationSite').has(e.target).length){
            $('.relationSite ul').stop().slideUp();
            $('.relationSite').removeClass('on');
        }
    });

    /* 도서관 일정 Month 슬라이드 */

    // $('.quickMenu').slick({
    // });
    var quickCnt = $('.quickMenu>div').length;
    var quickShow = quickCnt < 9 ? quickCnt : 9
    var slickOption= {
        slide: 'div',
        infinite : true,
        slidesToShow : quickShow,
        //slidesToScroll : 1,
        swipeToSlide:true,
        speed : 500,
        arrows : false,
        vertical : false,
        draggable : true,
        responsive: [ // 반응형 웹 구현 옵션
            {
                breakpoint: 1024, //화면 사이즈 1024px
                settings: {
                    slidesToShow:4,
                    centerMode: true,
                    centerPadding: '90px',
                }
            },{
                breakpoint: 650, //화면 사이즈 650px
                settings: {
                    slidesToShow:3,
                    centerMode: true,
                    centerPadding: '90px',
                }
            },{
                breakpoint: 500, //화면 사이즈 500px
                settings: {
                    slidesToShow:3,
                    centerMode: true,
                    centerPadding: '30px',
                }
            },

        ]
    };
    var quickSlider =$('.quickMenu');
    quickSlider.slick(slickOption);
    $('.quickMenuAll').click(function(){
        if($(this).hasClass('on')){
            quickSlider.not('.slick-initialized').slick(slickOption);
            $('.contents1').removeClass('all');
            $(this).text('전체보기');
            $(this).attr('title', '전체보기');
            $('.quickMenuAll').removeClass('on');

        }else{
            $('.quickMenu').slick("unslick");
            $('.contents1').addClass('all');
            $(this).text('닫기');
            $(this).attr('title', '닫기');
            $(this).addClass('on');
        }
        return false;
    });
    $(window).on('resize', function(){
        if(winWidth > 1024){
            $('.contents1').removeClass('all');
            $('.quickMenuAll').text('전체보기')
            $('.quickMenuAll').attr('title', '전체보기');
            $('.quickMenuAll').removeClass('on');
            quickSlider.not('.slick-initialized').slick(slickOption);
        }
    });

    $('.languageSelect option:selected').click(function(){
        location.href = $(".languageSelect option:selected").val();
    });

    $('.languageSelect').change(function(){
        location.href = $(".languageSelect option:selected").val();
    });

    //메인 검색 value 따라 클래스 부여
    $('#mainSearchSelect').change(function(){
        var selV = $('#mainSearchSelect option:selected').val();
        if(selV == 'book'){
            $(this).parent().addClass('add');
        }else if(selV == 'serial'){
            $(this).parent().addClass('add');
        }else{
            $(this).parent().removeClass('add');
        }
    });

    let countInterVal;
    let qrCode;

    function fn_paddedFormat(num){
        return num < 10 ? '0' + num : num;
    }

    function fn_getWaitTime(waitTime){
        let min = parseInt(waitTime / 60);
        let sec = parseInt(waitTime % 60);

        if(min != 0){
            return fn_paddedFormat(min)+'분 '+fn_paddedFormat(sec)+'초';
        }else{
            return fn_paddedFormat(sec)+'초';
        }
    }

    function fn_qrCode(){

        _ajax('.qr', '/fnct/user/makeQrCode','post',null,function(data){
            if(qrCode != null){
                qrCode.clear();
                qrCode.makeCode(data);
            }else{
                qrCode = new QRCode('qrCode',{
                   text : data,
                   colorDark : '#000000',
                   colorLight : '#ffffff',
                   correctLevel : QRCode.CorrectLevel.H
                });
            };

            if(countInterVal != null){
                clearInterval(countInterVal);
            }

            let waitTime = 90;
            $('.cardPop .time span').text(fn_getWaitTime(waitTime));
            countInterVal = setInterval(function(){
                if(waitTime <= 0){
                    clearInterval(countInterVal);
                    $('.cardPop .time span').html(fn_getWaitTime(waitTime)+'<br>유효시간이 초과하였습니다.<br> 재발급 후 이용해주세요.');
                }else{
                    waitTime = waitTime - 1;
                    $('.cardPop .time span').text(fn_getWaitTime(waitTime));
                }
            }, 1000);
        }, null, "text", 'false');

    }

    $('#qrCode').click(function(){
      $.magnificPopup.open({
        items: {
            src : '<div class="white-popup">'+$(this).html()+'</div>',
            type : 'inline'
        },
        showCloseBtn : false
      });
    });

    //회원증
    $('.globalMenu ul>li.card>a').click(function(){
        $('html, body').css('overflow','hidden');
        $(this).parent().addClass('on');
        fn_qrCode();
        return false;
    });

    $('.card .qrBtn .retry span').click(function(){
        fn_qrCode();
        return false;
    });

    $('.qrBtn a.close').click(function(){
        $('html, body').css('overflow','visible');
        $('.globalMenu ul>li.card').removeClass('on');
        clearInterval(countInterVal);
        return false;
    });

    var windowH = $(window).height();
    $('.cardPop').css('height',windowH)
    $(window).on('resize',function(){
        windowH = $(window).height();
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        $('.cardPop').css('height',windowH);
        if(winWidth > 767){
            if($('.globalMenu ul>li.card').hasClass('on')){
                $('html, body').css('overflow','visible');
            }
        }else{
            if($('.globalMenu ul>li.card').hasClass('on')){
                $('html, body').css('overflow','hidden');
            }
        }
    });

    //공지사항 더보기 위치조정
    var noticeL = $('#bbsListOutpt>li').length;
    var noticeW = $('#bbsListOutpt>li').eq(0).width();
    if(winWidth > 767){
       if(noticeL == 5){
            $('.notice > ul > li .noticeContent > .more').css('right','0')
        }else{
            $('.notice > ul > li .noticeContent > .more').css('left', noticeW * noticeL -1).css('right','auto')
        }
    }

    $(window).on('resize',function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        noticeL = $('#bbsListOutpt>li').length;
        noticeW = $('#bbsListOutpt>li').eq(0).width();
       if(winWidth > 767){
           if(noticeL == 5){
                $('.notice > ul > li .noticeContent > .more').css('right','0')
            }else{
                $('.notice > ul > li .noticeContent > .more').css('left', noticeW * noticeL -1).css('right','auto')
            }
        }else{
            $('.notice > ul > li .noticeContent > .more').css('right','0').css('left', 'auto')
        }

    });
    $('.tabListW .bookList').slick({
		slide: 'div',
        infinite : true,
        slidesToShow : 6,
        //slidesToScroll : 1,
        swipeToSlide:true,
        speed : 500,
        arrows : true,
        vertical : false,
		prevArrow : "<a href='#' class='slickPrev'>Previous</a>",		// 이전 화살표 모양 설정
		nextArrow : "<a href='#' class='slickNext'>Next</a>",	// 다음 화살표 모양 설정
		draggable : true,	
		responsive: [ // 반응형 웹 구현 옵션
			{  
				breakpoint: 1560, //화면 사이즈 1560px
				settings: {
					slidesToShow:5 
				} 
			},
			{ 
				breakpoint: 1450, //화면 사이즈 1450px
				settings: {	
					slidesToShow:4
				} 
			},
			{ 
				breakpoint: 1024, //화면 사이즈 1024px
				settings: {	
					slidesToShow:3,
					arrows : false, 
					centerMode: true,
  					centerPadding: '60px',
				} 
			},
			{ 
				breakpoint: 800, //화면 사이즈 800px
				settings: {	
					slidesToShow:2,
					arrows : false, 
					centerMode: true,
  					centerPadding: '120px',
				} 
			},
			{ 
				breakpoint: 690, //화면 사이즈 690px
				settings: {	
					slidesToShow:2,
					arrows : false, 
					centerMode: true,
  					centerPadding: '90px',
				} 
			},
			{ 
				breakpoint: 630, //화면 사이즈 630px
				settings: {	
					slidesToShow:2,
					arrows : false, 
					centerMode: true,
  					centerPadding: '60px',
				} 
			},
			{ 
				breakpoint: 560, //화면 사이즈 560px
				settings: {	
					slidesToShow:2,
					arrows : false, 
					centerMode: true,
  					centerPadding: '30px',
				} 
			},
			{ 
				breakpoint: 500, //화면 사이즈 500px
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '120px',
				} 
			}
			,
			{ 
				breakpoint: 460, //화면 사이즈 460px
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '70px',
				} 
			},{ 
				breakpoint: 400, //화면 사이즈 400px
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '60px',
				} 
			},{ 
				breakpoint: 380, //화면 사이즈 380px
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '50px',
				} 
			},{ 
				breakpoint: 330, //화면 사이즈 330px
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '30px',
				} 
			}
		]
	});
	$('.databaseList .bookList').slick({
		slide: 'div',
        infinite : true,
        slidesToShow : 6,
        //slidesToScroll : 1,
        swipeToSlide:true,
        speed : 500,
        arrows : true,
        vertical : false,
		prevArrow : "<a href='#' class='slickPrev'>Previous</a>",		// 이전 화살표 모양 설정
		nextArrow : "<a href='#' class='slickNext'>Next</a>",	// 다음 화살표 모양 설정
		draggable : true,	
		responsive: [ // 반응형 웹 구현 옵션
			{ 
				breakpoint: 1450, //화면 사이즈 1450px
				settings: {	
					slidesToShow:4
				} 
			},
			{ 
				breakpoint: 1024, //화면 사이즈 1024
				settings: {	
					slidesToShow:3,
					arrows : false, 
					centerMode: true,
  					centerPadding: '60px',
				} 
			},
			{ 
				breakpoint: 800, //화면 사이즈 800
				settings: {	
					slidesToShow:2,
					arrows : false, 
					centerMode: true,
  					centerPadding: '120px',
				} 
			},
			{ 
				breakpoint: 690, //화면 사이즈 690
				settings: {	
					slidesToShow:2,
					arrows : false, 
					centerMode: true,
  					centerPadding: '90px',
				} 
			},
			{ 
				breakpoint: 630, //화면 사이즈 630
				settings: {	
					slidesToShow:2,
					arrows : false, 
					centerMode: true,
  					centerPadding: '60px',
				} 
			},
			{ 
				breakpoint: 560, //화면 사이즈 560
				settings: {	
					slidesToShow:2,
					arrows : false, 
					centerMode: true,
  					centerPadding: '30px',
				} 
			},
			{ 
				breakpoint: 500, //화면 사이즈 500
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '120px',
				} 
			}
			,
			{ 
				breakpoint: 460, //화면 사이즈 460
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '70px',
				} 
			},{ 
				breakpoint: 400, //화면 사이즈 400
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '60px',
				} 
			},{ 
				breakpoint: 380, //화면 사이즈 380px
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '50px',
				} 
			},{ 
				breakpoint: 330, //화면 사이즈 330px
				settings: {	
					slidesToShow:1,
					arrows : false, 
					centerMode: true,
  					centerPadding: '30px',
				} 
			}
		]
	});

	$(document).ready(function(){
		var TabTotal = $('.tabListW .tabList ul li.on .bookList').slick("getSlick").slideCount;
		var collectionTotal = $('.collectionList .bookList').slick("getSlick").slideCount;
		var databaseTotal = $('.databaseList .bookList').slick("getSlick").slideCount;
		$('.tabListW .slickCounter .total').text(TabTotal);
		$('.collectionList .slickCounter .total').text(collectionTotal);
		$('.databaseList .slickCounter .total').text(databaseTotal);
	});

	$('.tabListW ul li.on .bookList').on('init', function(event, slick) {
		$('.tabListW ul li.on .slickCounter .current').text(slick.currentSlide + 1);
	})
	.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('.tabListW ul li.on .slickCounter .current').text(nextSlide + 1);
	});
	$('.collectionList .bookList').on('init', function(event, slick) {
		$('.collectionList .slickCounter .current').text(slick.currentSlide + 1);
	})
	.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('.collectionList .slickCounter .current').text(nextSlide + 1);
	});
	$('.databaseList .bookList').on('init', function(event, slick) {
		$('.databaseList .slickCounter .current').text(slick.currentSlide + 1);
	})
	.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
		$('.databaseList .slickCounter .current').text(nextSlide + 1);
	});

	$('.tabList a.tab').on('click focus', function(){
		var total = $(this).siblings().children('.bookList').slick("getSlick").slideCount;
		$('.tabListW .slickCounter .total').text(total);
		$('.tabListW .tabList a.tab').parent().removeClass('on')
		$(this).parent().addClass('on');
		$('.tabListW .tabList .bookListW').hide();
		$('.tabListW .tabList li.on .bookListW').show();
		$('.tabListW .bookList').slick('setPosition');
		$(this).siblings().children('.bookList').on('init', function(event, slick) {
			$('.tabListW ul li.on .slickCounter .current').text(slick.currentSlide + 1);
		})
		.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			$('.tabListW ul li.on .slickCounter .current').text(nextSlide + 1);
		});
		return false;
	});
	$(document).ready(function(){
		var tabCnt = $('.tabList > div > ul > li').length;
		if(tabCnt > 3){
			$('.contents4').addClass('tabBox');
		}
	});

});

function getBbsMiniList(bbsNo, bbsListId, menuUri, ctgryUseAt) {
    $.ajax({
        url : "/humanframe-cms/getMiniBBS.json"
        , data : {
             bbsNo : bbsNo,
             bbsListId : bbsListId
            }
        , type : "GET"
        , dataType : "json"
        , success : function(data) {
            var arr = data.list;
            var mList = '';
                mList += '<a href="#" title="'+data.title+'">'+data.title+'</a>';
                mList += '<div class="noticeContent">';

                 if(arr.length == 0){
                    mList += '<div class="noticeFirst">';
                    mList += '<strong>'+NO_DATA+'</strong>';
                    mList += '</div>';
                }

            for(var i in arr){
                if(i < 7)
                {
                    var sj = arr[i].sj;
                    if(typeof sj == "undefined" || sj == null || sj == ""){
                        sj = '제목 없음';
                    }
                    if( i == 0)
                    {
                        mList += '<div class="noticeFirst">';
                        mList += '<div class="noticeFirstDate">';
                        mList += '<strong>'+(arr[i].writngDe).substring(8,10)+'</strong>';
                        mList += '<span>'+(arr[i].writngDe).substring(0,7)+'</span>';
                        mList += '</div>';
                        mList += '<div class="noticeFirstContent">';
                        mList += '<a href="'+BASE_URI+arr[i].linkUrl.substr(arr[i].linkUrl.indexOf('/'))+'/'+arr[i].nttNo+'" title="'+sj+'">'+ sj +'</a>';
                        if(arr[i].sumry != null){
                            mList += '<p>'+arr[i].sumry+'</p>';
                        }
                        mList += '</div>';
                        mList += '</div>';
                    }
                    else
                    {
                        if(i == 1)
                        {
                            mList += '<ul>';
                        }

                        mList += '<li>';
                        mList += '<a href="'+BASE_URI+arr[i].linkUrl.substr(arr[i].linkUrl.indexOf('/'))+'/'+arr[i].nttNo+'" title="'+ sj +'">';
                        if(!$.isEmptyObject(arr[i].ctgryNm)){
                        mList += '<span class="mark">'+arr[i].ctgryNm+'</span>';
                        }
                        mList += sj + '</a>';
                        mList += '<span class="noticeDate">'+arr[i].writngDe+'</span>';
                        mList += '</li>';
                        if( i == (arr.length - 1) || i == 6)
                        {
                            mList += '</ul>';
                        }
                    }
                    }
                else
                {
                    break;
                }
            }

            mList += '<a href="'+BASE_URI+'/'+menuUri+'" class="more" title="'+data.title+'">more</a>';
            mList += '</div>';

            $("#notice_"+bbsNo).append(mList);
         },
         beforeSend:function(){},
         error: function(data, status, err) {
             //console.log('error forward : ' + data);
         },
         complete : function(data) {}
 });
}

function getBbsMiniListSimple(bbsNo, bbsListId, menuUri, ctgryUseAt) {
    $.ajax({
        url : "/humanframe-cms/getMiniBBS.json"
        , data : {
             bbsNo : bbsNo,
             bbsListId : bbsListId
            }
        , type : "GET"
        , dataType : "json"
        , success : function(data) {
            var arr = data.list;
            var mList = '';
                mList += '<a href="#" title="'+data.title+'">'+data.title+'</a>';
                mList += '<div class="noticeContent">';

                 if(arr.length == 0){
                    mList += '<div class="noticeFirst">';
                    mList += '<strong>'+NO_DATA+'</strong>';
                    mList += '</div>';
                }

            for(var i in arr){
                if(i < 7)
                {
                    if(i == 0)
                    {
                        mList += '<ul class="qusetionList">';
                    }
                    var sj = arr[i].sj;
                    if(typeof sj == "undefined" || sj == null || sj == ""){
                        sj = '제목 없음';
                    }

                    mList += '<li>';
                    mList += '<a href="'+BASE_URI+arr[i].linkUrl.substr(arr[i].linkUrl.indexOf('/'))+'/'+arr[i].nttNo+'" title="'+ sj +'">';
                    if(!$.isEmptyObject(arr[i].ctgryNm)){
                    mList += '<span class="mark">'+arr[i].ctgryNm+'</span>';
                    }
                    mList += sj + '</a>';
                    mList += '</li>';
                    if(  i == (arr.length - 1) || i == 6)
                    {
                        mList += '</ul>';
                    }
                }
                else
                {
                    break;
                }

            }
            mList += '<a href="'+BASE_URI+'/'+menuUri+'" class="more" title="'+data.title+'">more</a>';
            mList += '</div>';
             $("#notice_"+bbsNo).append(mList);
         },
         beforeSend:function(){},
         error: function(data, status, err) {
             //console.log('error forward : ' + data);
         },
         complete : function(data) {}
 });
}
