var $ = require('jquery')
var Dialog = require('../dialog')

var diag = new Dialog({
	title: 'My Title',
	body: function() { return 'The body <button class="other-close">other close</button>'},
	on: {
		'.btn-ok': function() {
			console.log('okay')
		},
		'.other-close': function() {
			console.log('other-close')
			return true
		},
		'.btn-cancel': function() {
			console.log('cancel')
			return false
		}
	}
})

diag.open()

$(function() {
	$('.open-dialog').click(function() {
		diag.open()
	})
})