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

-- Recipe Table
CREATE TABLE recipes (
    recipe_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (username, password, email) VALUES ('u1', 'p1', 'alice@example.com');
INSERT INTO users (username, password, email) VALUES ('u2', 'p2', 'bob@example.net');
INSERT INTO users (username, password, email) VALUES ('u3', 'p3', 'charlie@example.org');

INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u1'), 'Chocolate Chip Cookies');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u1'), 'Banana Bread');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u2'), 'Spaghetti Carbonara');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u2'), 'Classic Caesar Salad');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u3'), 'Vegetable Stir Fry');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u3'), 'Quinoa Salad');

commit;