const Dialog = require('../dialog')

let diag = new Dialog({
	title: 'My Dialog Title',
	body: '<p>This is my dialog content.</p>',
	on: {
		'.btn-ok': function() {
			console.log('okay')
			if(false) {
				return false
			}
			return true
		},
		'.mask': function() {
			console.log('mask')
			return true
		},
		'.btn-cancel': function() {
			console.log('cancel')
		}
	}
})

diag.open()