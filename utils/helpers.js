const changeKeyName = (arr, oldKey, newKey) => {
  arr.forEach((obj) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  });
  return arr;
};

const parseMindmapBeforeRender = (mindmap, author) => {
  const newMindmap = mindmap.get({ plain: true });

  newMindmap.meta = {
    name: newMindmap.name,
    author: author || 'anonymous',
    version: '1.0',
  };
  newMindmap.format = 'node_array';

  // Change the key name of the array of objects
  const newNodes = changeKeyName(newMindmap.nodes, 'node_id', 'id');
  newMindmap.nodes = newNodes;

  // Change the key name of the object and delete the old key
  newMindmap.data = newMindmap.nodes;
  delete newMindmap.nodes;

  return newMindmap;
};

const parseMindmapNodesBeforeSave = (mindmap, mindmapId, lastNodeId) => {
  const _node = changeKeyName(mindmap, 'id', 'node_id');
  const newMindmapNode = _node.map((node) => {
    const newNode = node;
    newNode.mindmap_id = mindmapId;
    if (newNode.node_id === 'root') {
      newNode.node_id += lastNodeId;
    }

    if (newNode.parentid === 'root') {
      newNode.parentid += lastNodeId;
    }

    return newNode;
  });

  return newMindmapNode;
};

module.exports = {
  changeKeyName,
  parseMindmapBeforeRender,
  parseMindmapNodesBeforeSave,
};
