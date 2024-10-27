package com.example.bookinventoryservice.service;

import com.example.bookinventoryservice.dto.BookDTO;
import com.example.bookinventoryservice.model.Book;
import com.example.bookinventoryservice.repository.BookRepository;
import com.example.bookinventoryservice.model.Genre;
import com.example.bookinventoryservice.repository.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Adds a new book to the inventory with a generated UUID.
     * @param book The book object to add.
     * @return The added book with its assigned ID.
     */
    @Override
    public Book addBook(Book book) {
        book.setId(UUID.randomUUID()); // Generate a new UUID for each new book
        return bookRepository.addBook(book);
    }

    /**
     * Retrieves a book from the inventory based on its ID.
     * @param id The UUID of the book to retrieve.
     * @return An Optional containing the book if found, or empty if not.
     */
    @Override
    public Optional<Book> getBookById(UUID id) {
        return bookRepository.getBookById(id);
    }

    /**
     * Retrieves a list of all books in the inventory.
     * @return A list of BookDTO objects representing each book.
     */
    @Override
    public List<BookDTO> getAllBooks() {
        return bookRepository.getAllBooks(); // Already returns a list of BookDTOs
    }

    /**
     * Updates an existing book's details in the inventory.
     * @param book The book object with updated details.
     * @return The updated book object.
     */
    @Override
    public Book updateBook(Book book) {
        bookRepository.updateBook(book);
        return book;
    }

    /**
     * Deletes a book from the inventory based on its ID.
     * @param id The UUID of the book to delete.
     * @return True if the book was deleted, false otherwise.
     */
    @Override
    public boolean deleteBook(UUID id) {
        return bookRepository.deleteBook(id) > 0;
    }

    /**
     * Filters books in the inventory based on criteria such as title, author, genre, and publication date.
     * @param title The title filter.
     * @param author The author filter.
     * @param genreId The genre ID filter.
     * @param publicationDate The publication date filter.
     * @return A list of BookDTO objects that match the filter criteria.
     */
    @Override
    public List<BookDTO> filterBooks(String title, String author, Integer genreId, String publicationDate) {
        return bookRepository.filterBooks(title, author, genreId, publicationDate);
    }

    /**
     * Exports a list of books in CSV format, including fields such as ID, Title, Author, Genre, Publication Date, and ISBN.
     * @param books The list of BookDTO objects to export.
     * @return A String containing the CSV data for the books.
     */
    @Override
    public String exportBooksToCSV(List<BookDTO> books) {
        StringBuilder csv = new StringBuilder("\"ID\",\"Title\",\"Author\",\"Genre\",\"Publication Date\",\"ISBN\"\n");
        for (BookDTO book : books) {
            csv.append('"').append(book.getId()).append('"').append(',')
                    .append('"').append(book.getTitle()).append('"').append(',')
                    .append('"').append(book.getAuthor()).append('"').append(',')
                    .append('"').append(book.getGenreName()).append('"').append(',')
                    .append('"').append(book.getPublicationDate()).append('"').append(',')
                    .append('"').append(book.getIsbn()).append('"').append('\n');
        }
        return csv.toString();
    }
}
