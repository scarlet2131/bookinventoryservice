package com.example.bookinventoryservice.service;

import com.example.bookinventoryservice.model.Genre;
import com.example.bookinventoryservice.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreService{

    @Autowired
    private GenreRepository genreRepository;

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Genre getGenreById(Integer id) {
        return genreRepository.findById(id);
    }

    public Genre addGenre(Genre genre) {
        try {
            return genreRepository.save(genre);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException("Genre already exists.");
        }
    }

    public int deleteGenre(Integer id) {
        return genreRepository.deleteById(id);
    }
}
