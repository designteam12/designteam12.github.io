(function($) {
	$.templateRenderer = function(filename, renderData, contextpath) {
		$.extend(renderData, {
			"contextpath" : CONTEXTPATH
		});	
		
		var content = $.ajax({
	    	url: "./script/chatBot/tmpl/"+filename+".tmpl",
	        dataType:"text",
	        async : false,
	        type:"get",
	        processData:false
	    });
		
		var template = $.templates(content.responseText);
		return template.render(renderData);
	};
	
	$.getTemplateStr = function(filename) {
		var content = $.ajax({
	    	url: "./script/chatBot/tmpl/"+filename+".tmpl",
	        dataType:"text",
	        async : false,
	        type:"get",
	        processData:false
	    });
		return $.templates(content.responseText);
	};
	
	$.registTemplateStr = function(registName, filename) {
		var content = $.ajax({
	    	url: "./script/chatBot/tmpl/"+filename+".tmpl",
	        dataType:"text",
	        async : false,
	        type:"get",
	        processData:false
	    });
		return $.templates(registName, content.responseText);
	};
	
	$.dialogResponse = function(contents, tmpl) {
		if(!tmpl)
			tmpl = $.getTemplateStr("dialog-response");
	
		var data = {
			contents : contents, 
			contextpath : CONTEXTPATH,
			functionName : "chat.sendRichMessage",
			botBubbleId : $("li.bot").length + 1 
		};
		return tmpl.render(data);
	};
	
	$.views.converters({
		escape: function(val) {
			return escape(val);
		},
		imagesize: function(w, h, maxW) {
			var rtnW = w;
			var rtnH = h;
			if(maxW && w > maxW) {
				rtnW = maxW;
				rtnH = h*maxW/w;
				return "width=" + maxW + " height=" + h*maxW/w;
			}
			return "";
		}
	});
	
	$.views.helpers({
		setMoreData: function(key, value) {
			chatMore.data[key] = value;
		}, 
		filterMore: function(item, index, items) {
			if(this.props.more)
				return (this.props.more.pagesize || chatMore.defaultData.pagesize) > index;
			else
				return true;
		}
	});
}(jQuery));