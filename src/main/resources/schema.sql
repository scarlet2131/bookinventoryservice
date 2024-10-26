-- Optional: Create the database
CREATE DATABASE IF NOT EXISTS bookinventory_db;
USE bookinventory_db;

-- Creating the genres table
CREATE TABLE IF NOT EXISTS genres (
                                      id INT AUTO_INCREMENT PRIMARY KEY,
                                      name VARCHAR(50) UNIQUE NOT NULL
    );

-- Creating the inventory table
CREATE TABLE IF NOT EXISTS inventory (
                                         id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre_id INT,
    publication_date DATE NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_genre FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE SET NULL
    );

-- Inserting initial data into the genres table
INSERT IGNORE INTO genres (name) VALUES
    ('Fiction'),
    ('Non-Fiction'),
    ('Science'),
    ('History'),
    ('Fantasy');
