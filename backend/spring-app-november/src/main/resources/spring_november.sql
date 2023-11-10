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

CREATE TABLE variations (
    variation_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    variation_title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,  -- Large text for detailed instructions
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id)
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

-- Insert variations for Chocolate Chip Cookies
INSERT INTO variations (recipe_id, variation_title, instructions) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Chocolate Chip Cookies'), 'Classic Style', 'Instructions for classic chocolate chip cookies.'),
((SELECT recipe_id FROM recipes WHERE title = 'Chocolate Chip Cookies'), 'Nutty Variation', 'Instructions for chocolate chip cookies with nuts.');

-- Insert variations for Banana Bread
INSERT INTO variations (recipe_id, variation_title, instructions) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Banana Bread'), 'Walnut Banana Bread', 'Instructions for banana bread with walnuts.'),
((SELECT recipe_id FROM recipes WHERE title = 'Banana Bread'), 'Chocolate Chip Banana Bread', 'Instructions for banana bread with chocolate chips.');

-- Insert variations for Spaghetti Carbonara
INSERT INTO variations (recipe_id, variation_title, instructions) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Spaghetti Carbonara'), 'Classic Carbonara', 'Instructions for classic Carbonara.'),
((SELECT recipe_id FROM recipes WHERE title = 'Spaghetti Carbonara'), 'Vegetarian Carbonara', 'Instructions for vegetarian Carbonara.');

-- Insert variations for Classic Caesar Salad
INSERT INTO variations (recipe_id, variation_title, instructions) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Classic Caesar Salad'), 'Grilled Chicken Caesar', 'Instructions for Caesar salad with grilled chicken.'),
((SELECT recipe_id FROM recipes WHERE title = 'Classic Caesar Salad'), 'Caesar Salad with Shrimp', 'Instructions for Caesar salad with shrimp.');

-- Insert variations for Vegetable Stir Fry
INSERT INTO variations (recipe_id, variation_title, instructions) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Vegetable Stir Fry'), 'Tofu Stir Fry', 'Instructions for vegetable stir fry with tofu.'),
((SELECT recipe_id FROM recipes WHERE title = 'Vegetable Stir Fry'), 'Chicken Stir Fry', 'Instructions for vegetable stir fry with chicken.');

-- Insert variations for Quinoa Salad
INSERT INTO variations (recipe_id, variation_title, instructions) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Quinoa Salad'), 'Mediterranean Quinoa Salad', 'Instructions for Mediterranean-style quinoa salad.'),
((SELECT recipe_id FROM recipes WHERE title = 'Quinoa Salad'), 'Mexican Quinoa Salad', 'Instructions for Mexican-style quinoa salad.');


commit;