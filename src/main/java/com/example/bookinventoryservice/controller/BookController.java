package com.example.bookinventoryservice.controller;

import com.example.bookinventoryservice.model.Book;
import com.example.bookinventoryservice.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // Endpoint to add a new book
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book createdBook = bookService.addBook(book);
        return new ResponseEntity<>(createdBook, HttpStatus.CREATED);
    }

    // Endpoint to retrieve a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable UUID id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Endpoint to retrieve all books
    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    // Endpoint to update an existing book
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable UUID id, @RequestBody Book bookDetails) {
        Optional<Book> existingBook = bookService.getBookById(id);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setGenreId(bookDetails.getGenreId());
            book.setPublicationDate(bookDetails.getPublicationDate());
            book.setIsbn(bookDetails.getIsbn());

            Book updatedBook = bookService.updateBook(book);
            return ResponseEntity.ok(updatedBook);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Endpoint to delete a book
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable UUID id) {
        boolean isDeleted = bookService.deleteBook(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Endpoint to filter books based on query parameters
    @GetMapping("/filter")
    public ResponseEntity<List<Book>> filterBooks(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) Integer genreId,
            @RequestParam(required = false) String publicationDate) {

        List<Book> books = bookService.filterBooks(title, author, genreId, publicationDate);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/export")
    public ResponseEntity<?> exportBooks(
            @RequestParam(required = false) String format,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) Integer genreId,
            @RequestParam(required = false) String publicationDate) {

        List<Book> books = bookService.filterBooks(title, author, genreId, publicationDate);

        if ("csv".equalsIgnoreCase(format)) {
            String csvContent = bookService.exportBooksToCSV(books);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=books.csv")
                    .body(csvContent);
        } else {
            return ResponseEntity.ok(books);
        }
    }


}
