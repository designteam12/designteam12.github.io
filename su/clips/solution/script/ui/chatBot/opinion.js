var opinion = {
	cacheTemplate : function() {
		this.mainTmpl = $.getTemplateStr("opinion-main");
		this.strTmpl = $.getTemplateStr("opinion-str");
		this.scoreTmpl = $.getTemplateStr("opinion-score");
	},
	init : function(){
		var self = this;
		self.cacheTemplate();
		var div = $("<div />").attr("id", "opinions").addClass("opinions").append(self.mainTmpl.render()).css("display", "none");
		chat.$msgContainer.append($(div));
		
		$("#opinions ul#main li.cursor").click(
				function(e) {
					self.mode($(e.target).data("type"));
				}
		);
	},
	main : function(obj){
		$("#opinions").data("pkey", $(obj).data("pkey"));
		$("#opinions").show();
	},
	mode : function(type) {
		$("#opinions ul#main").hide();
		var self = this;
		if(type == "str"){
			$("#opinions").append(self.strTmpl.render());
			$("#incorrect-textarea").focus();
		} 
		else if(type == "score"){
			$("#opinions").append(self.scoreTmpl.render());
		}
		
		$("#opinions ul#"+type+" li.cursor").click(
				function(e) {
					self.save(type, $(e.target).data("value"));
				}
		);
	},
	
	close : function(){
		$("#opinions ul#main").show();
		$("#opinions ul:not(#main)").remove();
		$("#opinions").hide();
	},
	
	back : function(currType){
		var self = this;
		$("#opinions ul#"+currType).remove();
		$("#opinions ul#main").show();
	},
	
	save : function(type, value){
		var params = {};
		params[type] =  value || $("#opinionStr").val().trim();
		
		var dialogPkey = $("#opinions").data("pkey");
		chat.ajaxCall(CONTEXTPATH + "api/domains/"+ DOMAIN_ID +"/dialog/"+dialogPkey+"/opinion", params)
			.done(function(ret){
				chat.answer(ret);
			})
			.fail(function(xhr) {
				chat.failAnswer(xhr);
			})
			.always(function() {
				opinion.close();			
			});
			
	},
	
	event : function(event) {
		var self = this;
		if (event.type === "click" || event.keyCode === 13) {
			self.save("str");
			return false;
		}
	}
};