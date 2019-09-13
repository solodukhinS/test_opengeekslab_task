const connection = require('./../../../connectors');

module.exports = {
  getCategoryChildren: async function(id_parent) {
    const [data] = await connection
      .promise()
      .query('SELECT * from categories WHERE id_parent=?', [id_parent]);

    const categories = [];
    if (data.length !== 0) {
      for (const item of data) {
        item.children = await this.getCategoryChildren(item.id);
        categories.push(item);
      }
      return categories;
    } else {
      return [];
    }
  },
  getArticlesByIdCategory: async function(id_category) {
    const [data] = await connection
      .promise()
      .query('SELECT * from categories WHERE id_parent=?', [id_category]);

    const categories = [];
    if (data.length !== 0) {
      for (const item of data) {
        item.children = await this.getArticlesByIdCategory(item.id);
        item.articles = await this.getArticlesByCurrentCategories(item.id);
        categories.push(item);
      }
      return categories;
    } else {
      return [];
    }
  },
  getCategoriesIdsWithNested: async function(id_category, category) {
    let [data] = await connection
      .promise()
      .query('SELECT id from categories WHERE id_parent=?', [id_category]);
    data = data.map(item => item.id);
    if (data.length !== 0) {
      for (const item of data) {
        category.push(item);
        await this.getCategoriesIdsWithNested(item, category);
      }
      return category;
    } else {
      return [];
    }
  },
  getRecipesByIdCategory: async function(id_category) {
    const [data] = await connection
      .promise()
      .query('SELECT * from categories WHERE id_parent=?', [id_category]);

    const categories = [];
    if (data.length !== 0) {
      for (const item of data) {
        item.children = await this.getRecipessByIdCategory(item.id);
        item.recipes = await this.getRecipesByCurrentCategories(item.id);
        categories.push(item);
      }
      return categories;
    } else {
      return [];
    }
  },
  getRecipesByCurrentCategories: async function(id_category) {
    const [data_recipes] = await connection
      .promise()
      .query('SELECT * FROM recipes WHERE id_category=? ORDER BY id_category', [id_category]);
    return data_recipes !== undefined ? data_recipes : [];
  },
};
