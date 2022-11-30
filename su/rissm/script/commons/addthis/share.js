
var addthis_localize = {
    favorites: '즐겨찾기'
};

var addthis_config = {
    ui_language: 'ko',
    services_compact: 'kakao,delicious,evernote,wordpress,more',
    services_exclude: 'email,print'
};

var addthis_share_cnt = 0;

$(document).ready(function() {
    var urlProtocol = $(location).attr("protocol");
    if(urlProtocol == "http") {
        document.write('<script type="text/javascript" src="http://s7.addthis.com/js/300/addthis_widget.js#pubid=keris"><\/script>');        
    } else {
        document.write('<script type="text/javascript" src="https://s7.addthis.com/js/300/addthis_widget.js#pubid=keris"><\/script>');
    }
    //공유하기
    $('.infoDetail .btnBunch>ul>li>a.share').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            $(this).next('.btnShareList').slideUp();
        } else {
            $(this).addClass('on');
            $(this).next('.btnShareList').slideDown();
        }

        $(".btnShareList").find("ul li a").each(function() {
            $(this).find("span").remove();
            $(this).css("padding-left", "");
        });
    });
});

function fncShareClickIn(the_url, the_title, click_name, click_url, mat_type, control_no) {
    document.write('<li><a class="button_kakao" href="#redirect" id="kakao-link-btn">카카오톡</a></li>');
    document.write('<li><a class="addthis_button_facebook at300b" title="Facebook" href="#redirect" style="padding-left:0px;">페이스북<\/a><\/li>');
    document.write('<li><a class="addthis_button_twitter at300b" title="Twitter" href="#redirect" style="padding-left:0px;">트위터<\/a><\/li>');
    document.write('<li><a class="addthis_button_compact at300b" href="#redirect" style="padding-left:0px;">더보기<\/a><\/li>');
    try {
        if(click_name != undefined) {
            if (addthis_share_cnt == 0) {
                // 공유하기에서 공유되었을때 통계를 남김
                document.write('<script type="text/javascript">');
                document.write('function shareEventHandler(evt) {');
                document.write('if (evt.type == "addthis.menu.share") {');
                document.write('try{');
                document.write('clickInsert("' + XSS_Check(click_name.replace(/\>/g, "_")) + '","' + XSS_Check(click_url.replace(/\>/g, "_")) + '","' + XSS_Check(mat_type) + '","' + XSS_Check(control_no) + '");');
                document.write('}catch(ex){}');
                document.write('}');
                document.write('}');
                document.write('addthis.addEventListener("addthis.menu.share", shareEventHandler);');
                document.write('<\/script>');
                addthis_share_cnt++;
            }            
        }
    } catch (ex) { }
}

/*
* strTemp  : [필수] 크로스사이트 스크립팅을 검사할 문자열
* level    : [옵션] 검사레벨
*            0 (기본) -> XSS취약한 문자 제거
*            1 (선택) -> 단순한 <, > 치환
*/
function XSS_Check(strTemp, level) {
    if (level == undefined || level == 0) {
        strTemp = strTemp.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, "");
    } else if (level != undefined && level == 1) {
        strTemp = strTemp.replace(/\</g, "&lt;");
        strTemp = strTemp.replace(/\>/g, "&gt;");
    }
    return strTemp;
}
