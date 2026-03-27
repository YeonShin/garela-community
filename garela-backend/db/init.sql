USE garela_db;

-- 1. users 테이블
CREATE TABLE IF NOT EXISTS users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(255) NOT NULL UNIQUE,
	profile_img VARCHAR(255),
	password VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	info TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. posts 테이블
CREATE TABLE IF NOT EXISTS posts (
	post_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	category VARCHAR(255),
	title VARCHAR(255) NOT NULL,
  summary VARCHAR(255) NOT NULL,
	content TEXT NOT NULL,
	thumbnail_img VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	likes INT DEFAULT 0,
	views INT DEFAULT 0,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 3. templates 테이블
CREATE TABLE IF NOT EXISTS templates (
	template_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	category VARCHAR(255),
	title VARCHAR(255) NOT NULL,
	content TEXT NOT NULL,
	thumbnail_img VARCHAR(255),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	likes INT DEFAULT 0,
	views INT DEFAULT 0,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 4. comments 테이블
CREATE TABLE IF NOT EXISTS comments (
	comment_id INT AUTO_INCREMENT PRIMARY KEY,
	post_id INT NOT NULL,
	user_id INT NOT NULL,
	content TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 5. follows 테이블
CREATE TABLE IF NOT EXISTS follows (
	follow_id INT AUTO_INCREMENT PRIMARY KEY,
	follower_id INT NOT NULL,
	following_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (follower_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (following_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- 6. likes 테이블
CREATE TABLE IF NOT EXISTS likes (
	like_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	post_id INT DEFAULT NULL,
	template_id INT DEFAULT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
	FOREIGN KEY (template_id) REFERENCES templates(template_id) ON DELETE CASCADE,
	UNIQUE(user_id, post_id),
	UNIQUE(user_id, template_id)
);

-- 7. views 테이블
CREATE TABLE IF NOT EXISTS views (
	view_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	post_id INT DEFAULT NULL,
	template_id INT DEFAULT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
	FOREIGN KEY (template_id) REFERENCES templates(template_id) ON DELETE CASCADE,
	UNIQUE(user_id, post_id),
	UNIQUE(user_id, template_id)
);

-- 8. post_lists 테이블
CREATE TABLE IF NOT EXISTS post_lists (
	user_id INT NOT NULL,
	post_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
	PRIMARY KEY (user_id, post_id)
);

-- 9. template_lists 테이블
CREATE TABLE IF NOT EXISTS template_lists (
	user_id INT NOT NULL,
	template_id INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
	FOREIGN KEY (template_id) REFERENCES templates(template_id) ON DELETE CASCADE,
	PRIMARY KEY (user_id, template_id)
);

CREATE TABLE IF NOT EXISTS template_library (
  user_id INT NOT NULL,
  template_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (template_id) REFERENCES templates(template_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, template_id)
);