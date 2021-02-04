SET sql_mode = '';
SET GLOBAL time_zone = '+1:00';

SET FOREIGN_KEY_CHECKS = 0;
SET GROUP_CONCAT_MAX_LEN=32768;
SET @tables = NULL;
SELECT GROUP_CONCAT('`', table_name, '`') INTO @tables
  FROM information_schema.tables
  WHERE table_schema = (SELECT DATABASE());
SELECT IFNULL(@tables,'dummy') INTO @tables;
SET @tables = CONCAT('DROP TABLE IF EXISTS ', @tables);
PREPARE stmt FROM @tables;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE `sn_links` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `link` varchar(255) NOT NULL
);

CREATE TABLE `admin` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` int NOT NULL
);

CREATE TABLE `projects` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `project_title` varchar(255) NOT NULL,
  `project_description` varchar(255) NOT NULL
);

INSERT INTO projects (project_title) VALUES 
  ("CJF tennis");

CREATE TABLE `contact` (
  `id` int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `message` varchar(255) NOT NULL
);