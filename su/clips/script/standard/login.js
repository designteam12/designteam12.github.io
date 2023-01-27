$(document).ready(function(){
	//사이즈 변수 선언(공통 사용)
	var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언

	// 로그인 페이지 input클릭시 placeholder 위치 변경
	$('.joinInfo .item.enabled').on('click',function(){
		$(this).find('input').addClass('active');  
		$(this).next().addClass('active');  
		return false;
	});
	$('.joinInfo .item.enabled input').on('focus',function(){
		$(this).addClass('active');
		$(this).next().addClass('active');
		return false;
	});
	$('.joinInfo .item.enabled input').on('focusout',function(){
		if($(this).val()==''){
			$(this).removeClass('active');
			$(this).next().removeClass('active');
		}
		return false;
	});
	$('.joinInfo .item.enabled .placeholder').click(function(){
		$(this).prev().focus();
		return false;
	});
	// 로그인 페이지 input클릭시 placeholder 위치 변경

});