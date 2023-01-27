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

	//holdingTab
	let holdingTabSlide = new Swiper('.holdingTab .inner',{
		slidesPerView:'auto',
		spaceBetween: 0,
		freeMode: true,
		observer: true,
		observeParents: true,
	});

	let bookInfoTabSlide = new Swiper('.bookInfoTab .inner',{
		slidesPerView:'auto',
		spaceBetween: 0,
		freeMode: true,
		observer: true,
		observeParents: true,
	});


	$('.holdLocation').each(function(){
		if($(this).children().is('.reservationBtn') === true){
			$(this).addClass('small')
		}
		
	});

	//qr 레이어 팝업
	$('.bookQrBtn').on('click',function(){
		$('.bookQrCode').addClass('on');
		$('.blackBg').addClass('mo');
	});

	$('.bookQrCode .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.bookQrBtn').focus();
		return false;
	});
	
	// 예약 레이어 팝업
	$('.reservationBtn').on('click',function(){
		$('.reservationLayer').addClass('on');
		$('.blackBg').addClass('mo');
		$(this).addClass('this');

	});
	$('.reservationLayer .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.reservationBtn.this').focus();
		$('.reservationBtn').removeClass('this');
		return false;
	});

	// 서가부재도서 신청 레이어 팝업 
	$('.missrepo').on('click',function(){
		$('.missrepoLayer').addClass('on');
		$('.blackBg').addClass('mo');
		$(this).addClass('this')
	});
	$('.missrepoLayer .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.missrepo.this').focus();
		$('.missrepo').removeClass('this');
		return false;
	});

	//slick
	$('.browsingSlide').on('init', function(){
		$('.slick-slide[data-slick-index="-5"]').addClass('lt5');
		$('.slick-slide[data-slick-index="-4"]').addClass('lt4');
		$('.slick-slide[data-slick-index="-3"]').addClass('lt3');
		$('.slick-slide[data-slick-index="-2"]').addClass('lt2');
		$('.slick-slide[data-slick-index="-1"]').addClass('lt1');
		$('.slick-slide[data-slick-index="1"]').addClass('gt1');
		$('.slick-slide[data-slick-index="2"]').addClass('gt2');
		$('.slick-slide[data-slick-index="3"]').addClass('gt3');
		$('.slick-slide[data-slick-index="4"]').addClass('gt4');
		$('.slick-slide[data-slick-index="5"]').addClass('gt5');
		$('.slick-slide[data-slick-index="6"]').addClass('gt6');
		$('.slick-slide[data-slick-index="7"]').addClass('gt7');
		$('.slick-slide[data-slick-index="8"]').addClass('gt8');
	  });
	  $('.browsingSlide').slick({
		infinite: true,
		//centerMode: true,
		centerPadding: 0,
		slidesToShow: 8,
		variableWidth: true,
		slidesToScroll: 1,
		draggable: false,
		prevArrow: $('.browsePrev'),
		nextArrow: $('.browseNext'),
		responsive: [ // 반응형 웹 구현 옵션
				{
					breakpoint: 1401, //화면 사이즈 1440px
					settings: {
						draggable: true,
						swipeToSlide: true,
						variableWidth: false,
						slidesToShow: 5,
					}
				},
				{
					breakpoint: 1150, //화면 사이즈 1440px
					settings: {
						draggable: true,
						swipeToSlide: true,
						variableWidth: false,
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 767, //화면 사이즈 1440px
					settings: {
						draggable: true,
						swipeToSlide: true,
						variableWidth: true,
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 499, //화면 사이즈 1440px
					settings: {
						draggable: true,
						swipeToSlide: true,
						variableWidth: true,
						slidesToShow: 1,
					}
				},
		]
	  });
	  $('.browsingSlide').on('beforeChange', function(event, slick, current, next){
		$('.slick-slide.gt8').removeClass('gt8');
		$('.slick-slide.gt7').removeClass('gt7');
		$('.slick-slide.gt6').removeClass('gt6');
		$('.slick-slide.gt5').removeClass('gt5');
		$('.slick-slide.gt4').removeClass('gt4');
		$('.slick-slide.gt3').removeClass('gt3');
		$('.slick-slide.gt2').removeClass('gt2');
		$('.slick-slide.gt1').removeClass('gt1');
		$('.slick-slide.lt1').removeClass('lt1');
		$('.slick-slide.lt2').removeClass('lt2');
		$('.slick-slide.lt3').removeClass('lt3');
		$('.slick-slide.lt4').removeClass('lt4');
		$('.slick-slide.lt5').removeClass('lt5');
	  
		let lt5 = current < next && current > 0 ? current - 4 : next - 5;
		let lt4 = current < next && current > 0 ? current - 3 : next - 4;
		let lt3 = current < next && current > 0 ? current - 2 : next - 3;
		let lt2 = current < next && current > 0 ? current - 1 : next - 2;
		let lt1 = current < next && current > 0 ? current : next - 1;
		let gt1 = current < next || next === 0 ? next + 1 : current;
		let gt2 = current < next || next === 0 ? next + 2 : current + 1;
		let gt3 = current < next || next === 0 ? next + 3 : current + 2;
		let gt4 = current < next || next === 0 ? next + 4 : current + 3;
		let gt5 = current < next || next === 0 ? next + 5 : current + 4;
		let gt6 = current < next || next === 0 ? next + 6 : current + 5;
		let gt7 = current < next || next === 0 ? next + 7 : current + 6;
		let gt8 = current < next || next === 0 ? next + 8 : current + 7;
	  
		$('.slick-slide[data-slick-index='+ lt5 +']').addClass('lt5');
		$('.slick-slide[data-slick-index='+ lt4 +']').addClass('lt4');
		$('.slick-slide[data-slick-index='+ lt3 +']').addClass('lt3');
		$('.slick-slide[data-slick-index='+ lt2 +']').addClass('lt2');
		$('.slick-slide[data-slick-index='+ lt1 +']').addClass('lt1');
		$('.slick-slide[data-slick-index='+ gt1 +']').addClass('gt1');
		$('.slick-slide[data-slick-index='+ gt2 +']').addClass('gt2');
		$('.slick-slide[data-slick-index='+ gt3 +']').addClass('gt3');
		$('.slick-slide[data-slick-index='+ gt4 +']').addClass('gt4');
		$('.slick-slide[data-slick-index='+ gt5 +']').addClass('gt5');
		$('.slick-slide[data-slick-index='+ gt6 +']').addClass('gt6');
		$('.slick-slide[data-slick-index='+ gt7 +']').addClass('gt7');
		$('.slick-slide[data-slick-index='+ gt8 +']').addClass('gt8');
	  
	  });


	if($('.bookDataW').length) {
		$('.bookData').slick({
			slide: 'div',
			infinite: true,
			slidesToShow: 6,
			swipeToSlide: true,
			speed: 500,
			arrows: true,
			prevArrow: "<a href='' class='slickPrev'>Previous</a>",		// 이전 화살표 모양 설정
			nextArrow: "<a href='' class='slickNext'>Next</a>",	// 다음 화살표 모양 설정
			draggable: true,
			responsive: [ // 반응형 웹 구현 옵션
					{
						breakpoint: 1401, //화면 사이즈 1440px
						settings: {
							slidesToShow: 5,
						}
					},
					{
						breakpoint: 1150, //화면 사이즈 1440px
						settings: {
							slidesToShow: 3,
						}
					},
					{
						breakpoint: 767, //화면 사이즈 1440px
						settings: {
							slidesToShow: 2,
							variableWidth: true,
						}
					},
					{
						breakpoint: 499, //화면 사이즈 1440px
						settings: {
							slidesToShow: 1,
							variableWidth: true,
						}
					},
			]
		});
		// slick slide 로드시 display:block
		$('.searchHeader h3 a').on("click", function () {
			$('.bookData').css('display', 'block');
			$(this).parents('.searchInfo').find('.bookData').slick('setPosition')
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
			$(this).text('더보기');
			$(this).attr('title','더보기');
		}else{
			$(this).parent().addClass('on');
			$(this).text('접기');
			$(this).attr('title','접기');
		}
		return false;
	});

	// 초록 열기/닫기
	$('.searchContent .moreView').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).text('더보기');
			$(this).attr('title','더보기');
		}else{
			$(this).parent().addClass('on');
			$(this).text('접기');
			$(this).attr('title','접기');
		}
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
	$('.commentWriteBtn').on('click', function () {
		$('.commentWriteLayer').addClass('on');
		$('.blackBg').addClass('mo');
		$(this).addClass('this');
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth < 768){
			var ph = $('.commentWriteLayer .popTitArea').outerHeight();
			$('.commentWriteLayer .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
		}
	});
	$('.commentWriteLayer .layerClose').on('click', function () {
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.commentWriteBtn.this').focus();
		$('.commentWriteBtn').removeClass('this');
		$('.commentWriteLayer').removeClass('long')
		return false;
	});

	//서평쓰기 별 선택
	$('.selectW').click(function () {
		if ($(this).hasClass('on')) {
			$('.selectBox .srchSelectBox .OptList').slideUp(200);
			$(this).removeClass('on');
			return false;
		} else {
			$('.selectBox .srchSelectBox .OptList').slideDown(200);
			$(this).addClass('on');
			return false;
		}
	});

	//서평쓰기 별 영역외 클릭시 닫기
	$('body').click(function (e) {
		if (!$('.selectW').has(e.target).length) {
			$('.selectBox .srchSelectBox .OptList').stop().slideUp(200);
			$('.selectW').removeClass('on');
		}
	});

	//서평쓰기 별 select Box
	$('.OptList > ul > li > a').click(function (e) {
		var optText = $(this).children('span').text();
		$(this).parent().parent().parent().parent().prev().find('label').html($(this).parent().html());//옵션선택시 텍스트 변경
		$(this).parent().parent().parent().parent().siblings().children('select').find('option').removeAttr('selected');
		$(this).parent().parent().parent().parent().siblings().children('select').find('option').filter(function () { return this.text == optText; }).attr('selected', 'selected');
		$('.selectBox .srchSelectBox .OptList').stop().slideUp(200);
		$('.selectW').removeClass('on');
		return false;
	});
	// 서평쓰기 레이어 팝업

	// 태그 추가 레이어 팝업
	$('.tagWriteBtn').on('click', function () {
		$(this).parent().find('.layerPopup').addClass('on');
		$('.blackBg').addClass('mo');
		$(this).next().find('.firstFocus').focus();
		return false;
	});
	$('.tagWriteLayer .layerClose').on('click', function () {
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.tagWriteBtn').focus();
		return false;
	});
	// 태그 추가 레이어 팝업

	// Marc View popup
	$('.marcView .open').on('click', function () {
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		$('.marcView .marcPopup .close').focus();
		if(winWidth > 767){
			$('.marcPopup').fadeIn(300);
			$('.marcPopup').addClass('on');
		}else{
			$('.marcPopup').addClass('on');
			$('.blackBg').addClass('mo');
			var ph = $('.marcPopup .popTitArea').outerHeight();
			$('.marcPopup .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
		}
		return false;
	});
	$('.marcView .marcPopup .close').on('click', function () {
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		$('.marcView .open').focus();
		$('.marcPopup').removeClass('long');
		if(winWidth > 767){
			$('.marcPopup').fadeOut(300);
			$('.marcPopup').removeClass('on');
		}else{
			$('.marcPopup').removeClass('on');
			$('.blackBg').removeClass('mo');
		}
		return false;
	});

	$(window).on('resize',function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth > 767){
			if($('.marcPopup').hasClass('on')){
				$('.marcPopup').show();
				$('.blackBg').removeClass('mo');
			}
		}else{
			if($('.marcPopup').hasClass('on')){
				$('.blackBg').addClass('mo');
			}
		}
	});

	// Marc View popup

});