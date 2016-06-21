var $ = require('jquery')
var Dialog = require('../dialog')
var declaration = require('./declaration-of-independence.txt')

var diag = new Dialog({
	title: 'A Very Tall and Wide Dialog',
	body: declaration
})

diag.open()

$(function() {
	$('.open-dialog').click(function() {
		diag.open()
	})
})