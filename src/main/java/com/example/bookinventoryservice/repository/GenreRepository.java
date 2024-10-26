package com.example.bookinventoryservice.repository;

import com.example.bookinventoryservice.model.Genre;

import java.util.List;

public interface GenreRepository {
    List<Genre> findAll();
    Genre findById(Integer id);
    Genre save(Genre genre);
    int deleteById(Integer id);

}
