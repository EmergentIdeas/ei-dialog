var $ = window.jQuery

var tri = require('tripartite').createBlank()
var templates = require('./dialog.tmpl')
tri.parseTemplateScript(templates)

templates = tri.templates

var addStylesIfNeeded = function() {
	if($('#dialog-frame-styles').length == 0) {
		$('head').append('<style type="text/css" id="dialog-frame-styles">' +
		templates['dialogFrameStyles']() +
		'</style>')
	}
}

var createButtonHandler = function(selector, dialog) {
	return function() {
		var result = dialog.on[selector]()
		if(typeof result == 'boolean') {
			if(result) {
				dialog.close()
			}
		}
		else {
			dialog.close()
		}
	}
}

var Dialog = function(options) {
	options = options || {}
	options.on = options.on || {}
	this.title = options.title
	this.dialogFrameClass = options.dialogFrameClass
	
	if(options.buttons) {
		this.buttons = options.buttons
	}
	else {
		this.buttons = [
			{
				classes: 'btn btn-primary btn-ok',
				label: 'OK'
			},
			{
				classes: 'btn btn-cancel',
				label: 'Cancel'
			}
		]
	}
	this.on = options.on
	
	if(!this.on['.btn-cancel']) {
		this.on['.btn-cancel'] = function() {
		}
	}
	if(!this.on['.btn-close']) {
		this.on['.btn-close'] = function() {
		}
	}
	this.body = options.body
}

Dialog.prototype.getBodySelector = function() {
	return '#' + this.id + ' .body'
}

Dialog.prototype.getFrameSelector = function() {
	return '#' + this.id 
}

Dialog.prototype.open = function() {
	this.id = "dialog" + (new Date().getTime())
	addStylesIfNeeded()
	$('body').append(templates['dialogFrame'](this))
	
	let bodySelector = this.getBodySelector()
	let frameSelector = this.getFrameSelector()
	
	if(typeof this.body == 'function') {
		$(bodySelector).append(this.body($(bodySelector).get(0)))
	}
	else if(typeof this.body == 'string') {
		$(bodySelector).append(this.body)
	}
	
	for(var selector in this.on) {
		$(frameSelector).on('click', selector, createButtonHandler(selector, this))
	}
	
	setTimeout(function() {
		var head = $(frameSelector + ' .head').outerHeight()
		var foot = $(frameSelector + ' .foot').outerHeight()
		var topAndBottom = head + foot
		$(bodySelector).css('max-height', 'calc(90vh - ' + topAndBottom + 'px)')
		$(frameSelector).addClass('open')
	})
	return this
}

Dialog.prototype.close = function() {
	$(this.getFrameSelector()).remove()
	return this
}

module.exports = Dialog

