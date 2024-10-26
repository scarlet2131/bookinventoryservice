package com.example.bookinventoryservice.service;

import com.example.bookinventoryservice.model.Book;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookService {
    Book addBook(Book book);
    Optional<Book> getBookById(UUID id);
    List<Book> getAllBooks();
    Book updateBook(Book book);
    boolean deleteBook(UUID id);
    List<Book> filterBooks(String title, String author, Integer genreId, String publicationDate);
    String exportBooksToCSV(List<Book> books);


}
