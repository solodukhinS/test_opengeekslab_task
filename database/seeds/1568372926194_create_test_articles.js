module.exports = {
  up: `
    INSERT INTO articles (name, description, text, id_category) VALUES 
        ('Test article 1', 'Desc 1', 'Text of article 1', 1),
        ('Test article 2', 'Desc 2', 'Text of article 2', 1),
        ('Test article 3', 'Desc 3', 'Text of article 3', 4),
        ('Test article 4', 'Desc 4', 'Text of article 4', 3),
        ('Test article 5', 'Desc 5', 'Text of article 5', 5),
        ('Test article 6', 'Desc 6', 'Text of article 6', 7),
        ('Test article 7', 'Desc 7', 'Text of article 7', 6),
        ('Test article 8', 'Desc 8', 'Text of article 8', 8),
        ('Test article 9', 'Desc 9', 'Text of article 9', 9),
        ('Test article 10', 'Desc 10', 'Text of article 10', 10),
        ('Test article 11', 'Desc 11', 'Text of article 11', 9),
        ('Test article 12', 'Desc 12', 'Text of article 12', 8);
    `,
  down: `
        DELETE FROM articles;
    `,
};
