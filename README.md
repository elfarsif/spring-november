# Recipe Version Control

Welcome to Recipe Version Control, a web application designed to help you track changes made to recipes over time. Whether you're experimenting with new ingredients, adjusting cooking times, or refining instructions, this app provides a version-controlled environment for your culinary creations.

## Work in Progress

While the application is functional, it's important to note that Recipe Version Control is still a work in progress. Some features are yet to be implemented, and there may be bugs in the current version. But I still hope its fun to around with as a concept :)

## Table of Contents

- [Purpose](#purpose)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Structure](#structure)
- [Demo](#demo)
      - [Features](#features)
- [Progress](#progress)
  

## Purpose

The primary goal of this application is to offer users a simple and intuitive way to manage recipe variations and track modifications through commits. Each commit captures specific changes made to a recipe, providing a comprehensive version history.

## Prerequisites

Before you start, ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [Angular CLI](https://angular.io/cli) (v16.2.0)
- [Java Development Kit (JDK)](https://adoptopenjdk.net/) (v17)
- [Maven](https://maven.apache.org/) (v3.8.4)
- [MySQL](https://www.mysql.com/) (v8.0)

## Installation

1. Clone the repository: `https://github.com/elfarsif/spring-november.git`
2. Navigate to the project directory: `cd spring-november`
3. Install dependencies: `npm install`

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
    -- The DDL can be found under /backend/spring-app-november/src/main/resources/spring_november.sql
    ```

2. Insert sample data into the tables by executing the sample data insertion queries in the script.

## Structure

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

## Demo

Application is hosted at [recipe version control app](http://recipeelfarsi.s3-website.us-east-2.amazonaws.com/login). 


### Features

- **User Authentication:** Securely register, log in, and manage your account.
- **Recipe Management:** Create, view, and update recipes with multiple variations.
- **Commit History:** Track changes to recipe variations over time.

## Progress

- **Upcoming Features:**
  - User profile page with personal recipe statistics.
  - Enhanced search and filtering options for recipes.
  - Integration with third-party APIs for additional recipe data.

- **Known Issues:**
  - Issue with commit timestamps not displaying correctly.
  - Occasional frontend updates not reflecting backend changes.

Enjoy exploring and developing with the Spring App November!

