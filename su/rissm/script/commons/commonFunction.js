var commonFunction = 1;
var q = "";

$(document).ready(function() {
    /* 메뉴의 검색 링크 클릭 시 상세검색 레이어 팝업 호출 */
    $('.rissSrch').click(function(e) {
        e.preventDefault();
        var colName = $(this).attr("colname");
        $('.detailShTab .tab').removeClass('on')
        $("#colName_" + colName).addClass('on');
        if (indexPage == "F") {
            $(location).attr("href", "/index.do?detailSearch=R&colName=" + colName);
        } else {
            $('.blackBg1').hide();
            $('.wholeMenu').removeClass('on');
            $('.wholeMenuNav').removeClass('fix');
            $('.wholeMenuNav').addClass('on');

            $('html, body').css('overflow', 'hidden');
            $('.blackBg1').show();
            $('#divSearch').addClass('on');

            $('.detailSearch').slideDown();
            DetailSearchTop.selColl = colName;
            DetailSearchTop.makeDetailSerchForm(colName);
            $("#RissDetailSearch").find("input[name=colName]").val(colName)
        }
        return false;
    });

    $('.foreignSrch').click(function(e) {
        e.preventDefault();
        var cateName = $(this).attr("catename").replace(/ /g, '');
        $('.detailShTab .tab').removeClass('on')
        $("#cateName_" + cateName).addClass('on');
        if (indexPage == "R") {
            $(location).attr("href", "/fIndex.do?detailSearch=F&cateName=" + cateName);
        } else {
            $('.blackBg1').hide();
            $('.wholeMenu').removeClass('on');
            $('.wholeMenuNav').removeClass('fix');
            $('.wholeMenuNav').addClass('on');

            $('html, body').css('overflow', 'hidden');
            $('.blackBg1').show();
            $('#divSearch').addClass('on');

            $('.detailSearch').slideDown();
            fDetailSearchTop.selCate = cateName;
            fDetailSearchTop.makeDetailSerchForm(cateName);
            $("#fDetailSearch").find("input[name=cate]").val(cateName);
        }
        return false;
    });

    var detailShTab = "";
    $('.detailShTab .toggleBtn').click(function(e) {
        e.preventDefault();
        var selColName = "";
        var selCateName = "";
        detailShTab = new Swiper('.detailShTab .inner', {
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true,
        });
        if (indexPage == "R") {
            selColName = $(".detailShTab .tab.on").attr("colname");
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $('.detailShTab').removeClass('all');
                $("#colName_" + selColName).addClass('on');
            } else {
                $(this).addClass('on');
                $('.detailShTab').addClass('all')
                detailShTab.destroy();
                $("#colName_" + selColName).addClass('on');
            }
        } else {
            selCateName = $(".detailShTab .tab.on").attr("catename");
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
                $('.detailShTab').removeClass('all');
                detailShTab = new Swiper('.detailShTab .inner', {
                    slidesPerView: 'auto',
                    spaceBetween: 0,
                    freeMode: true,
                });
                $("#cateName_" + selCateName).addClass('on');
            } else {
                $(this).addClass('on');
                $('.detailShTab').addClass('all')
                detailShTab.destroy();
                $("#cateName_" + selCateName).addClass('on');
            }
        }


    });
});

(function() {
    var matched, browser;

    // Use of jQuery.browser is frowned upon.
    // More details: http://api.jquery.com/jQuery.browser
    // jQuery.uaMatch maintained for back-compat
    jQuery.uaMatch = function(ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec(ua) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
            /(msie) ([\w.]+)/.exec(ua) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
            [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };

    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }

    jQuery.browser = browser;
})();
/* trim */
function trim(s) {
    return s.replace(/^\s*/, "").replace(/\s*$/, "");
}
/* Cookie setting */
function getCookie(name) {
    var nameOfCookie = name + "=";
    var x = 0;
    while (x <= document.cookie.length) {
        var y = (x + nameOfCookie.length);
        if (document.cookie.substring(x, y) == nameOfCookie) {
            if ((endOfCookie = document.cookie.indexOf(";", y)) == -1)
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie));
        }
        x = document.cookie.indexOf(" ", x) + 1;
        if (x == 0)
            break;
    }
    return "";
}

function setCookie(name, value, expiredays) {
    var todayDate = new Date();
    if (typeof expiredays != 'undefined')
        todayDate.setDate(todayDate.getDate() + expiredays);
    else
        todayDate.setDate(todayDate.getDate() + 999999);
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

/* count checked checkbox */
function countCheck(check_box) {
    var count = 0;
    if (check_box) {
        if (check_box.length) {
            for (var i = 0; i < check_box.length; i++) {
                if (check_box[i].checked) count++;
            }
        }
        else if (check_box.checked) count = 1;
    }
    return count;
}
/* file ext check */
function checkFileExt(filenameObj) {
    var filename = filenameObj.value
    if (filename == "" || filename == null)
        return true;
    var nIndex, strExt, strFileName;
    strFileName = filename.toLowerCase();
    nIndex = strFileName.lastIndexOf(".");
    strExt = strFileName.substring(nIndex + 1);
    //alert(filename);
    //alert(strExt);
    switch (strExt) {
        case "js":
        case "css":
        case "jsp":
        case "asp":
        case "php":
        case "php3":
        case "cgi":
        case "inc":
        case "pl":
        case "exe":
        case "class":
            alert(strExt + " 확장자가 있는 파일은 올릴 수 없습니다.");
            filenameObj.setAttribute('value', '');
            filenameObj.value = '';
            return false;
        default:
            return true;
    }
}
//문자열길이 계산(영문, 한글 구분하여 byte로 계산됨)
function calBytes(str) {
    var tcount = 0;
    var tmpStr = new String(str);
    var temp = tmpStr.length;
    var onechar;
    for (k = 0; k < temp; k++) {
        onechar = tmpStr.charAt(k);
        if (escape(onechar).length > 4) {
            tcount += 2;
        } else {
            tcount += 1;
        }
    }
    return tcount;
}
//글자를 원하는 바이트만큼 잘라 리턴한다.
//한글의 경우 2바이트로 계산하며, 글자 중간에서 잘리지 않는다.
function cutByteString(str, len) {
    var l = 0;
    for (var i = 0; i < str.length; i++) {
        l += (str.charCodeAt(i) > 128) ? 2 : 1;
        if (l > len) return str.substring(0, i);
    }
    return str;
}
//********************************************
//입력값의 길이를 제한한다.
//길이를 초과하면 알림메세지가 뜨고
//최대길이만큼 입력값을 잘라낸다.
//********************************************
function checkInputLength(objId, Name, maxLength) {
    var inputForm = document.getElementById(objId);
    var value = inputForm.value;
    var length = calBytes(value);
    if (length > maxLength) {
        alert(Name + "은(는) " + maxLength + "bytes까지만 입력하실 수 있습니다.");
        // maxLangth 길이 만큼만 잘라서 설정
        var cutStr = cutByteString(value, maxLength);
        inputForm.value = cutStr;
        inputForm.focus();
    }
}
//화면 가운데로 윈도우를 팝업한다.
function popupWindow(openUrl, popName, width, height) {
    var winFeature = setCenterReport(width, parseInt(height, 10))
        + ",status=no,menubar=no,resizable=yes,scrollbars=yes";
    var obj = window.open(openUrl, popName, winFeature);
    obj.focus();
    return obj; // open한 main창을 object로 이동시켜 화면 오류가 발생한다.
}
//가로,세로 사이즈에 맞는 센터지점의 속성값을 반환한다.
function setCenterReport(winwidth, winheight) {
    winx = Math.ceil((screen.availWidth - winwidth) / 2);
    winy = Math.ceil((screen.availHeight - winheight) / 2);
    if (winwidth == screen.availWidth) winwidth = screen.availWidth - 10;
    if (winheight == screen.availHeight) winheight = screen.availHeight - 30;
    return "left=" + winx + ",top=" + winy + ",width=" + winwidth + ",height=" + winheight;
}
//필드에 숫자만 입력
function numCheck(t) { //숫자 체크함수
    var num = '0123456789';
    var i;
    for (i = 0; i < t.length; i++) {
        if (num.indexOf(t.substring(i, i + 1)) < 0) {
            break;
        }
    }
    if (i != t.length) {
        return true;
    }
    return "";
}
function checkNum(e, decimal) {
    var key;
    var keychar;
    if (window.event) {
        // IE에서 이벤트를 확인하기 위한 설정
        key = window.event.keyCode;
    } else if (e) {
        // FireFox에서 이벤트를 확인하기 위한 설정
        key = e.which;
    } else {
        return true;
    }
    keychar = String.fromCharCode(key);
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13)
        || (key == 27)) {
        return true;
    } else if ((("0123456789").indexOf(keychar) > -1)) {
        return true;
    } else if (decimal && (keychar == ".")) {
        return true;
    } else
        return false;
}
function checkNULL(val) {
    if (typeof val == 'undefined' || val == null)
        return '';
    else
        return val;
}
//해당 폼에 데이터를 삽입(해당 dataName의 input이 있을경우엔 value만 변경)
function makeFormData(form, dataName, dataValue) {
    try {
        if (typeof form == 'object' && checkNULL(dataValue) != '' && checkNULL(dataName) != '') {
            if (!document.getElementsByName(dataName)[0]) {
                var isMsBrower;
                if (typeof jQuery != 'undefined') {
                    if (jQuery.browser.msie && (jQuery.browser.IE6 || jQuery.browser.IE7 || jQuery.browser.IE8))
                        isMsBrower = true;
                    else
                        isMsBrower = false;
                } else if (typeof Ajax != 'undefined') {
                    if (Prototype.Browse == 'IE')
                        isMsBrower = true;
                    else
                        isMsBrower = false;
                }
                var input
                if (isMsBrower == true) {
                    input = document.createElement("<input name='" + dataName + "'>");
                } else {
                    input = document.createElement("input");
                    input.setAttribute("name", dataName);
                }
                input.setAttribute("type", "hidden");
                input.setAttribute("value", dataValue);
                form.appendChild(input);
            } else {
                document.getElementsByName(dataName)[0].value = dataValue;
            }
        }
    } catch (e) { alert(e.message) }
}
//해당 폼에 데이터를 삽입(여러개)
function makeFormDataList(form, dataName, dataValue) {
    try {
        if (typeof form == 'object' && checkNULL(dataValue) != '' && checkNULL(dataName) != '') {
            var isMsBrower;
            console.log("typeof jQuery = " + typeof jQuery)
            console.log("typeof Ajax = " + typeof Ajax)
            console.log("jQuery.browser = " + jQuery.browser)
            if (typeof jQuery != 'undefined') {
                if (jQuery.browser.msie && (jQuery.browser.IE6 || jQuery.browser.IE7 || jQuery.browser.IE8))
                    isMsBrower = true;
                else
                    isMsBrower = false;
            } else if (typeof Ajax != 'undefined') {
                if (Prototype.Browse == 'IE')
                    isMsBrower = true;
                else
                    isMsBrower = false;
            }
            var inputTag;
            console.log("isMsBrower = " + isMsBrower)
            if (isMsBrower == true) {
                inputTag = document.createElement("<input name='" + dataName + "'>");
            } else {
                inputTag = document.createElement("input");
                inputTag.setAttribute("name", dataName);
            }
            inputTag.setAttribute("type", "hidden");
            inputTag.setAttribute("value", dataValue);
            console.log("inputTag = " + inputTag)
            form.appendChild(inputTag);
        }
    } catch (e) { alert(e.message) }
}
function makeFormDataList_Loop(obj, dataName, dataValue, cnt) {
    if (typeof obj == 'object' && checkNULL(dataValue) != '' && checkNULL(dataName) != '') {
        var isMsBrower;
        if (typeof jQuery != 'undefined') {
            if (jQuery.browser.msie && (jQuery.browser.IE6 || jQuery.browser.IE7 || jQuery.browser.IE8))
                isMsBrower = true;
            else
                isMsBrower = false;
        } else if (typeof Ajax != 'undefined') {
            if (Prototype.Browse == 'IE')
                isMsBrower = true;
            else
                isMsBrower = false;
        }
        var inputTag;
        for (var i = 0; i < cnt; i++) {
            if (isMsBrower == true) {
                inputTag = document.createElement("<input name='" + dataName + "'>");
            } else {
                inputTag = document.createElement("input");
                inputTag.setAttribute("name", dataName);
            }
            inputTag.setAttribute("type", "hidden");
            inputTag.setAttribute("value", dataValue);
            obj.appendChild(inputTag);
        }
    }
}
/*
* 날짜 계산 함수.
* iYear : 연도 계산, 음수를 넣을 경우 마이너스 계산.
* iDay : 월 계산, 음수를 넣을 경우 마이너스 계산.
* iDay : 일 계산, 음수를 넣을 경우 마이너스 계산.
* seperator : 연도를 표시할 구분자
*/
function getCalculatedDate(iYear, iMonth, iDay, seperator) {
    //현재 날짜 객체를 얻어옴.
    var gdCurDate = new Date();
    //현재 날짜에 날짜 게산.
    gdCurDate.setYear(gdCurDate.getFullYear() + iYear);
    gdCurDate.setMonth(gdCurDate.getMonth() + iMonth);
    gdCurDate.setDate(gdCurDate.getDate() + iDay);
    //실제 사용할 연, 월, 일 변수 받기.
    var giYear = gdCurDate.getFullYear();
    var giMonth = gdCurDate.getMonth() + 1;
    var giDay = gdCurDate.getDate();
    //월, 일의 자릿수를 2자리로 맞춘다.
    giMonth = "0" + giMonth;
    giMonth = giMonth.substring(giMonth.length - 2, giMonth.length);
    giDay = "0" + giDay;
    giDay = giDay.substring(giDay.length - 2, giDay.length);
    //display 형태 맞추기.
    return giYear + seperator + giMonth + seperator + giDay;
}
//문자열 변경
String.prototype.replaceAll = function(_findValue, _replaceValue) {
    return this.split(_findValue).join(_replaceValue);
};
//xml 값 읽어오기
function getXmlValue(node) {
    try {
        var text = (node.text) ? node.text : node.textContent;
        return text == 'undefined' ? '' : text;
    } catch (ex) {
        return "";
    }
}
//다국어 입력기
function openLangTrans() {
    popupWindow('/commons/swf/RissLangTrans.html', '다국어입력기', 633, 415);
}
//결과내 재검색
var reSearchCheck = function(obj) {
    if (obj.checked == true) {
        this.temp = document.getElementById('query').value;
        document.getElementById('query').value = "";
    } else {
        document.getElementById('query').value = this.temp;
    }
}
//리스 개편 이벤트 게시판
function openEventBoard() {
    //popupWindow('/eventBoardWrite.do?loginFlag=1','RISS개편기념이벤트',650,729);
    popupWindow('/CommentEventMain.do?flag=1', 'RISS개편기념이벤트', 650, 729);
}
//동영상 팝업
function openVideoPopup(help_id, upper_id) {
    popupWindow('/customer/svchelp/VideoPop.do?help_id=' + help_id + '&upper_id=' + upper_id, '동영상도움말', 900, 733);
}
var layerAlert = function(msg) {
    var url = "/commons/Alert.html"
    if (typeof jQuery != 'undefined') {
        jQuery.ajax({
            url: url,
            dataType: "html",
            success: function(result) {
                ModalPopup.open(result, false, { backGround: '#000' });
                jQuery("#alertContent").html(msg);
            },
            error: function(content, result) { alert('일시적인 오류 발생'); }
        });
    } else if (typeof Ajax != 'undefined') {
        new Ajax.Request(url, {
            onSuccess: function(result) {
                ModalPopup.open(result.responseText, false, { backGround: '#000' });
                $("alertContent").update(msg);
            },
            onFailure: function(result) { alert('일시적인 오류 발생'); }
        });
    }
}
/////////////////////////stopword /////////////////////////////////////
function CharacterCheck(t) {
    var buff;
    var str1 = "";
    // 2019.05.09 - 대등서명 검색을 위해 : 문자 제거
    //var str2 = "?*,";
    var str2 = "?*,:";
    for (var i = 0; i < t.length; i++) {
        buff = t.substring(i, i + 1);
        if (str2.indexOf(buff) >= 0) {
            str1 += buff.replace(buff, ' ');
        }
        else {
            str1 += buff;
        }
    }
    return str1;
}
function CharacterCheck2(t) {
    var str = "";
    var str_arr = t.split(/\s+/);
    for (var i = 0; i < str_arr.length; i++) {
        if (CheckValue(trim(str_arr[i]))) {
            str += str_arr[i] + " ";
        } else {
            str += " ";
        }
    }
    return trim(str);
}
function CheckValue(t) {
    var str = "a,an,as,and,at,b,by,c,d,e,f,for,from,g,h,i,in,is,it,its,j,k,l,m,n,o,of,on,or,p,q,r,s,t,the,to,u,v,w,with,x,y,z";
    var str_arr = str.split(/,/);
    for (var i = 0; i < str_arr.length; i++) {
        if (t.toLowerCase() == str_arr[i]) {
            return false;
        }
    }
    return true;
}
////////////////////////////////////////////////////////////////////
function browserResize(width, height) {//IE8기준
    var defaultWidth = width;
    var defaultHeight = height;
    try {
        if (jQuery) {
            if (jQuery.browser.msie) {
                if (jQuery.browser.IE6)
                    self.resizeTo(defaultWidth, defaultHeight - 12);
                else
                    self.resizeTo(defaultWidth, defaultHeight);
            } else if (jQuery.browser.chrome) {
                self.resizeTo(defaultWidth, defaultHeight + 12);
            } else if (jQuery.browser.safari) {
                self.resizeTo(defaultWidth, defaultHeight - 46);
            } else if (jQuery.browser.mozilla) {
                self.resizeTo(defaultWidth, defaultHeight + 8);
            } else if (jQuery.browser.opera) {
                self.resizeTo(defaultWidth, defaultHeight + 8);//IE8
            } else {
                self.resizeTo(defaultWidth, defaultHeight);
            }
        }
    } catch (e) { }
}
function SearchFocusControl(e) {
    var key = e.keyCode;
    var obj = e.target;
    if (obj == 'undefined')
        obj = e.srcElement;
    var type = obj.getAttribute("type");
    if ((!(key >= 91 && key <= 93) &&
        !(key >= 8 && key <= 27) &&
        !(key >= 32 && key <= 45) &&
        !(key >= 91 && key <= 93) &&
        !(key >= 112 && key <= 123) &&
        !(key >= 144 && key <= 145)
    )
        && type != 'text') {//스페이스일경우 제외
        try {
            var detail = document.getElementById('detail');
            if (detail == null) detail = document.getElementById('topLayer1');
            if (detail.style.display == 'none') {
                var query = document.getElementById('basicQuery');
                if (query == null) query = document.getElementById('query');
                if (query.hasFocus != 'basic')
                    query.select();
                query.focus();
            } else {
                var keyword = document.getElementById('keyword1');
                if (keyword.hasFocus != 'detail')
                    keyword.select();
                keyword.focus();
            }
        } catch (e) { alert(e.message) }
    }
}
function goSelectById(selectId) {
    var url = document.getElementById("" + selectId + "").options[document.getElementById("" + selectId + "").selectedIndex].value;
    document.location.href = url;
}

function dataValidation(control_no, p_mat_type) {
    var result = "";
    var pars = "";
    if (typeof $(control_no).length == 'undefined' && typeof $(control_no).length == 'undefined') {
        pars = "control_no=" + $(control_no).val() + "&p_mat_type=" + $(p_mat_type).val();
    } else {
        $(control_no).each(function(i) {
            if (i == 0)
                pars += "control_no=" + $(this).val() + "&";
            else
                pars += "control_no=" + $(this).val() + "&";
        });

        $(p_mat_type).each(function(i) {
            if (i == 0)
                pars += "p_mat_type=" + $(this).val() + (($(p_mat_type).length - 1) == i ? "" : "&");
            else
                pars += "p_mat_type=" + $(this).val() + (($(p_mat_type).length - 1) == i ? "" : "&");
        });
    }
    jQuery.ajax({
        url: "/search/DataValidationAjax.do",
        dataType: "text",
        async: false,
        data: pars,
        type: 'post',
        success: function(text) {
            result = text;
        },
        error: function(result) {
            result = 1;
            alert("조회시 일시적인 문제가 발생하였습니다.\n다시 시도해 주세요.");
        }
    });
    return result;
}


//숫자 체크
function numChecks(f) {
    var val = f.value;
    var flag = false;
    for (i = 0; i < val.length; i++) {
        if (val.charAt(i) < '0' || val.charAt(i) > '9') {
            flag = true;
            break;
        }
    }

    if (i != val.length) {
        alert("숫자만 입력하세요. \nPlease enter only numbers.");
        f.value = "";
    }

    return flag;
}


//이메일 선택
function selectEmail(ele) {
    var $ele = $(ele); var $email2 = $('input[name=email_supply]'); // '1'인 경우 직접입력 

    if ($ele.val() == "keyin") {
        $email2.attr('readonly', false);
        $email2.val('');
    } else {
        $email2.attr('readonly', true); $email2.val($ele.val());
    }
}

function startProgress(obj) {
    var vHtml = [];
    vHtml.push('<div class="ispinner ispinner-large">');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('<div class="ispinner-blade"></div>');
    vHtml.push('</div>');

    $(obj).append(vHtml.join(''));
    $(".ispinner.ispinner-large").show();
}

function endProgress(obj) {
    if (obj) {
        $(obj).children(".ispinner.ispinner-large").hide();
        $(obj).children(".ispinner.ispinner-large").remove();
    } else {
        $(".ispinner.ispinner-large").hide();
        $(".ispinner.ispinner-large").remove();
    }

}

function clickInsert(click_name, click_url, mat_type, control_no) {
    try {
        jQuery.ajax(
            {
                url: "/search/ajax/detail/ClickInsertAjax.do",
                type: "post",
                data: {
                    click_name: click_name,
                    click_url: click_url,
                    mat_type: mat_type,
                    control_no: control_no
                },
                dataType: "text",
                success: function(result) {
                },
                error: function(content, result) {
                }
            }
        );
    } catch (ex) {
    }
}

function clickInsert(click_name, click_url, mat_type, control_no, id) {
    try {
        var query = $("#abs" + id).text();
        jQuery.ajax(
            {
                url: "/search/ajax/detail/ClickInsertAjax.do",
                type: "post",
                data: {
                    click_name: click_name,
                    click_url: click_url,
                    mat_type: mat_type,
                    control_no: control_no,
                    con_size: query.substr(0, 5000).length
                },
                dataType: "text",
                success: function(result) {
                },
                error: function(content, result) {
                }
            }
        );
    } catch (ex) {
    }
}
