package com.example.bookinventoryservice.repository;

import com.example.bookinventoryservice.model.Book;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookRepository {
    int addBook(Book book);
    Optional<Book> getBookById(UUID id);
    List<Book> getAllBooks();
    int updateBook(Book book);
    int deleteBook(UUID id);
    List<Book> filterBooks(String title, String author, Integer genreId, String publicationDate);

}
