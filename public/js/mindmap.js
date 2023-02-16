let _jm = null;

// Create a variable to hold the mindmap data from the database
let _mindmap = null;

$(document).ready(() => {
  $('#basic-collapse').on('show.bs.collapse', (e) => {
    $(e.target).prev('.collapse-header').find('.fas').addClass('open');
  });

  $('#basic-collapse').on('hide.bs.collapse', (e) => {
    $(e.target).prev('.collapse-header').find('.fas').removeClass('open');
  });

  $('#styling-collapse').on('show.bs.collapse', (e) => {
    $(e.target).prev('.collapse-header').find('.fas').addClass('open');
  });

  $('#styling-collapse').on('hide.bs.collapse', (e) => {
    $(e.target).prev('.collapse-header').find('.fas').removeClass('open');
  });

  $('#advanced-collapse').on('show.bs.collapse', (e) => {
    $(e.target).prev('.collapse-header').find('.fas').addClass('open');
  });

  $('#advanced-collapse').on('hide.bs.collapse', (e) => {
    $(e.target).prev('.collapse-header').find('.fas').removeClass('open');
  });
});

const options = {
  container: 'mindmap-container',
  theme: 'greensea',
  editable: true,
  view: {
    engine: 'svg',
    draggable: true,
  },
};

// Default mindmap data

function open_empty() {
  console.log('open_empty');
  const defaultMindmap = {
    meta: {
      name: 'Empty node',
      author: '',
      version: '1.0',
    },
    format: 'node_array',
    data: [
      {
        id: 'root',
        topic: 'Empty node',
        direction: null,
        expanded: true,
        isroot: true,
      },
    ],
  };
  _jm = jsMind.show(options, defaultMindmap);
}

function create_mindmap() {
  const mindmap = _jm.get_data('node_array');
  fetch('/api/mindmap/save', {
    method: 'POST',
    body: JSON.stringify(mindmap),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      alert('Failed to save mindmap');
    })
    .then((data) => {
      console.log(data);
      alert('Mindmap saved successfully');
    })
    .catch((err) => {
      console.log(err);
    });
}

// Render mindmap by route id
function render_mindmap() {
  const mindmapId = document.querySelector('#mindmap-id').value;

  if (mindmapId) {
    fetch(`/api/mindmap/${mindmapId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        alert('Failed to render mindmap');
      })
      .then((data) => {
        console.log(data);
        _jm = jsMind.show(options, data);
        // Pass mindmap name to the input field
        _mindmap = _jm.get_data('node_array');
        document.querySelector('#mindmap-name').value = data.name;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function update_mindmap(id) {
  const mindmap = _jm.get_data('node_array');

  mindmap.id = id;
  mindmap.name = document.querySelector('#mindmap-name').value;

  console.log('old_mind_map', _mindmap);
  console.log('new_mind_map', mindmap);

  const deletedNodes = [];

  if (_mindmap.data.length > mindmap.data.length) {
    _mindmap.data.forEach((node) => {
      // Get all the nodes that are not in the new mindmap
      if (!mindmap.data.find((n) => n.id === node.id)) {
        deletedNodes.push(node.id);
      }
    });
  }

  mindmap.delete_nodes = deletedNodes;

  console.log('mindmap', mindmap);

  // return;

  fetch('/api/mindmap/update', {
    method: 'PUT',
    body: JSON.stringify(mindmap),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      alert('Failed to update mindmap');
    })
    .then((data) => {
      console.log(data);
      alert('Mindmap updated successfully');
    })
    .catch((err) => {
      console.log(err);
    });
}

function open_ajax() {
  var mind_url = 'data_example.json';
  jsMind.util.ajax.get(mind_url, function (mind) {
    _jm.show(mind);
  });
}

function show_data() {
  var mind_data = _jm.get_data();
  var mind_string = jsMind.util.json.json2string(mind_data);
  prompt_info(mind_string);
}

function save_file() {
  var mind_data = _jm.get_data();
  var mind_name = mind_data.meta.name;
  var mind_str = jsMind.util.json.json2string(mind_data);
  jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.jm');
}

function open_file() {
  var file_input = document.getElementById('file_input');
  var files = file_input.files;
  if (files.length > 0) {
    var file_data = files[0];
    jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
      var mind = jsMind.util.json.string2json(jsmind_data);
      if (!!mind) {
        _jm.show(mind);
      } else {
        prompt_info('can not open this file as mindmap');
      }
    });
  } else {
    prompt_info('please choose a file first');
  }
}

function select_node() {
  var nodeid = 'other';
  _jm.select_node(nodeid);
}

function show_selected() {
  var selected_node = _jm.get_selected_node();
  if (!!selected_node) {
    prompt_info(selected_node.topic);
  } else {
    prompt_info('nothing');
  }
}

function get_selected_nodeid() {
  var selected_node = _jm.get_selected_node();
  if (!!selected_node) {
    return selected_node.id;
  } else {
    return null;
  }
}

function add_node() {
  var selected_node = _jm.get_selected_node(); // as parent of new node
  if (!selected_node) {
    prompt_info('please select a node first.');
    return;
  }

  var nodeid = jsMind.util.uuid.newid();
  var topic = '* Node_' + nodeid.substr(nodeid.length - 6) + ' *';
  var node = _jm.add_node(selected_node, nodeid, topic);
}

function remove_node() {
  var selected_id = get_selected_nodeid();
  if (!selected_id) {
    prompt_info('please select a node first.');
    return;
  }

  if (selected_id == 'root') {
    prompt_info('can not remove root node.');
    return;
  }

  _jm.remove_node(selected_id);
}

function set_theme(theme_name) {
  _jm.set_theme(theme_name);
}

var zoomInButton = document.querySelector('#zoom-in-button');
var zoomOutButton = document.querySelector('#zoom-out-button');

function zoom_in() {
  if (_jm.view.zoomIn()) {
    zoomOutButton.disabled = false;
  } else {
    zoomInButton.disabled = true;
  }
}

function zoom_out() {
  if (_jm.view.zoomOut()) {
    zoomInButton.disabled = false;
  } else {
    zoomOutButton.disabled = true;
  }
}

function toggle_editable(btn) {
  var editable = _jm.get_editable();
  if (editable) {
    _jm.disable_edit();
    btn.innerHTML = 'enable editable';
  } else {
    _jm.enable_edit();
    btn.innerHTML = 'disable editable';
  }
}

function expand() {
  var selected_id = get_selected_nodeid();
  if (!selected_id) {
    prompt_info('please select a node first.');
    return;
  }

  _jm.expand_node(selected_id);
}

function collapse() {
  var selected_id = get_selected_nodeid();
  if (!selected_id) {
    prompt_info('please select a node first.');
    return;
  }

  _jm.collapse_node(selected_id);
}

function toggle() {
  var selected_id = get_selected_nodeid();
  if (!selected_id) {
    prompt_info('please select a node first.');
    return;
  }

  _jm.toggle_node(selected_id);
}

function expand_all() {
  _jm.expand_all();
}

function collapse_all() {
  _jm.collapse_all();
}

function get_nodearray_data() {
  var mind_data = _jm.get_data('node_array');
  var mind_string = jsMind.util.json.json2string(mind_data);
  prompt_info(mind_string);
}

function save_nodearray_file() {
  var mind_data = _jm.get_data('node_array');
  var mind_name = mind_data.meta.name;
  var mind_str = jsMind.util.json.json2string(mind_data);
  jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.jm');
}

function open_nodearray() {
  var file_input = document.getElementById('file_input_nodearray');
  var files = file_input.files;
  if (files.length > 0) {
    var file_data = files[0];
    jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
      var mind = jsMind.util.json.string2json(jsmind_data);
      if (!!mind) {
        _jm.show(mind);
      } else {
        prompt_info('can not open this file as mindmap');
      }
    });
  } else {
    prompt_info('please choose a file first');
  }
}

function prompt_info(msg) {
  alert(msg);
}

render_mindmap();
