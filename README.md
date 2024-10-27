![Homepage Screenshot](BookInventory.png)

# Book Inventory Management System

A web-based Book Inventory Management System built with **React**, **Spring Boot (with JDBC Template)**, and **MySQL**. This application allows users to manage a library of books, including functionality for searching, filtering, adding, exporting book data, and managing genres.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Installation](#installation)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Usage Guide](#usage-guide)
7. [Screenshots](#screenshots)
8. [License](#license)

---

## Project Overview

The Book Inventory Management System is designed to help users manage book information efficiently. It includes features like search, filtering, and exporting book data, making it a practical tool for library management, personal book collections, and bookstores.

## Features

- **Search by Book Title**: Quickly search books by title.
- **Filter Books**: Filter books by genre, author, and publication date.
- **Add and Manage Books**: Add new books with relevant details like title, author, genre, and ISBN.
- **Add and Manage Genres**: Expandable genre management allows for better categorization of books.
- **Data Export**: Export book data in CSV or JSON formats.
- **Pagination**: View books with pagination support.

---

## Installation

### Prerequisites
- **Java** (JDK 17 or above)
- **Node.js** and **npm** (for the React frontend)
- **MySQL** (for the database)

### Clone the Repository
```bash
git clone https://github.com/your-username/book-inventory-management.git
cd book-inventory-management
```

### Backend (Spring Boot with Gradle)
1. Navigate to the Backend Directory:
```bash
cd backend
```
2. Install Dependencies:

Run ./gradlew build to build the project.

3. Database Configuration:
```bash
Update application.properties in src/main/resources with your MySQL configuration:

spring.datasource.url=jdbc:mysql://localhost:3306/bookinventory_db
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```
4. Initialize the Database:

Run the SQL schema file located in src/main/resources/schema.sql to set up the database structure in MySQL. This includes creating tables for books and genres.

### Frontend (React)
1. Navigate to the Frontend Directory:

```bash
cd frontend
```

2. Install Dependencies:
   ```bash
   npm install
   ```
3. Configure API URL:
   ```bash
   const REACT_APP_API_URL = "http://localhost:8080/api";
    ```
### Database Setup
Ensure MySQL is running on your local machine. To initialize the database, create a new schema named bookinventory_db (or as specified in application.properties). Then, use the provided schema.sql to set up the necessary tables.

Schema File: src/main/resources/schema.sql
Tables: This schema includes two tables - genres and inventory - to store book details and genres, respectively.

### Running the Application
Start the Backend Server
```bash
cd backend
./gradlew bootRun
```
The backend server should now be running on http://localhost:8080.

### Start the Frontend Server
```bash
cd frontend
npm start
```
The frontend will be accessible on http://localhost:3000.



