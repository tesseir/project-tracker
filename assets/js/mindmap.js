const jsMind = require('jsmind');

let _jm = null;

function open_empty() {
  var options = {
    container: 'mindmap-container',
    theme: 'greensea',
    editable: true,
    view: {
      engine: 'svg',
      draggable: true,
    },
  };
  _jm = jsMind.show(options);
}
