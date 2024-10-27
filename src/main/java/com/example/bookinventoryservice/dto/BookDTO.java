// src/main/java/com/example/bookinventoryservice/dto/BookDTO.java

package com.example.bookinventoryservice.dto;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

public class BookDTO {
    private UUID id;
    private String title;
    private String author;
    private String genreName;
    private Date publicationDate;
    private String isbn;

    // Constructor
    public BookDTO(UUID id, String title, String author, String genreName, Date publicationDate, String isbn) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.genreName = genreName;
        this.publicationDate = publicationDate;
        this.isbn = isbn;
    }

    // Getters and Setters
    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getGenreName() { return genreName; }
    public void setGenreName(String genreName) { this.genreName = genreName; }

    public Date getPublicationDate() { return publicationDate; }
    public void setPublicationDate(Date publicationDate) { this.publicationDate = publicationDate; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }
}
