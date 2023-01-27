$(function(){
	//사이즈 변수 선언(공통 사용)
	var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언

	//상세검색 레이어
	$('.detailSearchBtn').on('click',function(){
		$('.detailSearchLayer').addClass('on');
		$('.blackBg').addClass('mo');
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth < 768){
			var ph = $('.detailSearchLayer .popTitArea').outerHeight();
			$('.detailSearchLayer .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
		}
	});

	$('.detailSearchLayer .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.detailSearchBtn').focus();
		$('.detailSearchLayer').removeClass('long');
		return false;
	});
	let dsTab = new Swiper('.dsTab .inner',{
		slidesPerView:'auto',
		spaceBetween: 0,
		freeMode: true,
		observer: true,
		observeParents: true,

	});

	$('.layerPopup .popupContent').on('scroll',function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth < 768){
			if($(this).hasScrollBar()){
				$(this).parents('.layerPopup').addClass('long');
			}
		}
		
	});

	$(window).on('resize',function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth < 768){
			if($('.layerPopup').hasClass('on')){
				var ph = $('.layerPopup .popTitArea').outerHeight();
				$('.layerPopup .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
			}
		}
	});

	//chk박스 임시 id 라벨 for 값 부여
	$('.resultList>li').each(function(index){
		$(this).find('.customChk1').attr('id','bookCnt' + (index + 1))
		$(this).find('label').attr('for','bookCnt' + (index + 1))
	});

	//전체선택 및 개별선택 이벤트 테스트
	$('#selectAll').click(function(){
		if($("#selectAll").is(":checked")){
			$('input:checkbox[name=bookList]').prop("checked", true);
			$('input:checkbox[name=bookList]').next().addClass('on');
			$(this).addClass('focus');
		}else{
			$('input:checkbox[name=bookList]').prop("checked", false);
			$('input:checkbox[name=bookList]').next().removeClass('on');
		}
		let chkL = $('.resultList>li input:checkbox[name=bookList]:checked').length;
		$('.bottomSummary .pick').text(chkL)
		
		if(chkL > 0 ){
			$('.bottomSummary').attr("tabindex", 0).fadeIn().focus();
		}
		$('.bottomSummary').attr("tabindex", 0).focus();
	});

	
	$('.resultList>li input:checkbox[name=bookList]').change(function(){
		let listCnt = $('.resultList>li').length;
		let chkL = $('.resultList>li input:checkbox[name=bookList]:checked').length;
		$('input:checkbox[name=bookList]').removeClass('focus');
		$(this).addClass('focus');
		$('.bottomSummary .pick').text(chkL)
		if(chkL > 0 ){
			$('.bottomSummary').attr("tabindex", 0).fadeIn().focus();
		}
		$('.bottomSummary').attr("tabindex", 0).focus();
	});

	$('.bsClose').click(function(e){
		e.preventDefault();
		$('.bottomSummary').attr("tabindex",'').fadeOut();
		$('.bookChk.focus').focus();
		$('.bookChk.focus').removeClass('focus')
	});
	
	//dataInfo hover
	$('.dataInfo>ul>li').mouseover(function(){
		$(this).find('.infoPop').addClass('on')
	});
	$('.dataInfo>ul>li').mouseleave(function(){
		$(this).find('.infoPop').removeClass('on')
	});

	//eachBtns hover
	$('.eachBtns>ul>li').mouseover(function(){
		$(this).find('.infoPop').addClass('on')
	});
	$('.eachBtns>ul>li').mouseleave(function(){
		$(this).find('.infoPop').removeClass('on')
	});

	// 소장정보 open
	$('.locationInfo > a').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().siblings().stop().slideUp();
			$(this).parent().removeClass('on');
			$(this).parent().parent().next('.holdingInfo').removeClass('margin');
		}else{
			$(this).parent().siblings().stop().slideDown();
			$(this).parent().addClass('on');
			$(this).parent().parent().next('.holdingInfo').addClass('margin');
		}
		return false;
	});

	$('.holdingList .checkInBtn').on('click', function(){
		$(this).parent().parent().parent().parent().parent().parent().parent().parent().find('.checkIn').slideToggle(300);
		return false
	});
	$('.holdingList .bindingBtn').on('click', function(){
		$(this).parent().parent().parent().parent().parent().parent().parent().parent().find('.binding').slideToggle(300);
		return false
	});

	$('.holdLocation').each(function(){
		if($(this).children().is('.reservationBtn') === true){
			$(this).addClass('small')
		}
		
	});

	// 예약 레이어 팝업
	$('.reservationBtn').on('click',function(){
		$('.reservationLayer').addClass('on');
		$('.blackBg').addClass('mo');
		$(this).addClass('this');
		if(winWidth < 768){
			var ph = $('.reservationLayer .popTitArea').outerHeight();
			$('.reservationLayer .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
		}

	});
	$('.reservationLayer .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.reservationBtn.this').focus();
		$('.reservationBtn').removeClass('this');
		$('.reservationLayer').removeClass('long');
		return false;
	});
	// 예약 레이어 팝업

	// 서가부재도서 신청 레이어 팝업 
	function missrepo(){
		$('.missrepo').on('click',function(){
			$('.missrepoLayer').addClass('on');
			$('.blackBg').addClass('mo');
			$(this).addClass('this');
			if(winWidth < 768){
				var ph = $('.missrepoLayer .popTitArea').outerHeight();
				$('.missrepoLayer .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
			}
		});
	}
	missrepo();
	
	$('.missrepoLayer .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.missrepo.this').focus();
		$('.missrepo').removeClass('this');
		$('.missrepoLayer').removeClass('long');
		return false;
	});
	
	//footable이 새로운 tr을 append 하면서 스크립트 작동하지 않아 작성
	$('body').click(function(){
		missrepo();
	});
	$(window).on('resize',function(){
		if(winWidth < 768){
			$('.holdingInfo .mobileTable tbody>tr').removeClass('footable-detail-show');
			$('.holdingInfo .mobileTable .footable-row-detail').css('display','none')
		}
	});
	//footable-detail-show
	// 서가부재도서 신청 레이어 팝업


	//facet
	$('.facetList2 ul li ul li input:checkbox').change(function(){
		if($(this).is(":checked")){
			$(this).parent().addClass('on');
		}else{
			$(this).parent().removeClass('on');
		}
		$('.facetList2 ul li ul li input[type=checkbox]').removeClass('focus');
		$(this).addClass('focus')
		if($('.facetList2 ul li ul li input:checkbox:checked').length > 0){
			$('.retryBox').attr("tabindex", 0).fadeIn().focus();
		}
		$('.retryBox').attr("tabindex", 0).focus();
	});
	$('.retryBoxClose').click(function(e){
		e.preventDefault();
		$('.retryBox').attr("tabindex",'').fadeOut();
		$('.facetChk.focus').focus();
		$('.facetChk.focus').removeClass('focus')
	});


	$('.listMoreView').on('click',function(){
		if($(this).parent().siblings().hasClass('on')){
			$(this).parent().siblings().removeClass('on');
			$(this).removeClass('on');
			$(this).text('더보기');
			$(this).attr('title', '더보기');
		}else{
			$(this).parent().siblings().addClass('on');
			$(this).addClass('on');
			$(this).text('접기');
			$(this).attr('title', '접기');
		}
		return false;
	});

	// 패싯 펼치기
	$('.facetBtn').on('click',function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth > 1024){
			if($(this).hasClass('pc')){
				$('.briefContent .result').removeClass('pc');
				$('.facetContent').removeClass('pc');
				$(this).removeClass('pc');
			}else{
				$('.briefContent .result').addClass('pc');
				$('.facetContent').addClass('pc');
				$(this).addClass('pc');
			}
		}else{
			if($('.facetContent').hasClass('on')){
				$('.facetContent').removeClass('on');
			}else{
				$('.facetContent').addClass('on');
			}
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

	//패싯 검색
	$('.facetSearch').keyup(function(event) {
        var val = $(this).val();
        if (val == "") {
            $(this).parents('form').find('li').show();
        } else {
			$(this).parents('form').find('li').hide();
			$(this).parents('form').find("li:contains('"+val+"')").show();
        }
    });
	
	$(window).on('resize',function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
	});


	// eds 검색 상단 펼치기 닫기
	$('.edsTop .edsToggle').click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on').text('닫기');
			$(this).attr('title', '닫기');
			$('.edsContent').slideDown();
		}else{
			$(this).addClass('on').text('펼치기');
			$(this).attr('title', '펼치기');
			$('.edsContent').slideUp();
		}
		return false;
	});

	// eds 펼치기
	$('.bookInfoList.edsInfo li.writerHidden .moreView').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).text('펼쳐보기');
		}else{
			$(this).parent().addClass('on');
			$(this).text('접어보기');
		}
		return false;
	});

	$('.writerHidden').each(function(){
		if($(this).children().children('a').length > 0){
			$(this).css('display','block');
		}else{
			$(this).css('display','none');
		}
	});

	//인터넷검색
	$('.inBookList .titArea .InterToggle').click(function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth < 768){
			if($(this).hasClass('on')){
				$(this).removeClass('on');
				$(this).parent().next().slideUp();
			}else{
				$('.inBookList .titArea .InterToggle').removeClass('on');
				$('.inBookList .resultList').slideUp();
				$(this).addClass('on');
				$(this).parent().next().slideDown();
			}
		}
		return false;

	});

	//askLib 
	if($('.askLib').length){
		$('#divContent').addClass('ask')
	}

});