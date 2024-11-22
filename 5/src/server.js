import fastify from "fastify";
import view from "@fastify/view";
import pug from "pug";
import getUsers from "./utils.js";

export default async () => {
  const app = fastify();

  const users = getUsers();

  // BEGIN (write your solution here)
  app.register(view, { engine : { pug } });

  app.get('/users', (req, res) => {
    res.send(users);
  });

  app.get('/users/:id', (req, res) => {
    const userid = req.params.id;
    const user = users.find((user) => user.id === userid);
    if (!user) {
      res.code(404).send('User not found');
    } 
    else {
      res.send(user);
    }
  })
  // END

  return app;
};
