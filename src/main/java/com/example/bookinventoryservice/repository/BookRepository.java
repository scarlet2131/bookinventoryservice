package com.example.bookinventoryservice.repository;

import com.example.bookinventoryservice.dto.BookDTO;
import com.example.bookinventoryservice.model.Book;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookRepository {
    Book addBook(Book book);
    Optional<Book> getBookById(UUID id);
    List<BookDTO> getAllBooks();
    int updateBook(Book book);
    int deleteBook(UUID id);
    List<BookDTO> filterBooks(String title, String author, Integer genreId, String publicationDate);

}
