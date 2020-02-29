
/*
Test 5: SQL (3/20)
Write pseudo-SQL statements to create database tables to store the products of a basic webshop. 
Each product has a name, a price, a creation date and may belong to several categories.  
Categories have a name and a flag to indicate whether the category is private or public. //
Write a SQL query to find the list of products that belong to more than 5 public categories.
*/

CREATE DATABASE IF NOT EXISTS `store` DEFAULT CHARACTER SET utf8;

USE `store`;
 
-- DROP TABLE IF EXISTS `product`;      -- for dev mode
-- DROP TABLE IF EXISTS `payment`;      -- for dev mode
-- DROP TABLE IF EXISTS `order_detail`; -- for dev mode
-- DROP TABLE IF EXISTS `order`;        -- for dev mode
-- DROP TABLE IF EXISTS `customer`;     -- for dev mode
-- DROP TABLE IF EXISTS `category`;     -- for dev mode
 
/* Table structure for table `customer` */
 
CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_fullname` varchar(120) NOT NULL,
  `contact_lasname` varchar(60) NOT NULL,
  `contact_firstname` varchar(60) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address_1` varchar(200) NOT NULL,
  `address_2` varchar(200) DEFAULT NULL,
  `city` varchar(70) NOT NULL,
  `postal_code` varchar(15) NOT NULL,
  `country` varchar(70) NOT NULL,
  `card_number` int(20) NOT NULL,
  `card_exp` varchar(10) NOT NULL, -- ex: 12/2022
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
/*Table structure for table `category` */
 
CREATE TABLE `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `image` mediumblob,
  `flag` ENUM('private','public') DEFAULT 'private',
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `product` */

CREATE TABLE `product` (
  `product_id` int(15) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `creation_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `image` mediumblob,
  `quantity_in_stock` smallint(6) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `order` */

CREATE TABLE `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_date` date NOT NULL,
  `requiredDate` date NOT NULL,
  `shipped_date` date DEFAULT NULL,
  `status` varchar(15) NOT NULL,
  `comments` text,
  `customer_id` int(11) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `fk_orders_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `order_detail` */

CREATE TABLE `order_detail` (
  `order_id` int(11) NOT NULL,
  `product_id` int(15) NOT NULL,
  `quantity_ordered` int(11) NOT NULL,
  `price_each` decimal(10,2) NOT NULL,
  `orderLineNumber` smallint(6) NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `fk_order_id` FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`),
  CONSTRAINT `fk_product_id` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `payment` */

CREATE TABLE `payment` (
  `customer_id` int(11) NOT NULL,
  `check_number` varchar(50) NOT NULL,
  `paymentDate` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`customer_id`,`check_number`),
  CONSTRAINT `fk_payments_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8; 

/* Write a SQL query to find the list of products that belong to more than 5 public categories. : */

SELECT *, COUNT(c.flag = 'public') AS 'counter'
FROM product AS p
    INNER JOIN category AS c
      ON p.category_id = c.category_id
WHERE 'counter' > 5
ORDER BY p.name;
          