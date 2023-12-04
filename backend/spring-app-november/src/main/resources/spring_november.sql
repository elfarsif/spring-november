-- Drop the database if it exists and create a new one
DROP DATABASE IF EXISTS spring_november;
CREATE DATABASE spring_november;
USE spring_november;

-- Create the users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    UNIQUE KEY unique_username (username),
    UNIQUE KEY unique_email (email)
);

-- Create the recipes table
CREATE TABLE recipes (
    recipe_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create the variations table
CREATE TABLE variations (
    variation_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id BIGINT NOT NULL,
    variation_title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    is_main BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

-- Update the commits table structure
CREATE TABLE commits (
    commit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    variation_id INT NOT NULL,
    instructions TEXT NOT NULL,
    results VARCHAR(255) NOT NULL,
    commit_message VARCHAR(255) NOT NULL,
    commit_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (variation_id) REFERENCES variations(variation_id) ON DELETE CASCADE
);

-- Insert sample data into the users table
INSERT INTO users (username, password, email) VALUES ('u1', 'p1', 'alice@example.com');
INSERT INTO users (username, password, email) VALUES ('u2', 'p2', 'bob@example.net');
INSERT INTO users (username, password, email) VALUES ('u3', 'p3', 'charlie@example.org');

-- Insert sample data into the recipes table
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u1'), 'Chocolate Chip Cookies');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u1'), 'Banana Bread');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u2'), 'Spaghetti Carbonara');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u2'), 'Classic Caesar Salad');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u3'), 'Vegetable Stir Fry');
INSERT INTO recipes (user_id, title) VALUES ((SELECT id FROM users WHERE username = 'u3'), 'Quinoa Salad');

-- Insert sample data into the variations table
-- Chocolate Chip Cookies
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Chocolate Chip Cookies'), 'Classic Style', 'Instructions for classic chocolate chip cookies.', TRUE),
((SELECT recipe_id FROM recipes WHERE title = 'Chocolate Chip Cookies'), 'Nutty Variation', 'Instructions for chocolate chip cookies with nuts.', FALSE);

-- Banana Bread
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Banana Bread'), 'Walnut Banana Bread', 'Instructions for banana bread with walnuts.', TRUE),
((SELECT recipe_id FROM recipes WHERE title = 'Banana Bread'), 'Chocolate Chip Banana Bread', 'Instructions for banana bread with chocolate chips.', FALSE);

-- Spaghetti Carbonara
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Spaghetti Carbonara'), 'Classic Carbonara', 'Instructions for classic Carbonara.', TRUE),
((SELECT recipe_id FROM recipes WHERE title = 'Spaghetti Carbonara'), 'Vegetarian Carbonara', 'Instructions for vegetarian Carbonara.', FALSE);

-- Classic Caesar Salad
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Classic Caesar Salad'), 'Grilled Chicken Caesar', 'Instructions for Caesar salad with grilled chicken.', TRUE),
((SELECT recipe_id FROM recipes WHERE title = 'Classic Caesar Salad'), 'Caesar Salad with Shrimp', 'Instructions for Caesar salad with shrimp.', FALSE);

-- Vegetable Stir Fry
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Vegetable Stir Fry'), 'Tofu Stir Fry', 'Instructions for vegetable stir fry with tofu.', TRUE),
((SELECT recipe_id FROM recipes WHERE title = 'Vegetable Stir Fry'), 'Chicken Stir Fry', 'Instructions for vegetable stir fry with chicken.', FALSE);

-- Quinoa Salad
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Quinoa Salad'), 'Mediterranean Quinoa Salad', 'Instructions for Mediterranean-style quinoa salad.', TRUE),
((SELECT recipe_id FROM recipes WHERE title = 'Quinoa Salad'), 'Mexican Quinoa Salad', 'Instructions for Mexican-style quinoa salad.', FALSE);

-- Insert sample data into the commits table for various variations
-- Commits for Classic Style Chocolate Chip Cookies
INSERT INTO commits (variation_id, instructions, results, commit_message) 
VALUES 
((SELECT variation_id FROM variations WHERE variation_title = 'Classic Style'), 'Instructions for classic chocolate chip cookies.', 'Delicious and chewy', 'Initial recipe creation'),
((SELECT variation_id FROM variations WHERE variation_title = 'Classic Style'), 'Updated instructions with less sugar.', 'Less sweet but still tasty', 'Reduced sugar content');

-- Commits for Nutty Variation of Chocolate Chip Cookies
INSERT INTO commits (variation_id, instructions, results, commit_message) 
VALUES 
((SELECT variation_id FROM variations WHERE variation_title = 'Nutty Variation'), 'Initial instructions for Nutty Variation.', 'Rich nutty flavor', 'Added nuts to recipe');

-- ...and so on for other variations and their commits

-- Commit the transaction
COMMIT;
