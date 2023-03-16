//<!--
var exportContent = {
	select : function() {
		var formatIdx  = this.getCheckedIndex(document.f.format);
		var contentIdx = this.getCheckedIndex(document.f.riss_gubun);

		if (contentIdx == -1) { // 간략,상세,참고 중 아무것도 체크되어 있지 않으면
			if (formatIdx == 4 || formatIdx == 5) {
				if (formatIdx == 4) {
					document.getElementById("templateTitle2").style.display = "none";
					//document.getElementById("templateSubImage1").style.display = "none";
					//document.getElementById("templateSubTitle1").style.display = "none";
					
					document.getElementById("templateTitle1").style.display = "block";
					//document.getElementById("templateSubImage2").style.display = "block";
				} else {
					document.getElementById("templateTitle1").style.display = "none";
					//document.getElementById("templateSubImage2").style.display = "none";
					//document.getElementById("templateSubTitle1").style.display = "none";
					
					document.getElementById("templateTitle2").style.display = "block";
					//document.getElementById("templateSubImage1").style.display = "block";
				}
			} else {
				document.getElementById("templateTitle1").style.display = "none";
				document.getElementById("templateTitle2").style.display = "none";
				//document.getElementById("templateSubImage2").style.display = "none";
				//document.getElementById("templateSubTitle1").style.display = "none";
				
				//document.getElementById("templateSubImage1").style.display = "block";
			}
		} else {
			document.getElementById("export_item").style.display = "none";
			document.getElementById("templateTitle1").style.display = "none";
			document.getElementById("templateTitle2").style.display = "none";
			//document.getElementById("templateSubImage2").style.display = "none";
			//document.getElementById("templateSubTitle1").style.display = "none";
			document.getElementById("excel_gubun").style.display = "none";
			document.getElementById("riss_gubun").style.display = "block";
			//document.getElementById("templateSubImage1").style.display = "block";

			if (contentIdx == 0) {
				seq = "01";
				titleContent = "간략정보";
			} else if (contentIdx == 1) {
				seq = "02";
				titleContent = "상세정보";
				document.getElementById("excel_gubun").style.display = "block";
			} else if (contentIdx == 2 || contentIdx == 3 || contentIdx == 4) {
				seq = "03";
				titleContent = "참고문헌정보";
			}
		}

		if (formatIdx == 4) {
			document.f.riss_gubun[0].disabled = true;
			document.f.riss_gubun[1].disabled = true;
			document.f.riss_gubun[2].disabled = true;
			
			document.getElementById("excel_gubun").style.display = "none";
			document.getElementById("riss_gubun").style.display = "none";
			document.getElementById("mailFrm").style.display = "none";
			document.getElementById("templateTitle2").style.display = "none";
			//document.getElementById("templateSubImage1").style.display = "none";
			//document.getElementById("templateSubTitle1").style.display = "none";
			
			document.getElementById("export_item").style.display = "block";
			document.getElementById("templateTitle1").style.display = "block";
			//document.getElementById("templateSubImage2").style.display = "block";
			
			format = "EndNote";
			titleFormat = "EndNote 및 Mendeley 이용화면 예시";
			seq = "04";
			titleContent = "";
		} else if (formatIdx == 5) {
			document.f.riss_gubun[0].disabled = true;
			document.f.riss_gubun[1].disabled = true;
			document.f.riss_gubun[2].disabled = true;
			document.getElementById("excel_gubun").style.display = "none";
			document.getElementById("riss_gubun").style.display = "none";
			document.getElementById("mailFrm").style.display = "none";
			document.getElementById("templateTitle1").style.display = "none";
			//document.getElementById("templateSubImage2").style.display = "none";
			//document.getElementById("templateSubTitle1").style.display = "none";
			
			document.getElementById("export_item").style.display = "block";
			document.getElementById("templateTitle2").style.display = "block";
			//document.getElementById("templateSubImage1").style.display = "block";
			
			format = "refWorks";
			titleFormat = "RefWorks 이용화면 예시";
			seq = "00";
			titleContent = "";
		} else {
			document.f.riss_gubun[0].disabled = false;
			document.f.riss_gubun[1].disabled = false;
			document.f.riss_gubun[2].disabled = false;
			document.getElementById("excel_gubun").style.display = "none";
			document.getElementById("mailFrm").style.display = "none";
			document.getElementById("export_item").style.display = "none";
			document.getElementById("templateTitle1").style.display = "none";
			document.getElementById("templateTitle2").style.display = "none";
			//document.getElementById("templateSubImage2").style.display = "none";
			//document.getElementById("templateSubTitle1").style.display = "none";
			
			if (formatIdx == 0) {
				format = "mail";
				titleFormat = "메일전송 예시";
				document.getElementById("mailFrm").style.display = "block";
			} else if (formatIdx == 1) {
				format = "print";
				titleFormat = "인쇄 예시";
			} else if (formatIdx == 2) {
				format = "excel";
				titleFormat = "엑셀저장 예시(세로)";
				if (seq == '02') {
					//document.getElementById("templateSubTitle1").style.display = "block";
					document.getElementById("excel_gubun").style.display = "block";
				}
			} else if (formatIdx == 3) {
				format = "text";
				titleFormat = "Text저장 예시";
			}

			//document.getElementById("templateSubImage1").style.display = "block";
		}

		// 예시 1의 제목, 이미지
		document.getElementById("templateTitle3").innerHTML = titleContent + " " + titleFormat;
		
		var imgInfo = document.getElementById("templateSubImage1_1");
		if (seq == '03') { //참고문헌 양식별 샘플 이미지 변경
			//contentIdx 2=MLA, APA=3, 4=Chicago
			imgInfo.setAttribute("src", "/search/images/popup_export_" + seq + "_" + format+ "_" + contentIdx + ".png");
		}else{
			imgInfo.setAttribute("src", "/search/images/popup_export_" + seq + "_" + format + ".gif");
		}
		
		
		if (formatIdx == 5) imgInfo.setAttribute("alt", format + "예시 ");
		else if (formatIdx != 4) imgInfo.setAttribute("alt", titleContent + " " + titleFormat);
	},
	getCheckedIndex : function(obj) {
		for (var i = 0; i < obj.length; i++) {
			if (obj[i].checked == true)
				return i;
		}
		return -1;
	},
	open : function(c_no) {// 내보내기 팝업 오픈
		var p_mat_type = document.f.p_mat_type.value;
		var url = "/Export.do?control_no=" + c_no + "&p_mat_type=" + p_mat_type
				+ "&loginFlag=1";
		popupWindow(url, "_export", 740, 895);
	}
}

function f_submit() {
	if (exportContent.getCheckedIndex(document.f.riss_gubun) == -1) {
		var formatIdx = exportContent.getCheckedIndex(document.f.format);
		if (formatIdx != 4 && formatIdx != 5) {
			alert("서지정보 형식을 선택하세요");
			return;
		}
	}
	if (document.f.format[0].checked) {
		if (MailCheck(document.f) == true) {
			document.f.submit();
		}
	} else if (document.f.format[1].checked) {
		down_print();
	} else if (document.f.format[2].checked) {
		down_excel();
	} else if (document.f.format[3].checked) {
		down_text();
	} else if (document.f.format[4].checked) {
		// document.f.db.value = "endnote";
		document.f.target = "self";
		document.f.submit();
	} else if (document.f.format[5].checked) {
		var winRef = window.open('', 'winRef',
				'toolbar=1,menubar=1,resizable=1');
		// document.f.db.value = "refworks";
		document.f.target = "winRef";
		document.f.submit();
	}
}

function MailCheck(f) { // 메일 체크함수
	var mailto = f.mailto.value;
	// var p_mailfrom = f.p_mailfrom.value;
	var subject = f.subject.value;

	var riss_gubun = "";
	if (f.riss_gubun[0].checked)
		riss_gubun = f.riss_gubun[0].value;
	else if (f.riss_gubun[1].checked)
		riss_gubun = f.riss_gubun[1].value;
	else if (f.riss_gubun[2].checked)
		riss_gubun = f.riss_gubun[2].value;

	if (mailto.replace(/(^\s*)|(\s*$)/g, "") == "") {
		alert("받는사람 메일주소를 입력해 주세요.");
		f.mailto.focus();
		return false;
	} else if (mailto.search(/(\S+)@(\S+)\.(\S+)/) == -1) {
		alert("메일주소 형식은 '아이디@riss.kr'과 같이 구성되어야 합니다.");
		f.mailto.focus();
		return false;
	} else if (StringCheck(mailto)) {
		alert("메일주소에 '\", \\' 문자는 쓸수 없습니다.");
		f.mailto.focus();
		return false;
	} else if (subject.replace(/(^\s*)|(\s*$)/g, "") == "") {
		alert("메일 제목을 입력해 주세요.");
		f.subject.focus();
		return false;
	} else {
		return true;
	}
}
function StringCheck(t) { // 특수문자 체크함수
	var str = "\"\\";
	var i;
	for (i = 0; i < t.length; i++) {
		if (str.indexOf(t.substring(i, i + 1)) >= 0) {
			break;
		}
	}

	if (i != t.length) {
		return true;
	} else
		return false;
}

function down_email() { // 메일
	var fm = document.f;
	fm.target = "self";

	if (fm.riss_gubun[0].checked == false && fm.riss_gubun[1].checked == false
			&& fm.riss_gubun[2].checked == false
			&& fm.riss_gubun[3].checked == false
			&& fm.riss_gubun[4].checked == false) {
		alert("간략정보,상세정보,참고문헌양식 중 하나를 반드시 선택하셔야 합니다.");
		fm.riss_gubun[0].focus();
	} else {
		// fm.action = "re_cabinet_mail.jsp";
		fm.submit();
	}
}

function down_print() { // 인쇄
	var fm = document.f;

	if (fm.riss_gubun[0].checked == false && fm.riss_gubun[1].checked == false
			&& fm.riss_gubun[2].checked == false
			&& fm.riss_gubun[3].checked == false
			&& fm.riss_gubun[4].checked == false) {
		alert("간략정보,상세정보,참고문헌양식 중 하나를 반드시 선택하셔야 합니다.");
		fm.riss_gubun[0].focus();
	} else {
		// 620*729
		var winPrint = window
				.open('', 'winPrint',
						'toolbar=0,menubar=0,resizable=1,width=979,height=620,scrollbars=1');
		fm.target = "winPrint";
		fm.submit();
	}
}

function down_excel() { // 엑셀
	var fm = document.f;
	fm.target = "self";

	if (fm.riss_gubun[0].checked == false && fm.riss_gubun[1].checked == false
			&& fm.riss_gubun[2].checked == false
			&& fm.riss_gubun[3].checked == false
			&& fm.riss_gubun[4].checked == false) {
		alert("간략정보,상세정보,참고문헌양식 중 하나를 반드시 선택하셔야 합니다.");
		fm.riss_gubun[0].focus();
	} else {
		fm.submit();
	}
}

function down_text() { // 텍스트
	var fm = document.f;
	fm.target = "self";

	if (fm.riss_gubun[0].checked == false && fm.riss_gubun[1].checked == false
			&& fm.riss_gubun[2].checked == false
			&& fm.riss_gubun[3].checked == false
			&& fm.riss_gubun[4].checked == false) {
		alert("간략정보,상세정보,참고문헌양식 중 하나를 반드시 선택하셔야 합니다.");
		fm.riss_gubun[0].focus();
	} else {
		fm.submit();
	}
}
// 내보내기 목록에서 사용하는 자바스크립트
var exportData = function(type) {
	var f = document.createElement("form");
	if (countCheck(document.getElementsByName("control_no")) < 1) {
		alert('논문을 선택해 주세요.');
		return;
	}
	// try{
	var pars = "?";
	var p_mat_type_old = f.p_mat_type;
	if (p_mat_type_old) {
		for (var i = 0; i < p_mat_type_old.length; i++) {
			f.removeChild(p_mat_type_old[i]);
		}
	}

	var controlList = document.getElementsByName("control_no");
	if (typeof type == 'undefined' || type == '') {
		for (var i = 0; i < controlList.length; i++) {
			if (controlList[i].checked == true) {
				var value = controlList[i].value;
				var p_mat_type = value.split("_")[1];
				makeFormDataList(f, "control_no", value.split("_")[0]);
				makeFormDataList(f, "p_mat_type", p_mat_type);
			}
		}
	} else {
		for (var i = 0; i < controlList.length; i++) {
			if (controlList[i].checked == true) {
				var value = controlList[i].value;
				makeFormDataList(f, "control_no", value);
				makeFormDataList(f, "p_mat_type", type);
			}
		}
	}
	makeFormDataList(f, "loginFlag", 1);
	document.body.appendChild(f);

	var validations = dataValidation(f.control_no, f.p_mat_type);
	if (trim(validations) == '') {
		popupWindow("", "_export", 620, 707);
		f.action = "/Export.do";
		f.target = "_export";
		f.method = "post";
		f.submit();
	} else {
		var msg = "아래의 항목은 삭제된 서지로 내보내기가 되지 않습니다.<br />";
		var c_nos = validations.split(",");
		for (var i = 0; i < c_nos.length; i++) {
			var text = document.getElementById("T" + trim(c_nos[i])).innerHTML;
			msg += "<div class='ellipsis' style='width:400px'>" + text
					+ "</div>";
		}
		layerAlert(msg);
		if (confirm('내보내기를 실행하시겠습니까?')) {

			var ctrl_no_cnt = 0;
			if (typeof f.control_no.length == 'undefined'
					|| f.control_no.length == '') {
				ctrl_no_cnt = 1;
			} else {
				ctrl_no_cnt = f.control_no.length;
			}
			if (ctrl_no_cnt - c_nos.length == 0) {
				alert('내보내기할 논문이 없습니다.');
			} else {
				for (var i = 0; i < c_nos.length; i++) {
					for (var k = 0; k < f.control_no.length; k++) {
						if (trim(c_nos[i]) == trim(f.control_no[k].value)) {
							f.removeChild(f.control_no[k]);
							f.removeChild(f.p_mat_type[k]);
						}
					}
				}
				popupWindow("", "_export", 620, 707);
				f.action = "/Export.do";
				f.target = "_export";
				f.method = "post";
				f.submit();
			}
		} else {
			ModalPopup.close('true');
		}
	}
	document.body.removeChild(f);
	// }catch(ex){
	// alert(ex.message);
	// document.body.removeChild(f);
	// }
}
// -->
