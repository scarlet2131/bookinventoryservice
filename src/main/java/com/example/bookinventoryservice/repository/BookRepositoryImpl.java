package com.example.bookinventoryservice.repository;

import com.example.bookinventoryservice.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
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

    @Override
    public int addBook(Book book) {
        String sql = "INSERT INTO inventory (id, title, author, genre_id, publication_date, isbn) VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, book.getId().toString(), book.getTitle(), book.getAuthor(),
                book.getGenreId(), book.getPublicationDate(), book.getIsbn());
    }

    @Override
    public Optional<Book> getBookById(UUID id) {
        String sql = "SELECT * FROM inventory WHERE id = ?";
        return jdbcTemplate.query(sql, bookRowMapper, id.toString()).stream().findFirst();
    }

    @Override
    public List<Book> getAllBooks() {
        String sql = "SELECT * FROM inventory";
        return jdbcTemplate.query(sql, bookRowMapper);
    }

    @Override
    public int updateBook(Book book) {
        String sql = "UPDATE inventory SET title = ?, author = ?, genre_id = ?, publication_date = ?, isbn = ? WHERE id = ?";
        return jdbcTemplate.update(sql, book.getTitle(), book.getAuthor(), book.getGenreId(),
                book.getPublicationDate(), book.getIsbn(), book.getId().toString());
    }

    @Override
    public int deleteBook(UUID id) {
        String sql = "DELETE FROM inventory WHERE id = ?";
        return jdbcTemplate.update(sql, id.toString());
    }

    @Override
    public List<Book> filterBooks(String title, String author, Integer genreId, String publicationDate) {
        String sql = "SELECT * FROM inventory WHERE 1=1";
        List<Object> params = new ArrayList<>();

        if (title != null) {
            sql += " AND title LIKE ?";
            params.add("%" + title + "%");
        }
        if (author != null) {
            sql += " AND author LIKE ?";
            params.add("%" + author + "%");
        }
        if (genreId != null) {
            sql += " AND genre_id = ?";
            params.add(genreId);
        }
        if (publicationDate != null) {
            sql += " AND publication_date = ?";
            params.add(Date.valueOf(publicationDate));
        }

        return jdbcTemplate.query(sql, params.toArray(), bookRowMapper);
    }

}
