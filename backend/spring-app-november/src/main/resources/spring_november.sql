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
    recipe_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE variations (
    variation_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id BIGINT NOT NULL,
    variation_title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,  -- Large text for detailed instructions
    is_main BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

CREATE TABLE commits (
    commit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    variation_id INT NOT NULL,
    commit_message VARCHAR(255) NOT NULL,
    commit_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (variation_id) REFERENCES variations(variation_id) ON DELETE CASCADE
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
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Chocolate Chip Cookies'), 'Classic Style', 'Instructions for classic chocolate chip cookies.',1),
((SELECT recipe_id FROM recipes WHERE title = 'Chocolate Chip Cookies'), 'Nutty Variation', 'Instructions for chocolate chip cookies with nuts.',0);

-- Insert variations for Banana Bread
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Banana Bread'), 'Walnut Banana Bread', 'Instructions for banana bread with walnuts.',1),
((SELECT recipe_id FROM recipes WHERE title = 'Banana Bread'), 'Chocolate Chip Banana Bread', 'Instructions for banana bread with chocolate chips.',0);

-- Insert variations for Spaghetti Carbonara
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Spaghetti Carbonara'), 'Classic Carbonara', 'Instructions for classic Carbonara.',1),
((SELECT recipe_id FROM recipes WHERE title = 'Spaghetti Carbonara'), 'Vegetarian Carbonara', 'Instructions for vegetarian Carbonara.',0);

-- Insert variations for Classic Caesar Salad
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Classic Caesar Salad'), 'Grilled Chicken Caesar', 'Instructions for Caesar salad with grilled chicken.',1),
((SELECT recipe_id FROM recipes WHERE title = 'Classic Caesar Salad'), 'Caesar Salad with Shrimp', 'Instructions for Caesar salad with shrimp.',0);

-- Insert variations for Vegetable Stir Fry
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Vegetable Stir Fry'), 'Tofu Stir Fry', 'Instructions for vegetable stir fry with tofu.',1),
((SELECT recipe_id FROM recipes WHERE title = 'Vegetable Stir Fry'), 'Chicken Stir Fry', 'Instructions for vegetable stir fry with chicken.',0);

-- Insert variations for Quinoa Salad
INSERT INTO variations (recipe_id, variation_title, instructions, is_main) 
VALUES 
((SELECT recipe_id FROM recipes WHERE title = 'Quinoa Salad'), 'Mediterranean Quinoa Salad', 'Instructions for Mediterranean-style quinoa salad.',1),
((SELECT recipe_id FROM recipes WHERE title = 'Quinoa Salad'), 'Mexican Quinoa Salad', 'Instructions for Mexican-style quinoa salad.',0);

-- Insert commits for 'Classic Style' variation of 'Chocolate Chip Cookies'
INSERT INTO commits (variation_id, commit_message) 
VALUES 
((SELECT variation_id FROM variations WHERE variation_title = 'Classic Style'), 'Initial recipe creation');

INSERT INTO commits (variation_id, commit_message) 
VALUES 
((SELECT variation_id FROM variations WHERE variation_title = 'Classic Style'), 'Adjusted sugar quantity');

-- Insert commits for 'Nutty Variation' of 'Chocolate Chip Cookies'
INSERT INTO commits (variation_id, commit_message) 
VALUES 
((SELECT variation_id FROM variations WHERE variation_title = 'Nutty Variation'), 'Added nuts to recipe');



commit;