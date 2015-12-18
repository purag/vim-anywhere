/* Object that takes care of processing commands/searches.
 * Maintains whatever has been entered so far in the command input.
 * When processCommand() is called, the command is parsed and executed,
 * but the internal command state is not cleared in order to allow
 * the 'n'/'@:' key to be pressed to repeat it.
 */
var vim = new function () {
  var input = document.querySelector(".vim input");
  var command = "";
  var last = 0;

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
  this.processCommand = function (c) {
    /* extract the actual content of the command */
    var term = command.substr(1);
    var resetLast = true;

    switch (c ? c : command[0]) {
      /* colon command */
      case ":":
        // do something here
        break;
        
      /* search command */
      case "/":
        // figure out how this works.
        window.find(term);
        break;
        
      /* 'G' - scroll to the bottom of the page */
      case "G":
        window.scrollTo(0, document.body.scrollHeight);
        break;
        
      /* 'gg' - scroll to the top of the page */
      case "g":
        if (last == 71) {
          window.scrollTo(0, 0);
        } else {
          last = 71;
          resetLast = false;
        }
        break;
    }
    
    if (resetLast) last = 0;
    
    this.end();
  };

  /* listen for keydowns on the input.
   * When enter is pressed, process the command
   */
  input.addEventListener("keydown", function(e) {
    e.stopPropagation();
    command = input.value;
    if (e.keyCode == 13) this.processCommand();
  }.bind(this));
}();

/* Listen for key events on the window.
 * Process them and perform actions according to Vim key bindings
 */
window.addEventListener("keydown", function (e) {
  var k = e.keyCode;
  if (e.shiftKey) {
    /* ':' - initiate command entry */
    if (k == 186) {
      vim.initCommand();
    } else {
      vim.processCommand(String.fromCharCode(k));
    }
  } else {
    /* '/' - initiate search command entry */
    if (k == 191) {
      vim.initCommand();
    } else {
      vim.processCommand(String.fromCharCode(k).toLowerCase());
    }
  }
});
