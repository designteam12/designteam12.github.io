var USER_KEY = "";
var DOMAIN_ID = "";

var chat = {
	messageToSend: "",
	messageToShow: "",
	messageResponses: [],
	data : {
		ttsIcon : false,
		botName : "KonanBot", 
		domainImage : "",
		attachmentPath : ""
	},
	speech : {
		enableTTS : false,
		enableSTT : false
	},
	opinion : {
		enable : false
	},
	ajaxCall : function(url, data, opt) {
		return $.ajax($.extend({
			'type' : 'POST',
			'url' : url,
			'headers' : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			},
			'data' : JSON.stringify(data),
			'async' : false
		}, opt));
	},
	/*
	// if jsonp
	ajaxCall : function(url, data, opt) {
		if(!$.isEmptyObject(data)) {
			for(var key in data) {
				if(data[key])
					data[key] = encodeURIComponent(data[key]);
			}
			url += '?' + $.param(data);
		}
		return $.ajax($.extend({
			'type' : 'GET',
			'url' : url,
			'dataType' : 'jsonp',
			'headers' : {
				'Accept' : 'application/json',
				'Content-Type' : 'application/json'
			}
		}, opt));
	},
	*/
	cacheDOM: function() {
		this.$chatContainer = $("#chat-history");
		this.$chatHistory = $("#chat-history > ul");
		this.$button = $("#chat-send");
		this.$textarea = $("#chat-textarea");
		this.$msgContainer = $("#chat-message");
	},
	cacheTemplate : function() {
		this.loadingTmpl = $.getTemplateStr("message-loading");
		this.questionTmpl = $.getTemplateStr("user-message");
		this.answerTmpl = $.getTemplateStr("bot-message");
		this.dialogTmpl = $.registTemplateStr("dialogTmpl", "dialog-response");
		$.registTemplateStr("carouselTmpl", "carousel-response");
		$.registTemplateStr("listTmpl", "list-response");
	},
	bindEvents: function() {
		var self = this;
		self.$button.on("click", self.addMessageEvent.bind(self));
		self.$textarea.on("keydown", self.addMessageEvent.bind(self));
		self.$chatContainer.on("slid.bs.carousel", ".carousel", function(e) {
			if(typeof speechSynthesizer != 'undefined')
				speechSynthesizer.speak($(e.target));
		});
	},
	init: function(domain, user, scenario, ajaxRequest) {
		var self = this;
		if(ajaxRequest && typeof ajaxRequest == "function") 
			self.ajaxCall = ajaxRequest;
		
		DOMAIN_ID = domain;
		USER_KEY = user;
		
		self.cacheDOM();
		self.cacheTemplate();
		self.bindEvents();
		
		var params = {};
		params.domain = domain;
		params.user = user;
		params.scenario = scenario;
		
		self.ajaxCall(CONTEXTPATH + "chat/open", params)
		.done(function(ret){
			self.afterGreeting(ret.data);
			self.answer(ret);
		})
		.fail(function(xhr) {
			self.failAnswer(xhr);
		});
	},
	
	afterGreeting : function(data) {
		var self = this;
		
		var config = new Config(data.config);
		
		self.data.domainName = data.config["domain.name"];
		if(DOMAIN_ID != self.data.domainName)
			$("#chat-title").text(self.data.domainName);
		
		self.data.botName = data.config["bot.name"];
		self.data.domainImage = data.config["domain.image"];
		self.data.attachmentPath = data.config["attachment.upload.path"] || CONTEXTPATH; 
		
		self.speech.enableSTT = config.getBoolean("enable.stt", false);
		self.speech.enableTTS = config.getBoolean("enable.tts", false);
		self.opinion.enable = config.getBoolean("enable.opinion", false);
		self.recommend.enable = config.getBoolean("enable.question.recommend", false) ? self.recommend.enable : false;
		
		if(self.speech.enableSTT) {
			if (!('webkitSpeechRecognition' in window)) {
				console.log("webkitSpeechRecognition is not available.");
			}
			else {
				var micIcon = $("<i class='microphone' aria-hidden=true id='message-mic' />").click(function() { speechRecognition.toggle(!$(this).hasClass("active"));	});
				micIcon.insertBefore(self.$textarea);
				speechRecognition = new SpeechRecognition(self.$textarea.attr("placeholder"), MSG_SPEAK_MESSAGE);
			}
		}
		
		if(self.speech.enableTTS) {
			speechSynthesizer = new SpeechSynthesis(DOMAIN_ID, data.config["tts.error"]);
		}
		
		if(self.recommend.enable) self.recommend.init();
		if(self.opinion.enable) opinion.init();
	},
	
	question: function(domain, user) {
		var self = this;
		
		self.$chatHistory.find(".bot .answer").css("pointer-events", "none");
		
		if (self.messageToShow !== "") {
			var context = {
				text: self.messageToShow,
				time: self.getCurrentTime()
			};
			self.$chatHistory.append(self.questionTmpl.render(context) );
		}
		var contextResponse = $.extend({}, self.data, { time: self.getCurrentTime()	} );
		self.$chatHistory.append( $(self.loadingTmpl.render(contextResponse)) );
		
		self.scrollToBottom();
		if (self.messageToSend == undefined || self.messageToSend == "") {
			return;
		}
		var params = {};
		params.domain = domain;
		params.user = user;
		params.text = self.messageToSend;
		
		self.ajaxCall(CONTEXTPATH + "chat/message", params)
		.done(function(ret){
			self.answer(ret);
		})
		.fail(function(xhr) {
			self.failAnswer(xhr);
		})
		.always(function() {
			$("li").remove("#loading");
		});
	},

	answer : function(ret) {
		var dialogPkey = ret.data['dialog.pkey'];
		
		var self = this;
		var payloads = ret.payloads; 
		for(var i in payloads) {
			var payload = payloads[i];
			var contents = payload.contents;
			
			var dialogHtml = $.dialogResponse(contents, self.dialogTmpl);
			var messageData = {
				ttsIcon : (self.speech.enableTTS && $(dialogHtml).find("audio[name='tts']").length>0), 
				body : dialogHtml,
				enableOpinion : self.opinion.enable,
				dialogPkey : dialogPkey,
				time : self.getCurrentTime()
			};
			self._answer(messageData);
		}
	},
	
	failAnswer : function(xhr) {
		console.log(xhr);
		this._answer({body:xhr.responseJSON.message});
	},
	
	_answer : function(appendData) {
		var self = this;
		var renderData = $.extend({}, self.data, appendData);
		var $template = $(self.answerTmpl.render(renderData));
		
		self.$chatHistory.append( $template );
		self.scrollToBottom();
		self.$textarea.focus();
		
		if(typeof speechSynthesizer != 'undefined' && appendData.ttsIcon) {
			speechSynthesizer.matchSource($template);
		}
	},
	
	addMessageEvent: function(event) {
		var self = this;
		if (event.type === "click" || event.keyCode === 13) {
			if(this.recommend.enable) {
				if(this.$textarea.autocomplete("instance").menu.active)
					return false;
				this.$textarea.autocomplete("close");
			}
			self.addMessage();
			return false;
		}
	},
	
	addMessage: function(sendmsg, showmsg) {
		this.messageToSend = sendmsg || this.$textarea.val().trim();
		this.messageToShow = showmsg || this.messageToSend;
		if ($.trim(this.messageToSend) == "") {
			return false;
		}
		this.$textarea.val("");
		this.question(DOMAIN_ID, USER_KEY);
	},
	
	sendRichMessage: function(type, text, value) {
		text = unescape(text);
		value = (value/* && value != "undefined"*/) ? unescape(value) : text;
		
		if(type == "web_url")
			window.open(value.toLowerCase().match(/^https?:/) ? value : '//' + value, '_blank');
		else if(type == "func")
			new Function(value).call();
		else
			this.addMessage(value, text);
	},
	
	scrollToBottom: function() {
		 this.$chatContainer.animate({ scrollTop: this.$chatContainer[0].scrollHeight }, 500);
	},
	getCurrentDateTime : function() {
		return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
	},
	getCurrentTime: function() {
		var time = this.getCurrentDateTime();
		if (time.split(":")[2]) {
			time = time.substring(0, time.length - 4);
		}
		return time; 
	},
	
	speechText : function(obj) {
		if(typeof speechSynthesizer != 'undefined') {
			speechSynthesizer.clickAvata(obj);
		}
	},
	
	recommend : {
		enable : false,
		init : function() {
			var self = chat;
			
			self.$msgContainer.append($("<div />").attr("id", "questions").addClass("questions"));
			self.$textarea.autocomplete({
				appendTo: "#questions",
				//minLength:0,
				source: function(request, response) {
					var msg = request.term.trim();
					if(msg.length > 1) {
						if(/[ㄱ-ㅎ|ㅏ-ㅣ]/.test(msg.charAt(msg.length-1))) {
							return false;
						} else {
							response(self.recommend.list(msg));
						}
					}
				},
				select: function(event, ui) {
					console.log(ui.item.value);
					chat.addMessage(ui.item.value);
					return false;
				},
				focus: function(event, ui) { return false; }
			})
			.data("ui-autocomplete")._renderItem = function(ul, item) {
				item.value = item.value.replace(/<b>|<\/b>/g, "");
				return $("<li><div>"+ item.label+"</div></li>").data("value",item.value).appendTo(ul);
			};
		},
		
		list : function(msg) {
			var self = chat;
			var params = {};
			params.domain = DOMAIN_ID;
			params.question = msg;
			
			//CUSTOM SUGGEST CONFIG OPTION
			$.extend(params, {
				count : 3,
				spellcheck: true
			});
			
			var questions = null;
			self.ajaxCall(CONTEXTPATH + "api/recommend", params)
			.done(function(ret) {
				if(ret.length > 0)
					questions = ret;
			})
			.fail(function(xhr) {
				self.failAnswer(xhr);
			});
			return questions;
		}
	}
	
};

$.views.converters({
	attachmentpath : function(val) {
		if(val) {
			if(val.indexOf('@@') == 0){
				val = "";
			}
			else if(val.indexOf("http") == -1) {
				var idx = val.lastIndexOf("/");
				if(idx > -1) {
					val = val.substring(0, idx+1) + encodeURIComponent(val.substring(idx+1));
				}
				val = chat.data.attachmentPath + "/" + val;
			}	
		}
		return val;
	}
});