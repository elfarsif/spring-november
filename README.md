# Recipe Version Control

This repository contains a web application built with Spring Boot for the backend, Angular for the frontend, and MySQL for the database. The application allows users to manage recipes and their variations through a user-friendly interface.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Navigate to the project directory: `cd your-repo`
3. Install dependencies: `npm install`


## Prerequisites

Before you start, ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Angular CLI](https://angular.io/cli) (v16.2.0)
- [Java Development Kit (JDK)](https://adoptopenjdk.net/) (v17)
- [Maven](https://maven.apache.org/) (v3.8.4)
- [MySQL](https://www.mysql.com/) (v8.0)

## Installation Steps

### Frontend (Angular)

1. Open a terminal and navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2. Install the required npm packages:

    ```bash
    npm install
    ```

3. Build and run the Angular application:

    ```bash
    npm start
    ```

   The application will be accessible at [http://localhost:4200/](http://localhost:4200/).

### Backend (Spring Boot)

1. Open a new terminal and navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Build the Spring Boot application using Maven:

    ```bash
    mvn clean install
    ```

3. Run the Spring Boot application:

    ```bash
    mvn spring-boot:run
    ```

   The backend server will start at [http://localhost:8080/](http://localhost:8080/).

### Database (MySQL)

1. Open a MySQL client and execute the provided SQL script to create the necessary database and tables:

    ```sql
    -- Copy and paste the SQL script here
    ```

2. Insert sample data into the tables by executing the sample data insertion queries in the script.

## Application Structure

The application consists of the following components:

- **Frontend (Angular):**
  - Angular version: 16.2.0
  - Dependencies: Angular Material, ngx-cookie-service, ngx-monaco-editor-v2, Bootstrap

- **Backend (Spring Boot):**
  - Spring Boot version: 3.1.5
  - Dependencies: Spring Security, Spring Data JPA, Lombok, MySQL Connector, DevTools

- **Database (MySQL):**
  - Database name: `spring_november`
  - Tables: `users`, `recipes`, `variations`, `commits`

## Sample Data

The SQL script includes sample data to get you started. Feel free to explore the application with the provided sample recipes, variations, and commits.

## Notes

- Make sure to configure the database connection properties in the `application.properties` file in the `backend` directory.
- Customize the application based on your requirements and extend its functionality.

Enjoy exploring and developing with the Spring App November!

