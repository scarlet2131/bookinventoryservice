package com.example.bookinventoryservice.service;

import com.example.bookinventoryservice.model.Genre;

import java.util.List;

public interface GenreService {
    List<Genre> getAllGenres();
    Genre getGenreById(Integer id);
    Genre addGenre(Genre genre);
    int deleteGenre(Integer id);
}
