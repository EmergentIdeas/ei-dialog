// let tri = require('tripartite').createBlank()
// let templates = require('./dialog.tmpl')
// tri.parseTemplateScript(templates)

// templates = tri.templates

let dialogStyles = require('./dialog-styles.txt')


/**
 * A button definition.
 * @typedef {Object} Button
 * @property {string} classes Classes to add to the button
 * @property {string} label Text shown to the user
 */



/**
 * A whole page dialog. 
 * @param {object} options 
 * @param {string,function} options.body The contents of the body section. This can be a string,
 * in which case it will just be inserted into the body. It can be a function, in which case
 * it is expected to return a string (which will be inserted) or a Promise, which should resolve to
 * a string, which will be inserted. However, this function is passed the body element and dialog
 * object as arguments, so it can also modify content directory and return an empty string.
 * @param {object} options.on An object which the key is the selector and the value is a funtion
 * which is called when the object with that selector is clicked. If the function returns false the
 * dialog will not be closed. If it returns a Promise, the promise will be resolved and if the resolved
 * value is false, it will not be closed. Any other return condition will result in the dialog being
 * closed.
 * @param {Button[]} options.buttons The buttons that will show up in the footer of the dialog. If buttons are not
 * specified, "OK" and "Cancel" buttons will be added.
 * @param {string} options.title The title of the dialog
 * @param {string} options.dialogFrameClass An additional string inserted into the class attribute for
 * specific styling of specific types of dialog boxes.
 */
var Dialog = function(options) {
	this.id = "dialog" + (new Date().getTime())
	Object.assign(this, options)
	if(!this.on) {
		this.on = {}
	}
	if(!this.on['.btn-cancel']) {
		this.on['.btn-cancel'] = function() {
		}
	}
	if(!this.on['.btn-close']) {
		this.on['.btn-close'] = function() {
		}
	}
	
	if(!options.buttons) {
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
	
	this.body = options.body
}

Dialog.prototype.getBodySelector = function() {
	return '#' + this.id + ' .body'
}

Dialog.prototype.getFrameSelector = function() {
	return '#' + this.id 
}

Dialog.prototype.addStylesIfNeeded = function() {
	if(!document.querySelector('#dialog-frame-styles')) {
		document.querySelector('head').insertAdjacentHTML('beforeend', 
			'<style type="text/css" id="dialog-frame-styles">' +
			dialogStyles + 
			'</style>')
	}
}

Dialog.prototype.generateFrame = function() {
	let buttons = ''
	for(let button of this.buttons) {
		buttons += `<button class="${button.classes}" type="button">${button.label}</button>`

	}
	
	return `
<div class="dialog-frame ${this.dialogFrameClass}" id="${this.id}" >
	<div class="mask">&nbsp;</div>
	<div class="dialog-holder">
		<div class="the-dialog">
			<div class="close btn-close">&times;</div>
			<div class="head">
				${this.title}
			</div>
			<div class="body">
			</div>
			<div class="foot">
				${buttons}
			</div>
		</div>
	</div>
</div>
	`
}

Dialog.prototype.open = function() {
	let self = this
	this.addStylesIfNeeded()
	document.querySelector('body').insertAdjacentHTML('beforeend', this.generateFrame())
	
	let bodySelector = this.getBodySelector()
	let frameSelector = this.getFrameSelector()
	
	let bodyContent
	let bodyElement = document.querySelector(bodySelector)
	let frameElement = document.querySelector(frameSelector)

	
	
	frameElement.addEventListener('click', function(evt) {
		for(let selector in self.on) {
			let target = frameElement.querySelector(selector)
			if(evt.target == target) {
				let result = self.on[selector]()
				if(typeof result === 'boolean') {
					if(result) {
						self.close()
					}
				}
				else if(typeof Promise === 'function' && result instanceof Promise) {
					result.then(function(result) {
						if(result !== false) {
							self.close()
						}
					})
				}
				else {
					self.close()
				}
				
				break
			}
		}
	})
	
	function afterOpenResizeSetup() {
		setTimeout(function() {
			let head = document.querySelector(frameSelector + ' .head').clientHeight 
			let foot = document.querySelector(frameSelector + ' .foot').clientHeight
			let topAndBottom = head + foot

			bodyElement.style.maxHeight = 'calc(90vh - ' + topAndBottom + 'px)'
			frameElement.classList.add('open')
		})
	}
	
	if(typeof this.body === 'function') {
		bodyContent = this.body(bodyElement, this)
	}
	else if(typeof this.body == 'string') {
		bodyContent = this.body
	}

	if(typeof bodyContent === 'string') {
		bodyElement.insertAdjacentHTML('beforeend', bodyContent)
		afterOpenResizeSetup()
	}
	else if(typeof Promise === 'function' && bodyContent instanceof Promise) {
		bodyContent.then(function(content) {
			bodyElement.insertAdjacentHTML('beforeend', content)
			afterOpenResizeSetup()
		})
	}
	

	return this
}

Dialog.prototype.close = function() {
	let frame = document.querySelector(this.getFrameSelector())
	frame.remove()
	return this
}

module.exports = Dialog

