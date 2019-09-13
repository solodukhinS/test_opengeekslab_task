module.exports = {
  up: `
        CREATE TABLE IF NOT EXISTS categories(
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255)  NOT NULL,
            id_parent INT DEFAULT NULL,
            FOREIGN KEY (id_parent) REFERENCES categories(id) ON DELETE CASCADE
        )
    `,
  down: 'DROP TABLE categories',
};
