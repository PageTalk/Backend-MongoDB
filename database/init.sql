CREATE TABLE `users` (
  `id` integer UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `role` varchar(255),
  `phone` BigInt DEFAULT null,
  `email` varchar(255) UNIQUE NOT NULL,
  `is_verified` bool,
  `password` varchar(255) NOT NULL,
  `user_metadata` varchar(255) DEFAULT null COMMENT 'any other info about user',
  `last_login` datetime,
  `created_at` datetime DEFAULT (now()),
  `updated_at` datetime
);

CREATE TABLE `query` (
  `query_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_user_id` int,
  `fk_pdf_id` int,
  `query_text` varchar(255),
  `query_response` varchar(255),
  `query_timestamp` datetime DEFAULT (now()),
  `response_timestamp` datetime,
  `is_answered` bool DEFAULT (false)
);

CREATE TABLE `admin` (
  `admin_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_user_id` int,
  `last_login` datetime
);

CREATE TABLE `pdf` (
  `pdf_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_user_id` int,
  `pdf_file` varchar(255),
  `title` varchar(255),
  `description` varchar(255),
  `upload_timestamp` datetime DEFAULT (now()),
  `tokenized_text` varchar(255),
  `other_metadata` varchar(255) COMMENT 'any other data that might be required'
);

CREATE TABLE `collection` (
  `collection_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_user_id` int,
  `fk_pdf_id` int,
  `collection_name` varchar(255) DEFAULT "New Collection",
  `collection_timestamp` datetime DEFAULT (now())
);

CREATE TABLE `interaction` (
  `interaction_id` int UNIQUE PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `fk_user_id` int,
  `fk_collection_id` int,
  `timestamp` datetime DEFAULT (now()),
  `interaction_type` varchar(255),
  `interaction_details` varchar(255)
);

-- CREATE TABLE `sso_tokens` (
--   `token_id` int PRIMARY KEY,
--   `fk_user_id` inf,
--   `token` int
-- );

ALTER TABLE `query` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `query` ADD FOREIGN KEY (`fk_pdf_id`) REFERENCES `pdf` (`pdf_id`);

ALTER TABLE `admin` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `pdf` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `collection` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `collection` ADD FOREIGN KEY (`fk_pdf_id`) REFERENCES `pdf` (`pdf_id`);

ALTER TABLE `interaction` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);

ALTER TABLE `interaction` ADD FOREIGN KEY (`fk_collection_id`) REFERENCES `collection` (`collection_id`);

-- ALTER TABLE `sso_tokens` ADD FOREIGN KEY (`fk_user_id`) REFERENCES `users` (`id`);