const Dialog = require('../dialog')

let diag = new Dialog({
	title: 'My Title',
	body: 'The body <button class="other-close">other close</button>',
	on: {
		'.btn-ok': function() {
			console.log('okay')
		},
		'.mask': function() {
			console.log('mask')
			return true
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