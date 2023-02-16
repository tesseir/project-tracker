const sequelize = require('../config/connection');
const { User, Project, Mindmap, Node } = require('../models');

const userData = [
  {
    username: 'john',
    password: 'password123',
    projects: [
      {
        name: 'Project 1',
        mindmaps: [
          {
            name: 'Mindmap 1',
            nodes: [
              {
                node_id: '1',
                topic: 'Topic 1',
                isroot: true,
                direction: 'center',
                expanded: true,
                data: {
                  someKey: 'some value',
                },
                children: [
                  {
                    node_id: '2',
                    topic: 'Topic 2',
                    isroot: false,
                    direction: 'left',
                    expanded: true,
                    data: {
                      someKey: 'some value',
                    },
                  },
                  {
                    node_id: '3',
                    topic: 'Topic 3',
                    isroot: false,
                    direction: 'right',
                    expanded: true,
                    data: {
                      someKey: 'some value',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Promise.all(
    userData.map(async (user) => {
      const { projects, ...userWithoutProjects } = user;
      const newUser = await User.create(userWithoutProjects);

      await Promise.all(
        projects.map(async (project) => {
          const { mindmaps, ...projectWithoutMindmaps } = project;
          const newProject = await newUser.createProject(projectWithoutMindmaps);

          await Promise.all(
            mindmaps.map(async (mindmap) => {
              const { nodes, ...mindmapWithoutNodes } = mindmap;
              const newMindmap = await newProject.createMindmap(mindmapWithoutNodes);

              await Promise.all(
                nodes.map(async (node) => {
                  const { children, ...nodeWithoutChildren } = node;
                  const newNode = await newMindmap.createNode(nodeWithoutChildren);

                  await Promise.all(
                    children.map(async (child) => {
                      await newNode.createChild(child);
                    })
                  );
                })
              );
            })
          );
        })
      );
    })
  );

  console.log('Database seeded!');
};

seedDatabase();
