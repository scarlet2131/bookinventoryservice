package com.example.bookinventoryservice.service;

import com.example.bookinventoryservice.model.Genre;
import com.example.bookinventoryservice.repository.BookRepository;
import com.example.bookinventoryservice.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;

    @Autowired
    public GenreServiceImpl(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    /**
     * Retrieves all genres.
     * @return List of all genres.
     */
    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    /**
     * Finds a genre by its ID.
     * @param id Genre ID.
     * @return Genre with the specified ID.
     */
    public Genre getGenreById(Integer id) {
        return genreRepository.findById(id);
    }

    /**
     * Adds a new genre.
     * @param genre Genre to be added.
     * @return The added genre.
     * @throws RuntimeException if the genre already exists.
     */
    public Genre addGenre(Genre genre) {
        try {
            return genreRepository.save(genre);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Genre already exists.");
        }
    }

    /**
     * Deletes a genre by ID.
     * @param id Genre ID.
     * @return Number of records deleted.
     */
    public int deleteGenre(Integer id) {
        return genreRepository.deleteById(id);
    }
}
