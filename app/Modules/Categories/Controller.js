const connection = require('./../../../connectors');
const categoryValidation = require('./validation');
const service = require('./service');

module.exports = {
  create: async (req, res) => {
    const { name, id_parent } = req.body;
    try {
      const [data] = await connection.promise().query(
        `
      INSERT INTO categories (name, id_parent) VALUES (?,?)
    `,
        [name, id_parent]
      );
      res.send({
        id: data.insertId,
        name,
        id_parent,
      });
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  getById: async (req, res) => {
    try {
      const [[category]] = await connection
        .promise()
        .query('SELECT * from categories WHERE id=?', [req.params.id]);

      if (category !== undefined) {
        category.children = await service.getCategoryChildren(req.params.id);
      }

      res.send(category);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  getArticlesById: async (req, res) => {
    try {
      const [[category]] = await connection
        .promise()
        .query('SELECT * from categories WHERE id=?', [req.params.id]);

      if (!category) {
        res.send([]);
        return;
      }

      const categoriesIds = await service.getCategoriesIdsWithNested(req.params.id, [category.id]);
      const [articles] = await connection
        .promise()
        .query('SELECT * from articles WHERE id_category IN (?)', [categoriesIds]);

      res.send(articles);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  getRecipesById: async (req, res) => {
    try {
      const [[category]] = await connection
        .promise()
        .query('SELECT * from categories WHERE id=?', [req.params.id]);

      if (!category) {
        res.send([]);
        return;
      }

      const categoriesIds = await service.getCategoriesIdsWithNested(req.params.id, [category.id]);
      const [recipes] = await connection
        .promise()
        .query('SELECT * from recipes WHERE id_category IN (?)', [categoriesIds]);
      res.send(recipes);
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  update: async (req, res) => {
    try {
      const { error } = categoryValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const { name, id_parent } = req.body;

      const [data] = await connection.promise().query(
        `
          UPDATE categories SET name=?, id_parent=? WHERE id=?
        `,
        [name, id_parent, req.params.id]
      );
      res.send({ success: true });
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
  delete: async (req, res) => {
    try {
      const [data] = await connection.promise().query(
        `
          DELETE FROM categories WHERE id=?
        `,
        [req.params.id]
      );
      res.send({ success: true });
    } catch (E) {
      res.status(500).send({ error: E.message });
    }
  },
};
