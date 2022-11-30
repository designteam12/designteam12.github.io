$(document).ready(function(){

    //로드 이벤트
    $(window).on('load', function () {
        setTimeout(function () {
            $('.topFirstVisit .txt').addClass('on');
        }, 1000)

    });


    /*//소속기관 구독
    var listView = {
        slide: 'div',
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
    };
    $('.listViewW').slick(listView);*/


    //소속기관 높이 -> ** 슬릭 선언 후에 높이값 스크립트 들어가야함
    let scH1 = $('.subscription').height();
    let scH2 = $('.tabCont').height();
    /*$('.subscriptionW').css('height', scH2 + 45);*/

    //윈도우 렉으로 슬릭보다 먼저 높이값을 구해 로드시 높이값 스트립트 추가
    $(window).on('load', function () {
        setTimeout(function () {
            scH1 = $('ul.subscriptTab li.on').find('.subscription').height();
            scH2 = $('ul.subscriptTab li.on').find('.tabCont').height();
            $('.subscriptionW').css('height',  scH2 + 45);
        }, 1000)
    });
    $(window).on('resize', function () {
        scH1 = $('ul.subscriptTab li.on').find('.subscription').height();
        scH2 = $('ul.subscriptTab li.on').find('.tabCont').height();
        $('.subscriptionW').css('height',  scH2 + 45);
    });



    //소속기관 페이징
    /*$(window).on('load', function () {
        var listViewW1 = $('.subscriptTab1 .listViewW').slick("getSlick").slideCount;
        var listViewW2 = $('.subscriptTab2 .listViewW').slick("getSlick").slideCount;
        var listViewW3 = $('.subscriptTab3 .listViewW').slick("getSlick").slideCount;
        var listViewW4 = $('.subscriptTab4 .listViewW').slick("getSlick").slideCount;
        $('.subscriptTab1 .total').text(listViewW1);
        $('.subscriptTab2 .total').text(listViewW2);
        $('.subscriptTab3 .total').text(listViewW3);
        $('.subscriptTab4 .total').text(listViewW4);
    });

    $('.subscriptTab1 .listViewW').on('init', function (event, slick) {
        $('.subscriptTab1 .tabCont .count .current').text(slick.currentSlide + 1);
    })
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.subscriptTab1 .tabCont .count .current').text(nextSlide + 1);
        });
    $('.subscriptTab2 .listViewW').on('init', function (event, slick) {
        $('.subscriptTab2 .tabCont .count .current').text(slick.currentSlide + 1);
    })
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.subscriptTab2 .tabCont .count .current').text(nextSlide + 1);
        });
    $('.subscriptTab3 .listViewW').on('init', function (event, slick) {
        $('.subscriptTab3 .tabCont .count .current').text(slick.currentSlide + 1);
    })
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.subscriptTab3 .tabCont .count .current').text(nextSlide + 1);
        });
    $('.subscriptTab4 .listViewW').on('init', function (event, slick) {
        $('.subscriptTab4 .tabCont .count .current').text(slick.currentSlide + 1);
    })
        .on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            $('.subscriptTab4 .tabCont .count .current').text(nextSlide + 1);
        });*/

    /*$('.subscriptTab>li>a').click(function (e) {
        e.preventDefault();
        $('.subscriptTab>li').removeClass('on');
        $(this).parent().not('.link').addClass('on');
        $('.listViewW').slick('setPosition');
    });*/



    //관심DB등록
    /*$('.contListW .listCont .bottom .botFuntion .favorite').click(function (e) {
        e.preventDefault();
        $('.subscriptTab>li>a .interestDot').fadeIn();
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).parent().children('.favorPop2').fadeIn();
            $('.listViewW').addClass('on');
            setTimeout(function () {
                $('.favorPop2').fadeOut();
                $('.listViewW').removeClass('on');
            }, 1500);
        } else {
            $(this).addClass('on');
            $(this).parent().children('.favorPop1').fadeIn();
            $('.subscriptTab>li>a .intersetIco').fadeIn();
            $('.listViewW').addClass('on');
            setTimeout(function () {
                $('.favorPop1').fadeOut();
                $('.subscriptTab>li>a .intersetIco').fadeOut();
                $('.listViewW').removeClass('on');
            }, 1500);
        }

    });*/



    //주제별전자저널
    /*var sbjSlide = {
        slide: 'div',
        infinite: true,
        arrows: false,
        autoplay: false,
        autoplaySpeed: 2000,
        //prevArrow : "<button type='button' class='sbjPrev'>Previous</button>",
        //nextArrow : "<button type='button' class='sbjNext'>Next</button>",
        speed: 500,
        slidesToShow: 9,
        //variableWidth: true,
        swipeToSlide: true,
        draggable: true,
        responsive: [
            {
                breakpoint: 1220,
                settings: {
                    slidesToShow: 7,
                }
            },
            {
                breakpoint: 960,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 3,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 420,
                settings: {
                    slidesToShow: 3,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 355,
                settings: {
                    slidesToShow: 2,
                    variableWidth: true,
                }
            }
        ]
    };
    $('.sbjTab .sbjList').slick(sbjSlide);
    var sbjCount = $('.sbjTab .sbjList').slick("getSlick").slideCount;
    var bar = $('.sbjBar').width();
    var result = bar / sbjCount;
    var cS = Number($('.sbjList .slick-active').attr('data-slick-index')) + 1;
    var current = result * cS
    $('.sbjBar span').css('width', current)

    $('.sbjTab .slick-active').last().addClass('sp').siblings().removeClass('sp');

    $('.sbjTab .sbjList').on('afterChange', function (event, slick) {
        sbjCount = $('.sbjTab .sbjList').slick("getSlick").slideCount;
        bar = $('.sbjBar').width();
        result = bar / sbjCount;
        cS = Number($('.sbjList .slick-active').attr('data-slick-index')) + 1;
        current = result * cS
        $('.sbjBar span').css('width', current);
    });



    $('.sbjTab .list a').click(function (e) {
        e.preventDefault();
        $('.sbjTab .list a').removeClass('click')
        $(this).addClass('click')
        var txt = $('.sbjTab .list a').filter('.click').children().text();
        //console.log(txt)
        $('.sbjTab .list a span').each(function () {
            if ($(this).text() == txt) {
                $(this).parent().addClass('click')
            }
        });
    });

    $('.sbjTab .sbjList').on('beforeChange', function (event, slick) {
        var txt = $('.sbjTab .list a').filter('.click').children().text();
        //console.log(txt)
        $('.sbjTab .list a span').each(function () {
            if ($(this).text() == txt) {
                $(this).parent().addClass('click')
            }
        });

    });*/





});    