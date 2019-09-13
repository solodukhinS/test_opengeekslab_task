const connection = require('./../../../connectors');
const recipeValidation = require('./validation');
const service = require('./service');

module.exports = {
  create: async (req, res) => {
    try {
      const { error } = recipeValidation(req.body);

      if (error) return res.status(400).send(error.details[0].message);

      const { name, text, id_category } = req.body;

      const [data] = await connection.promise().query(
        `
          INSERT INTO recipes (name, text, id_category) VALUES (?,?,?)
        `,
        [name, text, id_category]
      );
      res.send({
        id: data.indertId,
        name,
        text,
        id_category,
      });
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  getById: async (req, res) => {
    try {
      const [[data]] = await connection.promise().query(
        `
        SELECT * from recipes WHERE id=?
      `,
        [req.params.id]
      );
      res.send(data);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const [[data]] = await connection.promise().query(
        `
        SELECT * from recipes WHERE id=?
      `,
        [req.params.id]
      );
      const category = await service.getCategoryParent(data.id_category);
      res.send(category);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  update: async (req, res) => {
    try {
      const { error } = recipeValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const { name, text, id_category } = req.body;

      const [data] = await connection.promise().query(
        `
          UPDATE recipes SET name=?, text=?, id_category=? WHERE id=?
        `,
        [name, text, id_category, req.params.id]
      );
      res.send(data);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  delete: async (req, res) => {
    try {
      const [data] = await connection.promise().query(
        `
          DELETE FROM recipes WHERE id=?
        `,
        [req.params.id]
      );
      res.send(data);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
};
