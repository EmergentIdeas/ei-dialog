const Dialog = require('../dialog')

let diag2 = new Dialog({
	title: 'Second Dialog',
	body: '<p>This is my second dialog.</p>',
	on: {
		'.btn-ok': function() {
			return true
		},
		'.mask': function() {
			console.log('mask')
			return true
		}
	}
})
let diag1 = new Dialog({
	title: 'First Dialog',
	body: '<p>This is my first dialog.</p>',
	on: {
		'.btn-ok': function() {
			return true
		},
		'.mask': function() {
			console.log('mask')
			return true
		}
	}
	, afterOpen: function() {
		diag2.open()
	}
})

diag1.open()