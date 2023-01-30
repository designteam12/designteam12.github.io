var ui = {
	checkLabel : function() {
		$(document).on('click', '.customChk, .customRadio', function (e) {
			$inp = $(this);
			if($inp.next().is("label")) {
				var name = $inp.attr("name");
				//only for radio
				if($inp.attr("type") == "radio") {
                    $(".customRadio[name=" + name + "]").each(function() {
                    	$(this).next().removeClass('on');
                    });
				}
				//both checkbox and radio
				if(name) {
                    $("input[name=" + name + "]").each(function(index) {
                    	if($(this).is(":checked")) {
                    		$(this).next().addClass('on');
                    	} else {
                    		$(this).next().removeClass('on');
                    	}
                    });
				} else {
					//if name is not specified
                	if($inp.is(":checked")) {
                		$inp.next().addClass('on');
                	} else {
                		$inp.next().removeClass('on');
                	}
				}
                //check/uncheck all checkboxes
				var $wrap = $inp.parent();
				if($wrap.hasClass("otherCheck")) {
					$wrap = $wrap.parent();
				}
				// if($wrap.find(".customChk[name=allCheck]").size() == 1) {
				// 	if(name == "allCheck") {
				// 		if($inp.is(":checked")) {
				// 			$wrap.find("input[name!=allCheck]:checkbox").each(function() {
				// 				$(this).prop("checked", true);
				// 				$(this).next().addClass("on");
				// 			});
				// 		} else {
				// 			$wrap.find(".customChk").each(function() {
				// 				$(this).prop("checked", false);
				// 				$(this).next().removeClass("on");
				// 			});
				// 		}
				// 	} else {
				// 		var cnt1 = $wrap.find("input[name!=allCheck]").size();
				// 		var cnt2 = $wrap.find("input[name!=allCheck]:checked").size();
				// 		if(cnt1 == cnt2) {
				// 			$wrap.find("input[name=allCheck]").prop("checked", true);
				// 			$wrap.find("input[name=allCheck]").next().addClass("on");
				// 		} else {
				// 			$wrap.find("input[name=allCheck]").prop("checked", false);
				// 			$wrap.find("input[name=allCheck]").next().removeClass("on");
				// 		}
				// 	}
				// }
			}
		});

		$(document).on('change', '.customRadio', function (e) {
			var $this = $(this);
            if( $this.prop('checked') ){
            	$thisId = $this.attr('id');
            	$thisGroup = $this.attr('name');
            	$("input[name="+$thisGroup+"]").siblings('label').removeClass('on');
            	$this.siblings('label').each(function(){
					if($(this).attr('for') == $thisId){
						$(this).addClass('on');
					}
				});
            } else {
                $this.next('label').removeClass('on');
            }
        }).change();
		if($('.customChk, input[type=radio]').length){
    		$('.customChk, input[type=radio]').each(function(){
    			if($(this).attr('checked') == 'checked'){
    				var selObjName = $(this).attr('id');
    				$('label').each(function(){
    					if($(this).attr('for') == selObjName){
    						$(this).addClass('on');
    					}
    				});
    			}
    		});
    	}

	}
}


$(document).ready(function(){
	ui.checkLabel();
	//사이즈 변수 선언(공통 사용)
	var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언


	//내부 스크롤감지
	$.fn.hasScrollBar = function() {
		return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
	};
	
	//btnBunchType1 자식요소 하나일때
	if($('.btnBunchType1>span').length == 1){
		$('.btnBunchType1').addClass('one')
	}


	// layer PopUp
	var _focus;

	// 바구니 담기 레이어 팝업
	$('.addBasket').on('click',function(){
		$('.addBasketLayer').addClass('on');
		$('.blackBg').addClass('mo');
		$(this).addClass('this');
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth < 768){
			var ph = $('.addBasketLayer .popTitArea').outerHeight();
			$('.addBasketLayer .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
		}
	});
	$('.addBasketLayer .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.addBasket.this').focus();
		$('.addBasket').removeClass('this');
		$('.addBasketLayer').removeClass('long');
		return false;
	});
	// 바구니 담기 레이어 팝업

	// 내서재 담기 레이어 팝업
	$('.insertMyList').on('click',function(){
		$('.insertMyListLayer').addClass('on');
		$('.blackBg').addClass('mo');
		$(this).addClass('this');
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth < 768){
			var ph = $('.insertMyListLayer .popTitArea').outerHeight();
			$('.insertMyListLayer .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
		}
	});
	$('.insertMyListLayer .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.insertMyList.this').focus();
		$('.insertMyList').removeClass('this');
		$('.insertMyListLayer').removeClass('long');
		return false;
	});
	// 내서재 담기 레이어 팝업

	
	// 내보내기 레이어 팝업
	$('.export').on('click',function(){
		$('.exportLayer').addClass('on');
		$('.blackBg').addClass('mo');
		$(this).addClass('this');
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth < 768){
			var ph = $('.exportLayer .popTitArea').outerHeight();
			$('.exportLayer .popupContent').css({'height':'calc(100% - ' +ph+'px)'})
		}
	});
	$('.exportLayer .layerClose').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.export.this').focus();
		$('.export').removeClass('this');
		$('.exportLayer').removeClass('long');
		return false;
	});
	// 내보내기 레이어 팝업

	// 레이어 팝업 black BackGround
	$('.blackBg').on('click',function(){
		$('.layerPopup').removeClass('on');
		$('.blackBg').removeClass('mo');
		$('.layerPopup').removeClass('long');
		return false;
	});
	// $('.blackBg2').on('click',function(){
	// 	$('.resInfoTable').removeClass('on');
	// 	$('.blackBg2').removeClass('mo');
	// 	return false;
	// });
	// 레이어 팝업 black BackGround
		
	//mobile table
	if ($('.mobileTable').length > 0) {
		$('.mobileTable').footable({
			breakpoints: {
				phone: 767
				, tablet: 1024
			}
		});
	};
	
	// datepicker 테스트
	$('.inputTextCal').datepicker();

	

});