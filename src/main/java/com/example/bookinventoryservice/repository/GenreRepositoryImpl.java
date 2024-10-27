package com.example.bookinventoryservice.repository;

import com.example.bookinventoryservice.model.Genre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;

@Repository
public class GenreRepositoryImpl implements GenreRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public GenreRepositoryImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * Retrieves all genres from the database.
     * @return List of all Genre objects.
     */
    public List<Genre> findAll() {
        String sql = "SELECT * FROM genres";
        return jdbcTemplate.query(sql, new GenreRowMapper());
    }

    /**
     * Finds a genre by its unique ID.
     * @param id ID of the genre to retrieve.
     * @return Genre object matching the given ID.
     */
    public Genre findById(Integer id) {
        String sql = "SELECT * FROM genres WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new GenreRowMapper(), id);
    }

    /**
     * Adds a new genre to the database.
     * @param genre Genre object to be saved.
     * @return The saved Genre object with an auto-generated ID.
     * @throws RuntimeException if a genre with the same name already exists.
     */
    public Genre save(Genre genre) {
        try {
            String sql = "INSERT INTO genres (name) VALUES (?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();

            // Insert the genre name and retrieve the generated key (ID)
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, genre.getName());
                return ps;
            }, keyHolder);

            genre.setId(keyHolder.getKey().intValue()); // Set the generated ID to the genre object
            return genre;
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Genre already exists.", e);
        }
    }

    /**
     * Deletes a genre by its ID.
     * @param id ID of the genre to delete.
     * @return Number of rows affected (1 if successful, 0 if genre not found).
     */
    public int deleteById(Integer id) {
        String sql = "DELETE FROM genres WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    /**
     * Maps rows of a ResultSet to Genre objects.
     * Converts each row in the genres table into a Genre instance.
     */
    private static class GenreRowMapper implements RowMapper<Genre> {
        @Override
        public Genre mapRow(ResultSet rs, int rowNum) throws SQLException {
            Genre genre = new Genre();
            genre.setId(rs.getInt("id"));
            genre.setName(rs.getString("name"));
            return genre;
        }
    }
}
