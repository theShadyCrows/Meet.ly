
CREATE DATABASE meet;

USE meet;


DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `phoneNumber` VARCHAR(20) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Categories'
--
-- ---

DROP TABLE IF EXISTS `Categories`;

CREATE TABLE `Categories` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Auth'
--
-- ---

DROP TABLE IF EXISTS `Auth`;

CREATE TABLE `Auth` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'DefaultParams'
--
-- ---

DROP TABLE IF EXISTS `DefaultParams`;

CREATE TABLE `DefaultParams` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INTEGER NOT NULL,
  `defaultCat` VARCHAR(200) NOT NULL,
  `defaultLoc` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'SubCategories'
--
-- ---

DROP TABLE IF EXISTS `SubCategories`;

CREATE TABLE `SubCategories` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `category_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Auth` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `DefaultParams` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
ALTER TABLE `SubCategories` ADD FOREIGN KEY (category_id) REFERENCES `Categories` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Categories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Auth` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `DefaultParams` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `SubCategories` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`phoneNumber`,`email`) VALUES
-- ('','','');
-- INSERT INTO `Categories` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `Auth` (`id`,`user_id`) VALUES
-- ('','');
-- INSERT INTO `DefaultParams` (`id`,`user_id`,`defaultCat`,`defaultLoc`) VALUES
-- ('','','','');
-- INSERT INTO `SubCategories` (`id`,`name`,`category_id`) VALUES
-- ('','','');
