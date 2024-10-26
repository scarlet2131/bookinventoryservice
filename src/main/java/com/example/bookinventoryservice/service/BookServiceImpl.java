package com.example.bookinventoryservice.service;

import com.example.bookinventoryservice.model.Book;
import com.example.bookinventoryservice.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book addBook(Book book) {
        book.setId(UUID.randomUUID()); // Generate a new UUID for each new book
        bookRepository.addBook(book);
        return book;
    }

    @Override
    public Optional<Book> getBookById(UUID id) {
        return bookRepository.getBookById(id);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.getAllBooks();
    }

    @Override
    public Book updateBook(Book book) {
        bookRepository.updateBook(book);
        return book;
    }

    @Override
    public boolean deleteBook(UUID id) {
        return bookRepository.deleteBook(id) > 0;
    }

    @Override
    public List<Book> filterBooks(String title, String author, Integer genreId, String publicationDate) {
        return bookRepository.filterBooks(title, author, genreId, publicationDate);
    }
    @Override
    public String exportBooksToCSV(List<Book> books) {
        StringBuilder csv = new StringBuilder("ID,Title,Author,Genre,Publication Date,ISBN\n");
        for (Book book : books) {
            csv.append(book.getId()).append(',')
                    .append(book.getTitle()).append(',')
                    .append(book.getAuthor()).append(',')
                    .append(book.getGenreId()).append(',')
                    .append(book.getPublicationDate()).append(',')
                    .append(book.getIsbn()).append('\n');
        }
        return csv.toString();
    }


}
