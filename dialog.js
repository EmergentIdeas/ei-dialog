var $ = require('jquery')

var tri = require('tripartite').createBlank()
var templates = require('./dialog.tmpl')
tri.parseTemplateScript(templates)

templates = tri.templates

var addTemplatesIfNeeded = function() {
	if($('#dialog-frame-styles').length == 0) {
		$('head').append('<style type="text/css" id="dialog-frame-styles">' +
		templates['dialogFrameStyles']() +
		'</style>')
	}
}

var Dialog = function(options) {
	options = options || {}
	options.on = options.on || {}
	this.title = options.title
	
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
		var self = this
		this.on['.btn-cancel'] = function() {
			self.close()
		}
	}
	this.body = options.body
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

Dialog.prototype.open = function() {
	addTemplatesIfNeeded()
	$('body').append(templates['dialogFrame'](this))
	
	if(typeof this.body == 'function') {
		$('.dialog-frame .body').append(this.body())
	}
	else if(typeof this.body == 'string') {
		$('.dialog-frame .body').append(this.body)
	}
	
	for(var selector in this.on) {
		$('.dialog-frame').on('click', selector, createButtonHandler(selector, this))
	}
	
	setTimeout(function() {
		var top = ($(window).height() - $('.the-dialog').height()) / 2
		var left = ($(window).width() - $('.the-dialog').width()) / 2
		$('.the-dialog').css({
			top: top + 'px',
			left: left + 'px'
		})
		$('.dialog-frame').addClass('open')
	})
	return this
}

Dialog.prototype.close = function() {
	$('.dialog-frame').remove()
	return this
}

module.exports = Dialog

