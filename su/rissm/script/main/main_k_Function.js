function clickInsertForward(name, url, gubun) {
    clickInsert(name, url, '', '');
    if(gubun == "newWindow") {
        window.open(url);
    } else if(gubun == "forward") {
        document.location.href = url;
    }
}

/* 
 * ************************
 * 클릭 시 통계
 * ************************
 */
function clickInsert(click_name, click_url, mat_type, control_no){
    try{
        jQuery.ajax(
            {
                url : "/search/detail/ClickInsertAjax.do",
                type  : "post",
                data : {
                    click_name : click_name,
                    click_url : click_url,
                    mat_type : mat_type,
                    control_no : control_no
                },
                dataType : "text",
                success : function(result){
                },
                error: function(content,result){
                }
            }
        );
    }catch(ex){
    }
}

/* 
 * ************************
 * 메인 주제별 인기 학술자료
 * ************************
 */
function mainSubject(docType) {
    if (docType) $("form[name=frmsubject] input[name=docType]").val(docType);
    subjectRank();
}

function mainSubSubject(topic) {
    if (topic) $("#" + topic + " li.on > a").trigger("click");
}

function subjectRank(subCode) {
    var d = new Date();
    var minYear = d.getFullYear()-4;
    var maxYear = d.getFullYear();
    if(subCode) $("form[name=frmsubject] input[name=subCode]").val(subCode);

    var vSubCode = $("form[name=frmsubject] input[name=subCode]").val();
    var vDocType = $("form[name=frmsubject] input[name=docType]").val();
    var $obj = $(".academicItem");
    $obj.html("");
    $.ajax({
          type:"POST",
          url:"/rnk/ajax/subject4WeekRnk.do?mainYN=Y",
          dataType:'json',
          data : {orderFlag:'A', minYear:minYear, maxYear:maxYear, docType:vDocType, subCode:vSubCode},
          success:function(data){
              var vHtml = []; 
              if (data.titleList.length > 0) {
                vHtml.push('<ul>');
                  for(i = 0; i < data.titleList.length; i++) {
                      vHtml.push('<li>'+data.titleList[i]+'</li>');
                      if (i == 2) break;
                  }
                  vHtml.push('</ul>');
                  vHtml.push('<a href="javascript:void(0);" onclick="javascript:goAnalyticsInfo(this);" class="btnType2 mt20">더보기</a>');
              } else {
                  vHtml.push('<ul style="width:100%;text-align:center;"><li>데이터가 없습니다.</li></ul>');
              }
              endProgress();
              $obj.html(vHtml.join(''));
          }, error: function(request,status,error){
              endProgress();
          }
    });
}

function goAnalyticsInfo(docType, subcode) {
    /*var d = new Date();
    var minYear = d.getFullYear()-4;
    var maxYear = d.getFullYear();*/
    var frm = document.frmsubject;
    /*frm.minYear.value = minYear;
    frm.maxYear.value = maxYear;*/
    frm.action = "/analytics/sSubject4Week.do";
    frm.submit();
}