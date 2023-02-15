const express = require('express');
const { Mindmap, Node } = require('../../models');

const mindmapRoutes = express.Router();

// GET all mindmaps and related nodes of the mindmap
mindmapRoutes.get('/', async (req, res) => {
  try {
    const mindmaps = await Mindmap.findAll({
      include: [
        {
          model: Node,
          attributes: [
            'id',
            'node_id',
            'topic',
            'isroot',
            'direction',
            'expanded',
            'data',
            'parentid',
            'mindmap_id',
          ],
          as: 'nodes',
        },
      ],
    });
    res.status(200).json(mindmaps);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single mindmap and related nodes of the mindmap
mindmapRoutes.get('/:id', async (req, res) => {
  try {
    const mindmap = await Mindmap.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Node,
          attributes: [
            'id',
            'node_id',
            'topic',
            'isroot',
            'direction',
            'expanded',
            'data',
            'parentid',
            'mindmap_id',
          ],
          as: 'nodes',
          where: {
            mindmap_id: req.params.id,
          },
        },
      ],
    });
    res.status(200).json(mindmap);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

const data = [
  {
    id: 'root',
    topic: 'jsMind Example',
    expanded: true,
    isroot: true,
  },
  {
    id: '650ae4978256841f',
    topic: '* Node_56841f *',
    expanded: true,
    parentid: 'root',
    direction: 'right',
  },
  {
    id: '650ae55ad598cc64',
    topic: '* Node_98cc64 *',
    expanded: true,
    parentid: '650ae4978256841f',
  },
  {
    id: '650ae4f7058953f8',
    topic: '* Node_8953f8 *',
    expanded: true,
    parentid: 'root',
    direction: 'right',
  },
];

// function to change the key name of an array of objects
function changeKeyName(arr, oldKey, newKey) {
  arr.forEach((obj) => {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  });
  return arr;
}

// change the key name of the array of objects
const newData = changeKeyName(data, 'id', 'node_id');

// POST a new mindmap with related nodes
mindmapRoutes.post('/', async (req, res) => {
  try {
    console.log('newData: ', newData);

    console.log('req.body: ', req.body);

    const newMindmap = await Mindmap.create({
      name: req.body.name,
      project_id: req.body.project_id,
    });

    console.log('newMindmap: ', newMindmap);

    // Get the last id of the node, if none, set to 0
    const lastId = (await Node.max('id')) || 0;

    const data = newData.map((node) => {
      const newNode = node;
      newNode.mindmap_id = newMindmap.id;
      if (newNode.node_id === 'root') {
        newNode.node_id += lastId;
      }

      if (newNode.parentid === 'root') {
        newNode.parentid += lastId;
      }

      return newNode;
    });

    console.log('data: ', data);

    const newNodes = await Node.bulkCreate(data);

    console.log('newNodes: ', newNodes);

    res.status(200).json({ newMindmap });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = mindmapRoutes;
