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
    // $('html').easeScroll({
	// 	animationTime: 2000,
	// });
});    