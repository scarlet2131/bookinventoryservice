package com.example.bookinventoryservice.controller;

import com.example.bookinventoryservice.model.Book;
import com.example.bookinventoryservice.model.Genre;
import com.example.bookinventoryservice.service.GenreServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    @Autowired
    private GenreServiceImpl genreService;

    // Endpoint to get all genres
    @GetMapping
    public List<Genre> getAllGenres() {
        return genreService.getAllGenres();
    }

    // Endpoint to add a new genre
    @PostMapping
    public  ResponseEntity<Genre> addGenre(@RequestBody Genre genre) {
        Genre result = genreService.addGenre(genre);
        return new ResponseEntity<>(result, HttpStatus.CREATED);    }

    // Endpoint to delete a genre by ID
    @DeleteMapping("/{id}")
    public String deleteGenre(@PathVariable Integer id) {
        int result = genreService.deleteGenre(id);
        return result == 1 ? "Genre deleted successfully" : "Error deleting genre";
    }
}
