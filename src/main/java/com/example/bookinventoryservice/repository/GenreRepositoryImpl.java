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

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Query to get all genres
    public List<Genre> findAll() {
        String sql = "SELECT * FROM genres";
        return jdbcTemplate.query(sql, new GenreRowMapper());
    }

    // Query to find genre by ID
    public Genre findById(Integer id) {
        String sql = "SELECT * FROM genres WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new GenreRowMapper(), id);
    }

    // Query to add a new genre
    public Genre save(Genre genre) {
        try {
            String sql = "INSERT INTO genres (name) VALUES (?)";
            KeyHolder keyHolder = new GeneratedKeyHolder();
            jdbcTemplate.update(connection -> {
                PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                ps.setString(1, genre.getName());
                return ps;
            }, keyHolder);

            genre.setId(keyHolder.getKey().intValue());
            return genre;
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Genre already exists.", e);
        }
    }

    // Query to delete a genre by ID
    public int deleteById(Integer id) {
        String sql = "DELETE FROM genres WHERE id = ?";
        return jdbcTemplate.update(sql, id);
    }

    // RowMapper for Genre
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
