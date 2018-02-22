DROP DATABASE IF EXISTS bAmazon;

CREATE DATABASE bAmazon;

USE bAmazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR (30) NULL,
	department_name VARCHAR (50) NULL,
	price DECIMAL (10, 2) NULL,
	stock_quantity INT NULL,
	PRIMARY KEY (item_id)
)

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bike", "sports", 300.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("kayak", "sports", 700.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("macbook", "tech", 1999.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone", "tech", 800.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lightbulb", "tech", 50.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bAlexa", "tech", 30.00, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mascara", "beauty", 30.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("waterstick", "tech", 40.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("cardsAgainstHumanity", "games", 30.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("explodingKittens", "games", 30.00, 20);