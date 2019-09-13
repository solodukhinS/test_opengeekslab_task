module.exports = {
  up: `
  INSERT INTO categories (name, id_parent) VALUES 
  ('Test category 1', NULL),
  ('Test category 2', NULL),
  ('Test category 3', NULL),
  ('Test category 4',2),
  ('Test category 5',3),
  ('Test category 6',5),
  ('Test category 7',3),
  ('Test category 8',5),
  ('Test category 9',7),
  ('Test category 10',9);
    `,
  down: `
    DELETE FROM categories;
  `,
};
