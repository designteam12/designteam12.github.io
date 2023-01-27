$(document).ready(function(){
	//사이즈 변수 선언(공통 사용)
	var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언

	// 검색 상세 section 열기/닫기
	$('.searchHeader h3 a').on('click',function(){
		if($(this).parent().parent().parent().hasClass('on')){
			$(this).parent().parent().siblings().stop().slideUp();
			$(this).parent().parent().parent().removeClass('on');
		}else{
			$(this).parent().parent().siblings().stop().slideDown();
			$(this).parent().parent().parent().addClass('on');
		}
		return false;
	});

	// load시 section open
	$(document).ready(function(){
		$('.searchInfo.on').find('.searchContents').stop().slideDown(0);
	});

	//slick
	if($('.bookDataW').length) {
		$('.bookData').slick({
			slide: 'div',
			infinite: true,
			slidesToShow: 5,
			slidesToScroll: 1,
			speed: 500,
			arrows: true,
			vertical: false,
			prevArrow: "<button type='button' class='slickPrev'>Previous</button>",		// 이전 화살표 모양 설정
			nextArrow: "<button type='button' class='slickNext'>Next</button>",	// 다음 화살표 모양 설정
			draggable: true,
			responsive: [ // 반응형 웹 구현 옵션
				{
					breakpoint: 1440, //화면 사이즈 1440px
					settings: {
						slidesToShow: 4
					}
				},
				{
					breakpoint: 1050, //화면 사이즈 1050px
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 767, //화면 사이즈 767px
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 499, //화면 사이즈 499px
					settings: {
						slidesToShow: 1
					}
				}
			]
		});
	}

	if($('.bookDataW').length){
		$('.bookDataW .bookData div a .author').dotdotdot({
			ellipsis: "\u2026 ",
			watch: "true"
		});
	}
	if($('.bookDataW').length){
		$('.bookDataW .recomBookData div a .bookTitle').dotdotdot({
			ellipsis: "\u2026 ",
			watch: "true"
		});
	}
	if($('.bookDataW').length){
		$('	.bookDataW .bookData div a .bookTitle').dotdotdot({
			ellipsis: "\u2026 ",
			watch: "true"
		});
	}
	// 추천도서 폴더형
	if($('.collectionItem').length){
		$('.collectionItem ul li a span').dotdotdot({
			ellipsis: "\u2026 ",
			watch: "true"
		});
	}

	// comment 열기/닫기
	$('.commentW > li .replyCommentW a').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).text('펼쳐보기');
		}else{
			$(this).parent().addClass('on');
			$(this).text('접어보기');
		}
		return false;
	});

	$(document).ready(function(){
		commentHeight();
	});
	$(window).on('resize',function(){
		commentHeight();
	});

	var commentHeight = function(){
		$('.commentW > li').each(function (index){
			var commentList = $('.commentW > li').eq(index);
			var commentH = $(commentList).find('div.replyCommentW').find('p').height();
			if(commentH < 44){
				$(commentList).find('div.replyCommentW').find('a').css('display','none');
				$(commentList).find('div.replyCommentW').find('p').removeClass('commentH');
			}else{
				$(commentList).find('div.replyCommentW').find('a').css('display','inline-block');
				$(commentList).find('div.replyCommentW').find('p').addClass('commentH');
			}
		});
	};

	$(".commentW > li .replyCommentW a").click(function() {
		var dot = $(this).prev(".replyComment");
		var isTruncated = dot.triggerHandler("isTruncated");
		if ( isTruncated ) {
		  dot.trigger("destroy");
		  dot.addClass('on');
		  $(this).addClass('on');
		} else {
		  dot.removeClass('on');
		  $(this).removeClass('on');
			// dot.dotdotdot({
			// 	height: auto
			// });  
		}
		return false;
	});

	$(".recommendCnt .recommendBtn").click(function() {
		if($(this).parent().hasClass('likeOn')){
			$(this).parent().removeClass('likeOn');
		}else{
			$(this).parent().addClass('likeOn');

		}
		return false;
	});

	// 테이블 초록
	$('.briefInfoDetail table .moreView').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).text('펼쳐보기');
		}else{
			$(this).parent().addClass('on');
			$(this).text('접어보기');
		}
		return false;
	});

	// 초록 열기/닫기
	$('.searchContent .moreView').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).text('펼쳐보기');
		}else{
			$(this).parent().addClass('on');
			$(this).text('접어보기');
		}
		return false;
	});

	/* 링크 네비게이터 */
	$(".stuckMenu ul li a").click(function() {
		var scrollPosition = $($(this).attr("href")).offset().top;
		var i = $(this).parent().index();
		if(i == 0){
			$('html,body').animate({
				scrollTop: 0
			}, 500);
		}else{
			$('html,body').animate({
				scrollTop: scrollPosition - 100
			}, 500);
		}
		$(".stuckMenu ul li").removeClass('on');
		$(this).parent().addClass('on');
		return false;
	});
	$(document).ready(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop >= 200){
			$('.stuckMenu').addClass('fixed');
		}else{
			$('.stuckMenu').removeClass('fixed');
		}
	});
	$(window).on('scroll', function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop >= 200){
			$('.stuckMenu').addClass('fixed');
		}else{
			$('.stuckMenu').removeClass('fixed');
		}
	});


		// 서평쓰기 레이어 팝업
		$('.commentWriteBtn').on('click',function(){
			$(this).parent().find('.layerPopup').addClass('on');
			$('.blackBg').addClass('mo');
			$(this).next().find('.firstFocus').focus();
			return false;
		});
		$('.commentWriteLayer .layerClose').on('click',function(){
			$('.layerPopup').removeClass('on');
			$('.blackBg').removeClass('mo');
			$('.commentWriteBtn').focus();
			return false;
		});
		
		//서평쓰기 별 선택
		$('.selectW').click(function(){
			if($(this).hasClass('on')){
				$('.selectBox .srchSelectBox .OptList').slideUp(200);
				$(this).removeClass('on');
				return false;
			}else{
				$('.selectBox .srchSelectBox .OptList').slideDown(200);
				$(this).addClass('on');
				return false;
			}
		});
	
		//서평쓰기 별 영역외 클릭시 닫기
		$('body').click(function(e){
			if(!$('.selectW').has(e.target).length){
				$('.selectBox .srchSelectBox .OptList').stop().slideUp(200);
				$('.selectW').removeClass('on');
			}
		});
	
		//서평쓰기 별 select Box
		$('.OptList > ul > li > a').click(function(e){
			var optText = $(this).children('span').text();
			$(this).parent().parent().parent().parent().prev().find('label').html($(this).parent().html());//옵션선택시 텍스트 변경
			$(this).parent().parent().parent().parent().siblings().children('select').find('option').removeAttr('selected');
			$(this).parent().parent().parent().parent().siblings().children('select').find('option').filter(function() {return this.text == optText;}).attr('selected', 'selected');
			$('.selectBox .srchSelectBox .OptList').stop().slideUp(200);
			$('.selectW').removeClass('on');
			return false;
		});
		 // 서평쓰기 레이어 팝업
	
		// 태그 추가 레이어 팝업
		$('.tagWriteBtn').on('click',function(){
			$(this).parent().find('.layerPopup').addClass('on');
			$('.blackBg').addClass('mo');
			$(this).next().find('.firstFocus').focus();
			return false;
		});
		$('.tagWriteLayer .layerClose').on('click',function(){
			$('.layerPopup').removeClass('on');
			$('.blackBg').removeClass('mo');
			$('.tagWriteBtn').focus();
			return false;
		});
		// 태그 추가 레이어 팝업
		
		// Marc View popup
		$('.marcView .open').on('click', function(){
			$('.marcPopup').fadeIn(300);
			$('.marcView .marcPopup .close').focus();
			return false;
		});
		$('.marcView .marcPopup .close').on('click', function(){
			$('.marcPopup').fadeOut(300);
			$('.marcView .open').focus();
			return false;
		});
		// Marc View popup
	
});