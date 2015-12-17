/* Object that takes care of processing commands/searches.
 * Maintains whatever has been entered so far in the command input.
 * When processCommand() is called, the command is parsed and executed,
 * but the internal command state is not cleared in order to allow
 * the 'n'/'@:' key to be pressed to repeat it.
 */
var vim = new function () {
	var input = document.querySelector(".vim input");
  var command = "";
  
  /* focusin on the command input -- the character entered appears
   * since we focusin on keydown events.
   */
  this.initCommand = function () {
    input.focus();
  };
  
  /* clear the command input and defocus it */
  this.end = function () {
  	input.value = "";
  	input.blur();
  };
  
  /* reset the internal command state */
  this.reset = function () {
  	command = "";
    this.end();
  }
  
  /* parse and execute the inputted command */
  this.processCommand = function () {
  	/* extract the actual content of the command */
  	var term = command.substr(1);

  	switch (command[0]) {
    	/* colon command */
    	case ":":
      	// do something here
      	break;
      /* search command */
      case "/":
      	// figure out how this works.
      	window.find(term);
        break;
    }
    this.end();
  };
  
  /* listen for keydowns on the input.
   * When enter is pressed, process the command
   */
  input.addEventListener("keydown", function (e) {
  	command = input.value;
    if (e.keyCode == 13) this.processCommand();
  }.bind(this), true);
}();

/* Listen for key events on the window.
 * Process them and perform actions according to Vim key bindings
 */
window.addEventListener("keydown", function (e) {
	var k = e.keyCode;
  if (e.shiftKey) {
  	switch (k) {
    	/* 'G' - Scroll to bottom of the page */
    	case 71:
      	window.scrollTo(0, document.body.scrollHeight);
        break;
      /* ':' - initiate command entry */
      case 186:
      	vim.initCommand();
        break;
    }
  } else {
  	switch (k) {
    	/* '/' - initiate search command entry */
    	case 191:
      	vim.initCommand();
    }
  }
}, true);