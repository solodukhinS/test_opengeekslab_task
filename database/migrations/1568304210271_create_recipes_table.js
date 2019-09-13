module.exports = {
  up: `
        CREATE TABLE IF NOT EXISTS recipes(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255)  NOT NULL,
            text TEXT NOT NULL,
            id_category INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
            FOREIGN KEY (id_category) REFERENCES categories(id) ON DELETE CASCADE
        )
    `,
  down: 'DROP TABLE recipes',
};
