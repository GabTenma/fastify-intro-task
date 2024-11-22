import { generateToken, buildIdGenerator } from "../utils.js";

export default (app) => {
  const users = [];

  const generateId = buildIdGenerator();

  app.get("/users/new", (req, res) => res.view("src/views/users/new"));

  // BEGIN (write your solution here)
  app.post("/users", (req, res) => {
    const { firstName, lastName, email } = req.body;
    const id = generateId();
    const token = generateToken();
    users.push({ id, firstName, lastName, email, token });

    res.setCookie("token", token);
    res.redirect(`/users/${id}`);
  });

  app.get("/users/:id", (req, res) => {
    const userToken = req.cookies.token;
    const userId = req.params.id;
    const user = users.find(({id, token}) => id === userId && token === userToken);
      
    if (!user) {
      return res.status(404).send("User not found");
    }
    else {
      return res.view("src/views/users/show", {user});
    }
  });
  // END
};
