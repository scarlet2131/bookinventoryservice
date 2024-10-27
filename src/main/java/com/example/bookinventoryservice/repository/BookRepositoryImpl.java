package com.example.bookinventoryservice.repository;

import com.example.bookinventoryservice.dto.BookDTO;
import com.example.bookinventoryservice.model.Book;
import com.example.bookinventoryservice.model.Genre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class BookRepositoryImpl implements BookRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public BookRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper for mapping ResultSet to Book object
    private static final RowMapper<Book> bookRowMapper = new RowMapper<Book>() {
        @Override
        public Book mapRow(ResultSet rs, int rowNum) throws SQLException {
            Book book = new Book();
            book.setId(UUID.fromString(rs.getString("id")));
            book.setTitle(rs.getString("title"));
            book.setAuthor(rs.getString("author"));
            book.setGenreId(rs.getInt("genre_id"));
            book.setPublicationDate(rs.getDate("publication_date"));
            book.setIsbn(rs.getString("isbn"));
            book.setCreatedAt(rs.getTimestamp("created_at"));
            return book;
        }
    };

    /**
     * Adds a new book to the database.
     * @param book The book to add.
     * @return The added book.
     */
    @Override
    public Book addBook(Book book) {
        String sql = "INSERT INTO inventory (id, title, author, genre_id, publication_date, isbn) VALUES (?, ?, ?, ?, ?, ?)";

        try {
            KeyHolder keyHolder = new GeneratedKeyHolder();

            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, book.getId().toString()); // Convert UUID to String
                ps.setString(2, book.getTitle());
                ps.setString(3, book.getAuthor());
                ps.setInt(4, book.getGenreId());
                ps.setDate(5, new java.sql.Date(book.getPublicationDate().getTime())); // Convert java.util.Date to java.sql.Date
                ps.setString(6, book.getIsbn());
                return ps;
            }, keyHolder);

            return book;
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("A book with this ISBN already exists.", e);
        }
    }

    /**
     * Retrieves a book by its ID.
     * @param id The UUID of the book.
     * @return An Optional containing the book if found.
     */
    @Override
    public Optional<Book> getBookById(UUID id) {
        String sql = "SELECT * FROM inventory WHERE id = ?";
        return jdbcTemplate.query(sql, bookRowMapper, id.toString()).stream().findFirst();
    }

    /**
     * Retrieves all books with genre names.
     * @return A list of all books in BookDTO format.
     */
    public List<BookDTO> getAllBooks() {
        String sql = "SELECT b.id, b.title, b.author, b.publication_date, b.isbn, g.name as genre_name " +
                "FROM inventory b " +
                "JOIN genres g ON b.genre_id = g.id";

        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            return new BookDTO(
                    UUID.fromString(rs.getString("id")),
                    rs.getString("title"),
                    rs.getString("author"),
                    rs.getString("genre_name"),
                    rs.getDate("publication_date"),
                    rs.getString("isbn")
            );
        });
    }

    /**
     * Updates a book's details in the database.
     * @param book The book with updated details.
     * @return The number of rows affected.
     */
    @Override
    public int updateBook(Book book) {
        String sql = "UPDATE inventory SET title = ?, author = ?, genre_id = ?, publication_date = ?, isbn = ? WHERE id = ?";
        return jdbcTemplate.update(sql, book.getTitle(), book.getAuthor(), book.getGenreId(),
                book.getPublicationDate(), book.getIsbn(), book.getId().toString());
    }

    /**
     * Deletes a book by its ID.
     * @param id The UUID of the book to delete.
     * @return The number of rows affected.
     */
    @Override
    public int deleteBook(UUID id) {
        String sql = "DELETE FROM inventory WHERE id = ?";
        return jdbcTemplate.update(sql, id.toString());
    }

    /**
     * Filters books based on title, author, genre, and publication date.
     * @param title Title to filter by.
     * @param author Author to filter by.
     * @param genreId Genre ID to filter by.
     * @param publicationDate Publication date to filter by.
     * @return A list of BookDTO objects that match the filter criteria.
     */
    @Override
    public List<BookDTO> filterBooks(String title, String author, Integer genreId, String publicationDate) {
        // Construct SQL query with JOIN to get genre_name
        String sql = "SELECT b.id, b.title, b.author, b.publication_date, b.isbn, g.name AS genre_name " +
                "FROM inventory b " +
                "JOIN genres g ON b.genre_id = g.id " +
                "WHERE 1=1";
        List<Object> params = new ArrayList<>();

        // Add conditions based on filter parameters
        // Add conditions based on filter parameters
        if (title != null) {
            sql += " AND LOWER(b.title) LIKE ?";
            params.add("%" + title.toLowerCase() + "%");
        }
        if (author != null) {
            sql += " AND LOWER(b.author) LIKE ?";
            params.add("%" + author.toLowerCase() + "%");
        }
        if (genreId != null) {
            sql += " AND b.genre_id = ?";
            params.add(genreId);
        }
        if (publicationDate != null) {
            sql += " AND b.publication_date = ?";
            params.add(Date.valueOf(publicationDate));
        }

        // Execute query and map results to BookDTO
        return jdbcTemplate.query(sql, params.toArray(), (rs, rowNum) -> new BookDTO(
                UUID.fromString(rs.getString("id")),
                rs.getString("title"),
                rs.getString("author"),
                rs.getString("genre_name"), // Mapped genre name from JOIN
                rs.getDate("publication_date"),
                rs.getString("isbn")
        ));
    }
}
