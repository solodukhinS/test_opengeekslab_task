module.exports = {
  up: `
    INSERT INTO recipes(name, text, id_category) VALUES
        ('Test recipe 1', 'Text of recipe 1', 1),
        ('Test recipe 2', 'Text of recipe 2', 1),
        ('Test recipe 3', 'Text of recipe 3', 2),
        ('Test recipe 4', 'Text of recipe 4', 3),
        ('Test recipe 5', 'Text of recipe 5', 4),
        ('Test recipe 6', 'Text of recipe 6', 5),
        ('Test recipe 7', 'Text of recipe 7', 5),
        ('Test recipe 8', 'Text of recipe 8', 7),
        ('Test recipe 9', 'Text of recipe 9', 6),
        ('Test recipe 10', 'Text of recipe 10', 8),
        ('Test recipe 11', 'Text of recipe 11', 9),
        ('Test recipe 12', 'Text of recipe 12', 10),
        ('Test recipe 13', 'Text of recipe 13', 8),
        ('Test recipe 14', 'Text of recipe 14', 5),
        ('Test recipe 15', 'Text of recipe 15', 9),
        ('Test recipe 16', 'Text of recipe 16', 7);
    `,
  down: `
    DELETE FROM recipes;
    `,
};
