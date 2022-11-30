var webchat;
var chatThemeColor = "#fe8515";
var descriptionUrl = "https://www.riss.kr/main/images/chatbot_riss.png";
var backGround = "rgb(254, 133, 21)";

if($(location).attr("protocol") == "http") {
    descriptionUrl = "http://www.riss.kr/main/images/chatbot_riss.png";
}

if(sessionStorage.getItem('fsearchYn') == 'Y'){
	chatThemeColor = "#3e58b2";
	descriptionUrl = "https://www.riss.kr/main/images/chatbot.jpg";
	if($(location).attr("protocol") == "http") {
        descriptionUrl = "http://www.riss.kr/main/images/chatbot.jpg";
    }
	backGround = "rgb(62, 88, 178)";
} else {
	chatThemeColor = "#fe8515";
	descriptionUrl = "https://www.riss.kr/main/images/chatbot_riss.png";
	if($(location).attr("protocol") == "http") {
        descriptionUrl = "http://www.riss.kr/main/images/chatbot_riss.png";
    }
	backGround = "rgb(254, 133, 21)";
}
var wcTimeout = 900;
var wcUa = navigator.userAgent.toLowerCase();
if ( (navigator.appName == 'Netscape' && wcUa.indexOf('trident') != -1) || (wcUa.indexOf("msie") != -1)) {
	wcTimeout = 1200;
}

$(document).ready(function() {
	
	//
	$('<div id="chatbotLayer" class="chatbotIcon" style="cursor:pointer;position:fixed;bottom: 112px;right: 26px;z-index: 10;width: 60px;height: 60px;border-radius: 50%;background: ' + backGround + ';color: white;"><img id="chatbotImage" alt="toggle chat" class="icon" src="/images/commons/bot-normal.png" style="width: 50%; height: 50%; transform: translate(45%, 45%);"></div>').appendTo('#divWrapper');
	$('#chatbotLayer').on("click", function(){
		//해외전자자료 세션값 설정
		callChatbot();
		return false;
	});
	
});

function callChatbot() {
	$("#chatbotImage").off("click");
	
	(function (c, l, o, s, e, r) {
		c[e] = c[e] || {}; r = l.createElement('script'); s && (o += '?botId=' + s + '&enableHtmlDescription'); e && (r.setAttribute('data-bind', e)); r.src = o; r.async = 1; l.head.appendChild(r);
	})(window, document, 'https://app.closer.ai/webchat.js', 'Bdwwvk', function(init){
		if(sessionStorage.getItem('fsearchYn') == 'Y'){
			chatThemeColor = "#3e58b2";
			descriptionUrl = "https://www.riss.kr/main/images/chatbot.jpg";
			if($(location).attr("protocol") == "http") {
                descriptionUrl = "http://www.riss.kr/main/images/chatbot.jpg";
            }
		} else {
			chatThemeColor = "#fe8515";
			descriptionUrl = "https://www.riss.kr/main/images/chatbot_riss.png";
			if($(location).attr("protocol") == "http") {
                descriptionUrl = "http://www.riss.kr/main/images/chatbot_riss.png";
            }
		}
		
		init({ 
			anonymous: true,
			// 기본 theme를 변경합니다.
			theme: { 
				primaryColor: chatThemeColor,//'#fe8515',
				position:'right', 
				pageMargin: [26,112], // 좌우 margin, 상하 margin
				zIndex: 10000, // zIndex가 기존 UI와 겹칠 경우 이용하세요.
				enableExport:false,
				showCloseButton:true,
				description: 'RISS 챗봇 서비스입니다. 대화 시작하기 버튼을 클릭해 주세요.<br/><img src="' + descriptionUrl + '" width="315" height="250"/>'
			}
		}).then(function(webchatInstance){
			setTimeout(function(){
				webchatInstance.startConversation();
				webchatInstance.changeView('welcome');
				webchatInstance.setOpen(true);
				$("#chatbotLayer").css("display","none");
				webchat = webchatInstance;
			}, wcTimeout);
		});
	});
}