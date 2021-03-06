const connection = require('./../../../connectors');
const articleValidation = require('./validation');
const service = require('./service');

module.exports = {
  create: async (req, res) => {
    try {
      const { error } = articleValidation(req.body);

      if (error) return res.status(400).send(error.details[0].message);

      const { name, description, text, id_category } = req.body;

      const [data] = await connection.promise().query(
        `
          INSERT INTO articles (name, description, text, id_category) VALUES (?,?,?,?)
        `,
        [name, description, text, id_category]
      );
      res.send({
        id: data.indertId,
        name,
        description,
        text,
        id_category,
      });
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  getAll: async (req, res) => {
    const limit = req.query.limit ? +req.query.limit : 20;
    const offset = req.query.offset ? +req.query.offset : 0;
    try {
      const [data] = await connection.promise().query(
        `
        SELECT * FROM articles LIMIT ?,?
      `,
        [offset, limit]
      );
      res.send(data);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },

  getById: async (req, res) => {
    try {
      const [[data]] = await connection.promise().query(
        `
        SELECT * FROM articles WHERE id=?
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
        SELECT * from articles WHERE id=?
      `,
        [req.params.id]
      );
      if (data !== undefined) {
        data.categoriesTree = await service.getCategoryParent(data.id_category);
      }
      res.send(data);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  update: async (req, res) => {
    try {
      const { error } = articleValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const { name, description, text, id_category } = req.body;

      await connection.promise().query(
        `
          UPDATE articles SET name=?, description=?, text=?, id_category=? WHERE id=?
        `,
        [name, description, text, id_category, req.params.id]
      );
      res.send({ success: true });
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  delete: async (req, res) => {
    try {
      await connection.promise().query(
        `
          DELETE FROM articles WHERE id=?
        `,
        [req.params.id]
      );
      res.send({ success: true });
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
};
