var start = 0;
var end = 10;
var max = 0;    //목록 최대치가 들어갈 전역변수
var loginYn = "";
var listView = {
        slide: 'div',
        infinite: true,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
    };

$(document).ready(function() {
    loginYn = $("#loginYn").val();

    $('.interestDot').hide();
    $('.intersetIco').hide();

    //section1_eds
    if (loginYn == "Y") {
        getDBListAjax(function() {
            getDirectDBListAjax(function() {
                getAllDBListAjax(function() {
                    getMainMyDBListAjax();
                });
            });
        });
    } else {
        getAllDBListAjax();
    }

    getOADBListAjax();
    
    $('.subscriptTab>li>a').click(function (e) {
        e.preventDefault();
        var loginRole = $("#loginRole").val();
        if(loginRole == 'ROLE_SOCIAL_USER') return false;
        else {
            $('.subscriptTab>li').removeClass('on');
            $(this).parent().not('.link').addClass('on');
            $(this).parent().find('.listViewW').slick('setPosition');
            return true;
        }
    });
    
    getNewPfSJbrowseMainAjax();
    
    $('#searchButton').on('click', function(){
        searchSubject();
    });
});

//전체학술 DB
function getAllDBListAjax(goCallback) {

    $("#allDbList").empty();
    var orderType = $('input[name=dbSort1]:checked').val();
    if (orderType == '' && orderType == null) {
        orderType == 'hit';
    }
    var url = "/fsearch/ajax/getAllDBList.do?orderType=" + orderType;

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function(data) {
            var obj = JSON.parse(data);
            var listLen = obj.length;
            var free = "";
            var html = "";
            var cnt = 0;
            
            $(".allDbListCnt").text(listLen + "개"); //총 DB갯수
            $(".subscriptTab1 .dbCount").text(listLen);
            
            for (var i = 0; i < listLen; i++) {
                if(cnt == 0){
                    html += "<div class=\"contListWs contListWs1\">";
                    html += "<ul class=\"contListW\">";
                }
                
                if (obj[i].hasOwnProperty("freeAccessS")) {
                    if (loginYn == "Y") { free = obj[i].freeAccessS + " ~ " + obj[i].freeAccessE + "시"; } 
                    else { free = "조건부무료"; }
                } else if (obj[i].isorganCodeChk == "N") { free = "무료이용"; 
                } else { free = "IP 대역 내 24시간"; }
                
                html += "<li>";
                html +=     "<div name=\"" + obj[i].dbName + "\" class=\"listCont\">";

                html +=         "<div class=\"classify\">";
                html +=             "<span class=\"type\">" + obj[i].code + "</span>";
                                    if (obj[i].newIconYn == 'Y') html += "<span class=\"new\">N</span>";
                html +=         "</div>";

                html +=         "<div class=\"dbInfo\">";
                html +=             "<a href=\"javascript:fncGoForeign('" + obj[i].sourceUrl + "?gubun=11','dbInfoAll" + i + "')\" class=\"subject\">" + obj[i].dbNameShort + "</a>";
                html +=             "<p class=\"detail\">" + obj[i].dbTypeCodeEtc + "</p>";
                html +=             "<div class=\"usage\">";
                html +=                 "<p class=\"acess\">" + free + "</p>";
                                        if (obj[i].rissSearchYn == 'Y') html += "<p class=\"location\">" + "RISS검색가능" + "</p>";
                html +=             "</div>";
                html +=         "</div>";

                html +=         "<div class=\"bottom\">";
                html +=             "<div class=\"botFuntion\">";
                                        if (obj[i].dbGuideYn == 'Y') html += "<a href=\"javascript:getDbGuide('" + obj[i].dbName + "')\" class=\"goInfo\">" + obj[i].dbName + "</a>";
                html +=                 "<a href=\"#\" onclick=\"javascript:clickHeart(this,'" + obj[i].dbName + "');\" title=\"좋아요\" class=\"favorite\">"
                html +=                     "<img src=\"/images/main/favorOn2.png\" class=\"favorOn\">";
                html +=                     "<img src=\"/images/main/favorOff.png\" class=\"favorOff\">";
                html +=                 "</a>"
                html +=                 "<div class=\"favorPop1\">";
                html +=                     "<p>내 관심DB에 등록 되었습니다.</p>"
                html +=                 "</div>";
                html +=                 "<div class=\"favorPop2\">";
                html +=                     "<p>내 관심DB에서 삭제 되었습니다.</p>";
                html +=                 "</div>";
                html +=         "</div>";
                html +=     "</div>";
                html += "</div>";
                html += "</li>";
                
                cnt++;
                if(cnt == 4){
                    html += "</ul>";
                    html += "</div>";
                    cnt = 0;
                }
            }
                        
            /*if($('#allDbList').attr('class').indexOf('slick-initialized') > -1){
                $('#allDbList').slick('unslick');
            }*/

            $("#allDbList").html(html);
            $("#allDbList").slick(listView);

            //page count
            var listViewW1 = $('.subscriptTab1 .listViewW').slick("getSlick").slideCount;
            $('.subscriptTab1 .total').text(listViewW1);
            
            $('.subscriptTab1 .listViewW').on('init', function (event, slick) {
                $('.subscriptTab1 .tabCont .count .current').text(slick.currentSlide + 1);
            }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                $('.subscriptTab1 .tabCont .count .current').text(nextSlide + 1);
            });
            
            if (goCallback && jQuery.isFunction(goCallback)) {
                goCallback();
            }

        }, error: function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
}

//내 무료 DB
function getDBListAjax(goCallback) {

    $("#dbList").empty();
    var orderType = $('input[name=dbSort2]:checked').val();
    if (orderType == '' && orderType == null) {
        orderType == 'hit';
    }

    var url = "/fsearch/ajax/getDBListAjax.do?orderType=" + orderType;

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function(data) {
            var obj = JSON.parse(data);
            var listLen = obj.length;
            var html = "";
            var free = "";
            var cnt = 0;
            
            $(".subscriptTab2 .dbCount").text(listLen);

            for (var i = 0; i < listLen; i++) {
                if(cnt == 0){
                    html += "<div class=\"contListWs contListWs2\">";
                    html += "<ul class=\"contListW\">";
                }
                
                if (obj[i].hasOwnProperty("freeAccessS")) {
                    if (loginYn == "Y") { free = obj[i].freeAccessS + " ~ " + obj[i].freeAccessE + "시"; } 
                    else { free = "조건부무료"; }
                } else if (obj[i].isorgancodechk == "N") { free = "무료이용";
                } else { free = "IP 대역 내 24시간"; }
                
                html += "<li>";
                html += "   <div name=\"" + obj[i].dbname + "\" class=\"listCont\">";
                html += "       <div class=\"classify\">";
                html += "           <span class=\"type\">" + obj[i].code_content + "</span>";
                                    if (obj[i].newIconYn == 'Y') html += "<span class=\"new\">N</span>";
                html += "       </div>";
                html += "       <div class=\"dbInfo\">";
                html += "           <a href=\"javascript:fncGoForeign('" + obj[i].source_url + "?gubun=11','dbInfoAll" + i + "')\" class=\"subject\">" + obj[i].dbname_short + "</a>";
                html += "           <p class=\"detail\">" + obj[i].code_name + "</p>";
                html += "           <div class=\"usage\">";
                html += "               <p class=\"acess\">" + free + "</p>";
                                        if (obj[i].rissSearchYn == 'Y') html += "<p class=\"location\">" + "RISS검색가능" + "</p>";
                html += "           </div>";
                html += "       </div>";
                html += "       <div class=\"bottom\">";
                html += "           <div class=\"botFuntion\">";
                                        if (obj[i].dbGuideYn == 'Y') html += "<a href=\"javascript:getDbGuide('" + obj[i].dbname + "')\" class=\"goInfo\">" + obj[i].dbname + "</a>";
                html += "               <a href=\"#\" onclick=\"javascript:clickHeart(this,'" + obj[i].dbname + "');\" title=\"좋아요\" class=\"favorite\">"
                html += "                   <img src=\"/images/main/favorOn2.png\" class=\"favorOn\">";
                html += "                   <img src=\"/images/main/favorOff.png\" class=\"favorOff\">";
                html += "               </a>"
                html += "               <div class=\"favorPop1\">";
                html += "                   <p>내 관심DB에 등록 되었습니다.</p>"
                html += "               </div>";
                html += "               <div class=\"favorPop2\">";
                html += "                   <p>내 관심DB에서 삭제 되었습니다.</p>";
                html += "               </div>";
                html += "           </div>";
                html += "       </div>";
                html += "   </div>";
                html += "</li>";

                cnt++;
                if(cnt == 4){
                    html += "</ul>";
                    html += "</div>";
                    cnt = 0;
                }
            }
            
            /*if($('#dbList').attr('class').indexOf('slick-initialized') > -1){
                $('#dbList').slick('unslick');
            }*/

            $("#dbList").html(html);
            $("#dbList").slick(listView);

            var listViewW2 = $('.subscriptTab2 .listViewW').slick("getSlick").slideCount;
            $('.subscriptTab2 .total').text(listViewW2);

            //page count
            $('.subscriptTab2 .listViewW').on('init', function (event, slick) {
                $('.subscriptTab2 .tabCont .count .current').text(slick.currentSlide + 1);
            }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                $('.subscriptTab2 .tabCont .count .current').text(nextSlide + 1);
            });
                        
            if (goCallback && jQuery.isFunction(goCallback)) {
                goCallback();
            }
        }, error: function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
}

//조건부 무료
function getDirectDBListAjax(goCallback) {

    $("#directDbList").empty();
    var orderType = $('input[name=dbSort3]:checked').val();
    if (orderType == '' && orderType == null) {
        orderType == 'hit';
    }

    var url = "/fsearch/ajax/getConditionalDBListAjax.do?orderType=" + orderType;

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function(data) {
            var obj = JSON.parse(data);
            var listLen = obj.length;
            var html = "";
            var free = "";
            var cnt = 0;

            $(".subscriptTab3 .dbCount").text(listLen);

            for (var i = 0; i < listLen; i++) {
                if(cnt == 0){
                    html += "<div class=\"contListWs contListWs2\">";
                    html += "<ul class=\"contListW\">";
                }
                
                if (obj[i].hasOwnProperty("free_access_s")) {
                    if (loginYn == "Y") { free = obj[i].free_access_s + " ~ " + obj[i].free_access_e + "시";
                    } else { free = "조건부무료"; }
                } else { free = "이용불가"; }
                
                html += "<li>";
                html += "   <div name=\"" + obj[i].dbname + "\" class=\"listCont\">";
                html += "       <div class=\"classify\">";
                html += "           <span class=\"type\">" + obj[i].code_content + "</span>";
                                    if (obj[i].newIconYn == 'Y') html += "<span class=\"new\">N</span>";
                html += "       </div>";
                html += "       <div class=\"dbInfo\">";
                html += "           <a href=\"javascript:fncGoForeign('" + obj[i].source_url + "?gubun=11','dbInfoAll" + i + "')\" class=\"subject\">" + obj[i].dbname_short + "</a>";
                html += "           <p class=\"detail\">" + obj[i].code_name + "</p>";
                html += "           <div class=\"usage\">";
                html += "               <p class=\"acess\">" + free + "</p>";
                                        if (obj[i].rissSearchYn == 'Y') html += "<p class=\"location\">" + "RISS검색가능" + "</p>";
                html += "           </div>";
                html += "       </div>";
                html += "       <div class=\"bottom\">";
                html += "           <div class=\"botFuntion\">";
                                        if (obj[i].dbGuideYn == 'Y') html += "<a href=\"javascript:getDbGuide('" + obj[i].dbname + "')\" class=\"goInfo\">" + obj[i].dbname + "</a>";
                html += "               <a href=\"#\" onclick=\"javascript:clickHeart(this,'" + obj[i].dbname + "');\" title=\"좋아요\" class=\"favorite\">"
                html += "                   <img src=\"/images/main/favorOn2.png\" class=\"favorOn\">";
                html += "                   <img src=\"/images/main/favorOff.png\" class=\"favorOff\">";
                html += "               </a>"
                html += "               <div class=\"favorPop1\">";
                html += "                   <p>내 관심DB에 등록 되었습니다.</p>"
                html += "               </div>";
                html += "               <div class=\"favorPop2\">";
                html += "                   <p>내 관심DB에서 삭제 되었습니다.</p>";
                html += "               </div>";
                html += "           </div>";
                html += "       </div>";
                html += "   </div>";
                html += "</li>";
                
                cnt++;
                if(cnt == 4){
                    html += "</ul>";
                    html += "</div>";
                    cnt = 0;
                }
            }
            
            /*if($('#directDbList').attr('class').indexOf('slick-initialized') > -1){
                $('#directDbList').slick('unslick');
            }*/

            $("#directDbList").html(html);
            $("#directDbList").slick(listView);

            //page count
            var listViewW3 = $('.subscriptTab3 .listViewW').slick("getSlick").slideCount;
            $('.subscriptTab3 .total').text(listViewW3);
            
            $('.subscriptTab3 .listViewW').on('init', function (event, slick) {
                $('.subscriptTab3 .tabCont .count .current').text(slick.currentSlide + 1);
            }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                $('.subscriptTab3 .tabCont .count .current').text(nextSlide + 1);
            });
            
            if (goCallback && jQuery.isFunction(goCallback)) {
                goCallback();
            }

        }, error: function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
}

//관심 DB 불러오기 위한 ajax
function getMainMyDBListAjax() {
    $("#fvrDbList").empty();
    var orderType = $('input[name=dbSort4]:checked').val();
    if (orderType == '' && orderType == null) {
        orderType == 'hit';
    }

    var url = "/fsearch/ajax/getMyDBListAjax.do?orderType=" + orderType;

    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function(data) {
            if (data == '[]') { //데이터가 비었을 경우 (로그인 상태가 아니거나 좋아요한 목록이 없거나)

                $(".subscriptTab4 .dbCount").text("0");

                var html = "";
                html = "<div class=\"noResultW\"><p>내 관심 DB를 설정 해 보세요</p></div>";
                $(".subscriptTab4").find(".listMoreW").hide(); //더보기 버튼 hide
                $("#fvrDbList").html(html);
                $(".listViewW .contListWs1").children().children().children("div [name=" + dbName + "]").children(".bottom").children(".botFuntion").children(".favorite").removeClass("on");
                $(".listViewW .contListWs2").children().children().children("div [name=" + dbName + "]").children(".bottom").children(".botFuntion").children(".favorite").removeClass("on");
                $(".listViewW .contListWs3").children().children().children("div [name=" + dbName + "]").children(".bottom").children(".botFuntion").children(".favorite").removeClass("on");
                
                $("#fvrDbList").slick({
                    slide : 'div',
                    infinite: false,
                    slidesToShow : 1,
                    slidesToScroll: 1,
                    speed: 1000,
                });
                
            } else {
                var obj = JSON.parse(data);
                var dbName = "";
                var html = "";
                var listLen = obj.length;
                var free = "";
                var cnt = 0;

                $("#fvrDbList").empty(); //초기화
                $(".subscriptTab4 .dbCount").html(listLen);
                $(".subscriptTab4").find(".listMoreW").show(); //더보기 버튼 hide
                
                for (var i = 0; i < listLen; i++) {
                    if(cnt == 0){
                        html += "<div class=\"contListWs\">";
                        html += "<ul class=\"contListW\">";
                    }
                    
                    if (obj[i].hasOwnProperty("freeAccessS")) {
                        if (loginYn == "Y") { free = obj[i].freeAccessS + " ~ " + obj[i].freeAccessE + "시";
                        } else { free = "조건부무료"; }
                    } else if (obj[i].isorganCodeChk == "N") { free = "무료이용";
                    } else { free = "IP 대역 내 24시간"; }
                    
                    html += "<li>";
                    html += "   <div name=\"" + obj[i].dbName + "\" class=\"listCont\">";
                    html += "       <div class=\"classify\">";
                    html += "           <span class=\"type\">" + obj[i].code + "</span>";
                                        if (obj[i].newIconYn == 'Y') html += "<span class=\"new\">N</span>";
                    html += "       </div>";
                    html += "       <div class=\"dbInfo\">";
                    html += "           <a href=\"javascript:fncGoForeign('" + obj[i].sourceUrl + "?gubun=11','dbInfoAll" + i + "')\" class=\"subject\">" + obj[i].dbNameShort + "</a>";
                    html += "           <p class=\"detail\">" + obj[i].dbTypeCodeEtc + "</p>";
                    html += "           <div class=\"usage\">";
                    html += "               <p class=\"acess\">" + free + "</p>";
                                            if (obj[i].rissSearchYn == 'Y') html += "<p class=\"location\">" + "RISS검색가능" + "</p>";
                    html += "           </div>";
                    html += "       </div>";
                    html += "       <div class=\"bottom\">";
                    html += "           <div class=\"botFuntion\">";
                                            if (obj[i].dbGuideYn == 'Y') html += "<a href=\"javascript:getDbGuide('" + obj[i].dbName + "')\" class=\"goInfo\">" + obj[i].dbName + "</a>";
                    html += "               <a href=\"#\" onclick=\"javascript:clickHeart(this,'" + obj[i].dbName + "');\" title=\"좋아요\" class=\"favorite on\">";
                    html += "                   <img src=\"/images/main/favorOn2.png\" class=\"favorOn\">";
                    html += "                   <img src=\"images/main/favorOff.png\" class=\"favorOff\">";
                    html += "               </a>"
                    html += "               <div class=\"favorPop1\">";
                    html += "                   <p>내 관심DB에 등록 되었습니다.</p>"
                    html += "               </div>";
                    html += "               <div class=\"favorPop2\">";
                    html += "                   <p>내 관심DB에서 삭제 되었습니다.</p>";
                    html += "               </div>";
                    html += "           </div>";
                    html += "       </div>";
                    html += "   </div>";
                    html += "</li>";
                    
                    cnt++;
                    if(cnt == 4){
                        html += "</ul>";
                        html += "</div>";
                        cnt = 0;
                    }
                }

                for (var i = 0; i < obj.length; i++) {
                    var dbName = obj[i].dbName;
                    $(".listViewW .contListWs1").children().children().children("div [name=" + dbName + "]").children(".bottom").children(".botFuntion").children(".favorite").addClass("on")
                    $(".listViewW .contListWs2").children().children().children("div [name=" + dbName + "]").children(".bottom").children(".botFuntion").children(".favorite").addClass("on")
                    $(".listViewW .contListWs3").children().children().children("div [name=" + dbName + "]").children(".bottom").children(".botFuntion").children(".favorite").addClass("on")
                }
                
                /*if($('#fvrDbList').attr('class').indexOf('slick-initialized') > -1){
                    $('#fvrDbList').slick('unslick');
                }*/

                $('.subscriptTab4 .listViewW').on('init', function (event, slick) {
                    $('.subscriptTab4 .tabCont .count .current').text(slick.currentSlide + 1);
                }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
                    $('.subscriptTab4 .tabCont .count .current').text(nextSlide + 1);
                });
                
                $("#fvrDbList").html(html);
                $("#fvrDbList").slick(listView);

                //page count
                var listViewW4 = $('.subscriptTab4 .listViewW').slick("getSlick").slideCount;
                $('.subscriptTab4 .total').text(listViewW4);
            }
        }, error: function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
}

function clickHeart(obj, name, url) {
    
    if (loginYn == "Y") {
        var url = "";
        var hasOn = obj.classList.contains("on");
        
        //관심DB등록
        $('.subscriptTab>li>a .interestDot').fadeIn();
        if ($(obj).hasClass('on')) {
            url = "/fsearch/ajax/deleteMyFvrDB.do?servicedbId=" + name;
            $(obj).removeClass('on');
            $(obj).parent().children('.favorPop2').fadeIn();
            $('.listViewW').addClass('on');
            setTimeout(function () {
                $('.favorPop2').fadeOut();
                $('.listViewW').removeClass('on');
            }, 1500);
        } else {
            url = "/fsearch/ajax/createMyFvrDB.do?servicedbId=" + name;
            $(obj).addClass('on');
            $(obj).parent().children('.favorPop1').fadeIn();
            $('.subscriptTab>li>a .intersetIco').fadeIn();
            $('.listViewW').addClass('on');
            setTimeout(function () {
                $('.favorPop1').fadeOut();
                $('.subscriptTab>li>a .intersetIco').fadeOut();
                $('.listViewW').removeClass('on');
            }, 1500);
        }

        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function() {

                $('#fvrDbList').slick('unslick');
                $('#fvrDbList').empty();
                getMainMyDBListAjax();

            }, error: function(request, status, error) {
                console.log(request);
                console.log(error);
            }
        });
    } else {
        window.location.href = "/LoginRedirect.do?loginParameter=%3F&directUrl=fIndex.do";
    }
}

function dbSort(obj) {
    if (obj == 1) {
        $('#allDbList').slick('unslick');
        getAllDBListAjax(function() {
            $('#fvrDbList').slick('unslick');
            getMyDBListAjax();
        });
    }
    else if (obj == 2) {
        $('#dbList').slick('unslick');
        getDBListAjax(function() {
            $('#fvrDbList').slick('unslick');
            getMyDBListAjax();
        });
    }
    else if (obj == 3) {
        $('#directDbList').slick('unslick');
        getDirectDBListAjax(function() {
            $('#fvrDbList').slick('unslick');
            getMyDBListAjax();
        });
    }
    else if (obj == 4) {
        $('#fvrDbList').slick('unslick');
        getMyDBListAjax();
    }


}

//OA LIST
function getOADBListAjax() {
    var url = "/fsearch/ajax/getOADBListAjax.do";
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        async: false,
        success: function(data) {
            var obj = JSON.parse(data);
            if (data == '[]') {
                return false;
            } else {
                localStorage.setItem('oaList', JSON.stringify(obj));

                var arr = [];
                for (var i = 0; i < obj.length; i++) {
                    arr.push(obj[i].totSchName.split('@').join(','));
                }
                arr = arr.join(',')
                arr = arr.split(',');

                localStorage.setItem('oaListText', arr);
            }
        }, error: function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
}

var depth1List = new Array();
var depth1ListTitle = new Array();
var depth1ListCnt = new Array();
var depth2Data = new Array();

function getNewPfSJbrowseMainAjax() {

    var url = "/fsearch/searchPF.do?";
    url += "pftype=subjectBrowse";
    
    $.ajax({
        type : "GET",
        url : url,
        dataType : 'json',
        success : function(data) {
            var obj = JSON.parse(data)[0];
            var dataRow = obj.Facets.Subjects;
            var htmlTxt = "";
            var facetHtml = "";
            var changeListHtml = "";
            var title = "";
            var firstId = "";
            //주제 목록 뿌려주기 시작
            var depth0List = new Array();
            var cnt = 0;
            for (var i = 0; i < dataRow.length; i++) {
                if (dataRow[i].parentId == null) {
                    depth0List.push(dataRow[i].id);
                    facetHtml += "<div class=\"list\">"
                    if(cnt==0){
                        facetHtml += "<a href=\"javascript:void(0)\" class=\"click\"";
                        changeListHtml += "<ul class=\"changeList on\" id=\"ch_" + dataRow[i].id + "\"></ul>";
                        title = dataRow[i].SubjectName;
                        firstId = dataRow[i].id;
                        cnt++;
                    } else {
                        facetHtml += "<a href=\"javascript:void(0)\"";
                        changeListHtml += "<ul class=\"changeList\" id=\"ch_" + dataRow[i].id + "\"></ul>";
                    }
                    facetHtml += "onclick=\"javascript:clickAtag(this.id, this.title, '')\" id=\""+dataRow[i].id+"\" title=\""+dataRow[i].SubjectName+"\"><span class=\"tit\">" +dataRow[i].SubjectName+ "</span></a></div>"
                }
            }
            
            //facetHtml += "</div>";
            var titHtml = "";
            titHtml += "<p class=\"firstLetter\">" + title.substring(0,1) + "</p>";
            titHtml += "<p class=\"tit\" name=\""+title+"\" >" + title + "</p>";
            $(".changeTit").html(titHtml);

            if($('.sbjList').attr('class').indexOf('slick-initialized') > -1){
                $('.sbjList').slick('unslick');
            }
            
            //뎁스 표현을 위해 우선 화면에 표현 
            $(".sbjList").html(facetHtml);
            $(".journal").find(".changeArea").append(changeListHtml);
            /*$(".changeListWrap").html(changeListHtml);*/
            
            var sbjSlide = {
                    slide : 'div',
                    infinite: true,
                    arrows : false,
                    autoplay: false,
                    autoplaySpeed: 2000,
                    speed: 500,
                    slidesToShow : 9,
                    swipeToSlide : true,
                    draggable : true,
                    responsive: [
                        {
                            breakpoint: 1220,
                            settings: {
                                slidesToShow : 7,
                            }
                        },
                        {
                            breakpoint: 960,
                            settings: {
                                slidesToShow : 5,
                            }
                        },
                        {
                            breakpoint: 700,
                            settings: {
                                slidesToShow : 3,
                                variableWidth: true,
                            }
                        },
                        {
                            breakpoint: 420,
                            settings: {
                                slidesToShow : 3,
                                variableWidth: true,
                            }
                        },
                        {
                            breakpoint: 355,
                            settings: {
                                slidesToShow : 2,
                                variableWidth: true,
                            }
                        }
                    ]
                };
            
            $('.sbjTab .sbjList').slick(sbjSlide);
            
            var sbjCount = $('.sbjTab .sbjList').slick("getSlick").slideCount;
            var bar = $('.sbjBar').width();
            var result = bar / sbjCount;
            var cS = Number($('.sbjList .slick-active').attr('data-slick-index')) + 1;
            var current = result * cS
            $('.sbjBar span').css('width',current)

            $('.sbjTab .slick-active').last().addClass('sp').siblings().removeClass('sp');

            $('.sbjTab .sbjList').on('afterChange', function(event,slick) {
                //$('.sbjTab .slick-active').last().addClass('sp').siblings().removeClass('sp');
                sbjCount = $('.sbjTab .sbjList').slick("getSlick").slideCount;
                bar = $('.sbjBar').width();
                result = bar / sbjCount;
                cS = Number($('.sbjList .slick-active').attr('data-slick-index')) + 1;
                current = result * cS
                $('.sbjBar span').css('width',current);
            });

            $('.sbjTab .list a').click(function(e){
                e.preventDefault();
                $('.sbjTab .list a').removeClass('click')
                $(this).addClass('click')
                var txt = $('.sbjTab .list a').filter('.click').children().text();
                console.log(txt)
                $('.sbjTab .list a span').each(function(){
                    if($(this).text() == txt){
                        $(this).parent().addClass('click')
                    }
                });
            });

            $('.sbjTab .sbjList').on('beforeChange', function(event,slick) {
                var txt = $('.sbjTab .list a').filter('.click').children().text();
                console.log(txt)
                $('.sbjTab .list a span').each(function(){
                    if($(this).text() == txt){
                        $(this).parent().addClass('click')
                    }
                });

            });
            
            var depth0 = "";
            var depth1Html = "";
            var depth1Cnt = 0;
            for (var i = 0; i < depth0List.length; i++) {
                depth0 = depth0List[i];
                depth1Html = ""; //초기화
                depth1Cnt = 0;
                for (var j = 0; j < dataRow.length; j++) {
                    if (dataRow[j].parentId == depth0) { //부모 아이디가 depth0의 아이디와 같은 경우 
                        depth1List.push(dataRow[j].id);
                        depth1ListTitle.push(dataRow[j].SubjectName);
                        depth1ListCnt.push(dataRow[j].count);

                        depth1Html += "<li>";
                        depth1Html += "<a href='javascript:void(0)' onclick='goJournals(this)' title=\""+dataRow[j].SubjectName+"\" name=\""+dataRow[j].id+"\" >";
                        depth1Html += "<span id=\""+dataRow[j].id+"\" class=\"subjectName\">"+dataRow[j].SubjectName+"</span>";
                        depth1Html += "<span class=\"total\"> ("+AddComma(dataRow[j].count)+")</span>";
                        depth1Html += "</a>";
                        depth1Html += "</li>" ;
                        $("#ch_"+dataRow[j].parentId).html(depth1Html);
                    }
                }
            }

            depth2Data = dataRow;
        },
        error : function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
}

function searchSubject(){
    $('.sbjSrhPop > ul').empty();
    var qry = $("#searchWord").val();
    var html = "";
    var url = "/fsearch/searchPF.do?";
    url += "pftype=subjectBrowse";
    
    $.ajax({
        type : "GET",
        url : url,
        dataType : 'json',
        beforeSend:function(){
            $('#fLoadingProcess').css("display", "block");
            $(".sbjSrhPop").show();
        },
        complete: function(){
            $('#fLoadingProcess').css("display", "none");
        },
        success: function(data) {
            var obj = JSON.parse(data)[0];
            subjectList = obj.Facets.Subjects;
            for(i=0; i<subjectList.length; i++){
                var name = subjectList[i].SubjectName.toLowerCase();
                var nameOri = subjectList[i].SubjectName;
                var sIdx = -1;
                var eIdx = -1;
                var slideIdx = 0;
                if(name.indexOf(qry) > -1){  
                    sIdx = name.indexOf(qry);
                    eIdx = sIdx + qry.length;           
                    name = nameOri.substr(0,sIdx) + "<strong>" + nameOri.substr(sIdx, qry.length) + "</strong>" + nameOri.substr(eIdx , nameOri.length);
                    if(subjectList[i].parentId == null){
                        slideIdx =  $(".sbjTab").find("#"+subjectList[i].id).parent().parent().parent().attr('data-slick-index');
                        html = "<li><a data-slide=\"" + slideIdx + "\" id="+ subjectList[i].id +" onclick=\"javascript:goSubject('','"+ subjectList[i].SubjectName +"', this)\";>" + name + "</a></li>" + html;
                    } else {  //부모 아이디가 있는 경우 한 번 더 체크해서 3뎁스 여부 확인
                        for(j=0; j<subjectList.length; j++){
                            if(subjectList[i].parentId == subjectList[j].id && subjectList[j].parentId == null){ 
                                var name2 = subjectList[j].SubjectName.toLowerCase();
                                var nameOri2 = subjectList[j].SubjectName;
                                var sIdx2 = name2.indexOf(qry);
                                var eIdx2 = sIdx2 + qry.length ;
                                var parent = "";
                                slideIdx =  $(".sbjTab").find("#"+subjectList[i].parentId).parent().parent().parent().attr('data-slick-index');
                                
                                if(name2.indexOf(qry) > -1){
                                    parent = nameOri2.substr(0, sIdx2) + "<strong>" + nameOri2.substr(sIdx2, qry.length) + "</strong>" + nameOri2.substr(eIdx2, nameOri2.length);
                                } else {
                                    parent = nameOri2;
                                }
                                html += "<li><a data-slide=\"" + slideIdx + "\" class='list' onclick=\"javascript:goSubject(this,";
                                html += "'" + nameOri2 + "','" + subjectList[i].parentId + "');\"";
                                html += "id=\""+ subjectList[i].id + "\">" + parent + " > " + name + "</a></li>";
                                
                            }
                        }
                    }
                    
                }
            }
            
            if(html == ''){
                html = '<h3>검색 결과가 없습니다.</h3>'
            }
            
            $(".sbjSrhPop > ul").append(html);
            
            $('a[data-slide]').click(function(e) {
                e.preventDefault();
                var slideno = $(this).data('slide');
                $('.sbjTab .sbjList').slick('slickGoTo', slideno - 1);
            });
            
        },
        error : function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
    
    //fncWindowOpen("/fsearch/searchSubject.do?qry=" + qry, "AddPubPage", 450, 500);    
}

function goJournals(obj){
    
    var sbjId1 = $('.slick-slide > div > div > a.click').attr('id');
    var sbjTit = $('.changeTit > .tit').text();
    var sbjId2 = obj.name;
    
    location.href = "/goJournals.do?cate=subject&sbjid1=" + sbjId1 + "&sbjtit=" + sbjTit + "&sbjid2=" + sbjId2 ;
    
}

function goSubject(obj,title,pId){

    if(typeof(obj) == 'string'){
        clickAtag(pId.id,title,obj);
        addClass(pId.text);
    }else if(typeof(obj) == 'object'){
        clickAtag(pId,title,obj.id);
        addClass(obj.text);
    }
    $(".sbjSrhPop").hide();
    
}

//세자리수마다 콤마(,) 적용
function AddComma(num)
{
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}

function addClass(name){
    var target = name.split(' > ')
    $('.list > a > span').each(function(){
        $(this).parent().removeClass('click')
        if(target[0] == $(this).text()){
            $(this).parent().addClass('click')
        }
    })
}

function clickAtag(id,title,id2){
    
    var titHtml = "";
    titHtml += "<p class=\"firstLetter\">" + title.substring(0,1) + "</p>";
    titHtml += "<p class=\"tit\">" + title + "</p>";
    $(".changeTit").html(titHtml);
    
    $("#ch_"+id).show();
    $("#ch_"+id).siblings().hide();
    
    $("#"+id).addClass("click");
    
    $("#"+id).parent().parent().parent().siblings().find("a").removeClass("click");
    
    $('.changeList>li>a').each(function(){
        $(this).removeClass('on');
    })
    
    if(id2 != null && id2 != '') {
        $('a[name="'+id2+'"]').addClass('on');
    }
    
}
   
function getDbGuide(dbname) {
    var url = '/foreign/ajax/dbGuideAjax.do?dbname=' + dbname;
    
    $.ajax({
        type : "GET",
        url : url,
        dataType : 'json',
        success: function(data) {
            /*var obj = JSON.parse(data);*/
            var foreignDbName = "해외DB 사용 안내 - " + data.dbname;
            var foreignDbGuide = data.dbGuide.replace(/\n/, '<br/>');
            $("#foreignDbName").text(foreignDbName);
            $("#foreignDbGuide").html(foreignDbGuide);
            
            let ph = $('.dbGuidePop .popHeader').outerHeight(true);
            $('.dbGuidePop .popCont').css({'height':'calc(100% - ' +ph+'px)'})
            $('.blackBg1').show();
            $('.dbGuidePop').addClass('on');
            
            $('.dbGuidePopClose').click(function(e){
                e.preventDefault();
                $('.blackBg1').hide();
                $('.dbGuidePop').removeClass('on');
                $(this).parents('.divPopup').removeClass('long');
            });
        },
        error : function(request, status, error) {
            console.log(request);
            console.log(error);
        }
    });
}