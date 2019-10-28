
USE demodb;

DROP TABLE IF EXISTS `pet`;

CREATE TABLE `pet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `available_from` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `age` int(6) NOT NULL,
  `species` enum('cat','dog','rabbit') COLLATE utf8_unicode_ci NOT NULL,
  `breed` enum('labrador','poodle','spaniel','terrier') COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `pet` (`name`, `age`, `species`) VALUES ('lovely cat', 1, 'cat');
INSERT INTO `pet` (`name`, `age`, `species`, `breed`) VALUES ('happy dog', 0, 'dog', 'labrador');

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `pet_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `demodb`.`customer` (`id`, `name`) VALUES (1, 'customer_1572180603');

DROP TABLE IF EXISTS `customer_preference`;

CREATE TABLE `customer_preference` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `type` enum('age','species','breed') CHARACTER SET latin1 NOT NULL,
  `value1` varchar(45) CHARACTER SET latin1 NOT NULL,
  `value2` varchar(45) CHARACTER SET latin1 DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO `demodb`.`customer_preference` (`customer_id`, `type`, `value1`, `value2`) VALUES (1, 'age', 0, 10);
INSERT INTO `demodb`.`customer_preference` (`customer_id`, `type`, `value1`) VALUES (1, 'species', 'cat');

