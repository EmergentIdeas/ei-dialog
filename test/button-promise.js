const Dialog = require('../dialog')

let diag = new Dialog({
	title: 'Button Promise Test',
	body: '<p>This is my dialog content.</p>',
	on: {
		'.btn-ok': async function() {
			return true
		},
		'.mask': function() {
			console.log('mask')
			return true
		},
		'.btn-cancel': async function() {
			return false
		}
	}
})

diag.open()