const express = require('express');
const { Mindmap, Node } = require('../../models');
const {
  changeKeyName,
  parseMindmapBeforeRender,
  parseMindmapNodesBeforeSave,
} = require('../../utils/helpers');

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

    if (mindmap) {
      const newMindmap = parseMindmapBeforeRender(
        mindmap,
        req.session.username || 'anonymous'
      );

      res.status(200).json(newMindmap);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST a new mindmap with related nodes
mindmapRoutes.post('/save', async (req, res) => {
  try {
    console.log('req.body: ', req.body);

    if (req.body.data) {
      const mindmap = await Mindmap.create({
        name: req.body.name,
        project_id: req.body.project_id,
      });

      const lastNodeId = (await Node.max('id')) || 0;

      const newMindmapNodes = parseMindmapNodesBeforeSave(
        req.body.data,
        mindmap.id,
        lastNodeId
      );

      const newNodes = await Node.bulkCreate(newMindmapNodes);

      res.status(200).json({ mindmap });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT update a mindmap with related nodes
mindmapRoutes.put('/update', async (req, res) => {
  try {
    if (req.body.data) {
      const mindmap = await Mindmap.update(
        {
          name: req.body.name,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );

      const newMindmapNodes = parseMindmapNodesBeforeSave(
        req.body.data,
        req.body.id,
        0
      );

      const newNodes = await Node.bulkCreate(newMindmapNodes, {
        updateOnDuplicate: [
          'node_id',
          'topic',
          'isroot',
          'direction',
          'expanded',
          'data',
          'parentid',
          'mindmap_id',
        ],
      });

      if (req.body.delete_nodes) {
        // Destroy the nodes by list of node_id
        const destroyNodes = await Node.destroy({
          where: {
            node_id: req.body.delete_nodes,
          },
        });
      }

      res.status(200).json({ mindmap });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = mindmapRoutes;
