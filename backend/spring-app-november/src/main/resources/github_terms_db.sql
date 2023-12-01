-- Users Table
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Assume hashed passwords
    email VARCHAR(255) NOT NULL,
    UNIQUE KEY unique_username (username),
    UNIQUE KEY unique_email (email)
);

-- Recipe Table (Treated as Repository)
CREATE TABLE recipes (
    recipe_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    title VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Variations Table (Treated as Branch)
CREATE TABLE variations (
    variation_id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id BIGINT NOT NULL,
    variation_title VARCHAR(255) NOT NULL,
    instructions TEXT NOT NULL,
    is_main BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (recipe_id) REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

-- Commits Table
CREATE TABLE commits (
    commit_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    variation_id BIGINT NOT NULL,
    message VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (variation_id) REFERENCES variations(variation_id) ON DELETE CASCADE
);