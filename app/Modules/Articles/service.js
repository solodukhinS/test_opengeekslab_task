const connection = require('./../../../connectors');

module.exports = {
  getCategoryParent: async function(id) {
    const [data] = await connection.promise().query('SELECT * from categories WHERE id=?', [id]);

    if (data.length !== 0) {
      data[0].parent = await this.getCategoryParent(data[0].id_parent);
      return data[0];
    } else {
      return null;
    }
  },
};
