package com.example.bookinventoryservice.controller;

import com.example.bookinventoryservice.model.Genre;
import com.example.bookinventoryservice.service.BookService;
import com.example.bookinventoryservice.service.GenreService;
import com.example.bookinventoryservice.service.GenreServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
public class GenreController {

    private final GenreService genreService;

    @Autowired
    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    // Endpoint to get all genres
    @GetMapping
    public ResponseEntity<List<Genre>> getAllGenres() {
        List<Genre> genres = genreService.getAllGenres();
        return new ResponseEntity<>(genres, HttpStatus.OK);
    }

    // Endpoint to add a new genre
    @PostMapping
    public ResponseEntity<Genre> addGenre(@RequestBody Genre genre) {
        Genre result = genreService.addGenre(genre);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    // Endpoint to delete a genre by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGenre(@PathVariable Integer id) {
        int result = genreService.deleteGenre(id);
        if (result == 1) {
            return new ResponseEntity<>("Genre deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error deleting genre", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
