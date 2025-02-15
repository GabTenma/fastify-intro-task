import fastify from "fastify";
import getCompanies from "./utils.js";

export default () => {
  const app = fastify();

  const companies = getCompanies();

  // BEGIN (write your solution here)
  app.get('/companies/:id', (req, res) => {
    const lethalcompanyid = req.params.id;
    const company = companies.find(company => company.id === lethalcompanyid);

    if (company) {
      res.send(company);
    } 
    else {
      res.status(404).send('Company not found');
    }
  });
  // END

  return app;
};
