var chatMore = {};
chatMore = {};
chatMore.defaultData = { pagesize: 3, text: "more" };
chatMore.data = {};
chatMore.click = function(event, tmpl) {
	var $listform = $(event.target).parent(".list-form");
	
	var pagesize = $listform.data("pagesize");
	var total = $listform.data("total");
	var index = $listform.find(".list-inner .item").length;
	
	var listId = $listform.attr("id");
	var contents = chatMore.data[listId].slice(index, index+pagesize);
	
	var dialogHtml = $.dialogResponse(contents, $.getTemplateStr("dialog-response"));
	$listform.find(".list-inner").append($(dialogHtml));

	if(index + pagesize >= total) {
		$(event.target).remove();
	}
};

function Config(data) {
	this.data = data;
	this.keys = Object.keys(this.data);
	
	this.getBoolean = function(key, defaultValue) {
		if(this.keys.indexOf(key) > -1 && this.data[key]) {
			return (this.data[key].toLowerCase() === "true");
		}
		return defaultValue;
	};
	this.get = function(key, defaultValue) {
		if(this.keys.indexOf(key) > -1) {
			return this.data[key];
		}
		return defaultValue;
	};
}