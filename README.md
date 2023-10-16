# EI Dialog

A pretty simple dialog which accepts arbitrary content and buttons. Is able able
to be used for stacked dialogs.

## Install

```
npm install ei-dialog
```


## Usage 

```
const Dialog = require('ei-dialog')

let diag = new Dialog({
	title: 'My Dialog Title',
	body: '<p>This is my dialog content.</p>',
	on: {
		'.btn-ok': function() {
			console.log('okay')
			if(/* some condition */) {
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
```

In the above code, a new dialog is created and then opened. Standard dialogs have three buttons:

- an 'x' in the upper right
- an 'OK' button
- a 'Cancel' button

The 'x' has the class '.btn-close' and 'cancel' has the class `.btn-cancel`. These handlers are
added automatically if not specified. However, the 'OK' button handler is NOT added automatically.
You don't have to add an 'OK' handler, but the dialog won't close when 'OK' is clicked unless you do.

This dialog has a handler for the "OK" button which checks some condition in the dialog, if that
condition is unacceptable, returns false to keep the dialog from closing. It has a handler for
"Cancel" which just logs that dialog is cancelled and closed. It also has a handler for the `.mask`
space (the outside the dialog space), which closes the dialog (which is not the standard behavior).




## Examples

The usage example from above.

[Usage Example](./test/usage-example.html)

[Usage Example Source](./test/usage-example.js)


## Options 

```js
/**
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
 * @param {function} options.afterOpen A function which is called after open with the body element and dialog object
 * as arguments.
 */

```
