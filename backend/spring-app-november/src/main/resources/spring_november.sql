drop database if exists spring_november;
create database spring_november;
use spring_november;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,  -- This should be hashed, even though we're not implementing Spring Security yet.
    email VARCHAR(255) NOT NULL,
    UNIQUE KEY unique_username (username),
    UNIQUE KEY unique_email (email)
);

INSERT INTO users (username, password, email) VALUES ('u1', 'p1', 'alice@example.com');
INSERT INTO users (username, password, email) VALUES ('u2', 'p2', 'bob@example.net');
INSERT INTO users (username, password, email) VALUES ('u3', 'p3', 'charlie@example.org');
commit;