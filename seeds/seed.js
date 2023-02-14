const Mindmap = require('../models/Mindmap');
const Node = require('../models/Node');

const seedData = async () => {
  const mindmap = await Mindmap.create({ name: 'Mindmap 1' });

  const rootNode = await Node.create({
    id: 0,
    topic: 'Root Node',
    isroot: true,
    direction: 'center',
    expanded: true,
    data: { color: 'red' },
    MindmapId: mindmap.id
  });

  const node1 = await Node.create({
    id: 1,
    topic: 'Node 1',
    isroot: false,
    direction: 'left',
    expanded: false,
    data: { color: 'blue' },
    parentId: rootNode.id,
    MindmapId: mindmap.id
  });

  const node2 = await Node.create({
    id: 2,
    topic: 'Node 2',
    isroot: false,
    direction: 'right',
    expanded: false,
    data: { color: 'green' },
    parentId: rootNode.id,
    MindmapId: mindmap.id
  });

  const node3 = await Node.create({
    id: 3,
    topic: 'Node 3',
    isroot: false,
    direction: 'left',
    expanded: false,
    data: { color: 'yellow' },
    parentId: node1.id,
    MindmapId: mindmap.id
  });

  const node4 = await Node.create({
    id: 4,
    topic: 'Node 4',
    isroot: false,
    direction: 'right',
    expanded: false,
    data: { color: 'purple' },
    parentId: node2.id,
    MindmapId: mindmap.id
  });
};

seedData();
