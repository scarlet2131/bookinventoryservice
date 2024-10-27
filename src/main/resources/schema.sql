
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
                                         id CHAR(36) PRIMARY KEY,  -- Use CHAR(36) for UUID storage
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    genre_id INT,
    publication_date DATE NOT NULL,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_genre
    FOREIGN KEY (genre_id)
    REFERENCES genres(id)
    ON DELETE SET NULL
    );

-- Creating indexes
-- CREATE INDEX idx_title ON inventory (title);
-- CREATE INDEX idx_author ON inventory (author);
-- CREATE INDEX idx_genre_id ON inventory (genre_id);

-- Inserting 10 genres into the genres table
INSERT IGNORE INTO genres (id, name) VALUES
    (1, 'Fiction'),
    (2, 'Non-Fiction'),
    (3, 'Science Fiction'),
    (4, 'Fantasy'),
    (5, 'Mystery'),
    (6, 'Romance'),
    (7, 'Horror'),
    (8, 'Biography'),
    (9, 'Self-Help'),
    (10, 'History');

-- Inserting 20 books into the inventory table
INSERT IGNORE INTO inventory (id, title, author, genre_id, publication_date, isbn) VALUES
    (UUID(), 'To Kill a Mockingbird', 'Harper Lee', 1, '1960-07-11', '9780060935467'),
    (UUID(), '1984', 'George Orwell', 1, '1949-06-08', '9780451524935'),
    (UUID(), 'A Brief History of Time', 'Stephen Hawking', 9, '1988-04-01', '9780553380163'),
    (UUID(), 'The Great Gatsby', 'F. Scott Fitzgerald', 1, '1925-04-10', '9780743273565'),
    (UUID(), 'The Catcher in the Rye', 'J.D. Salinger', 1, '1951-07-16', '9780316769488'),
    (UUID(), 'The Lord of the Rings', 'J.R.R. Tolkien', 4, '1954-07-29', '9780261103573'),
    (UUID(), 'The Hobbit', 'J.R.R. Tolkien', 4, '1937-09-21', '9780261103283'),
    (UUID(), 'Brave New World', 'Aldous Huxley', 3, '1932-01-01', '9780060850524'),
    (UUID(), 'The Da Vinci Code', 'Dan Brown', 5, '2003-03-18', '9780307474278'),
    (UUID(), 'Pride and Prejudice', 'Jane Austen', 6, '1813-01-28', '9780141439518'),
    (UUID(), 'The Shining', 'Stephen King', 7, '1977-01-28', '9780385121675'),
    (UUID(), 'Educated', 'Tara Westover', 8, '2018-02-20', '9780399590504'),
    (UUID(), 'The Road', 'Cormac McCarthy', 7, '2006-09-26', '9780307387899'),
    (UUID(), 'Becoming', 'Michelle Obama', 8, '2018-11-13', '9781524763138'),
    (UUID(), 'The Subtle Art of Not Giving a F*ck', 'Mark Manson', 9, '2016-09-13', '9780062457714'),
    (UUID(), 'The Alchemist', 'Paulo Coelho', 6, '1988-04-15', '9780061122415'),
    (UUID(), 'Gone Girl', 'Gillian Flynn', 5, '2012-06-05', '9780307588371'),
    (UUID(), 'The Handmaid''s Tale', 'Margaret Atwood', 3, '1985-08-17', '9780385490818'),
    (UUID(), 'Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', 10, '2011-02-04', '9780062316110'),
    (UUID(), 'Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 4, '1997-06-26', '9780747532699');
