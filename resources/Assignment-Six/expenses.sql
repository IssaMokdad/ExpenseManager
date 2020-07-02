DROP DATABASE IF EXISTS ExpensesDB;

CREATE DATABASE ExpensesDB;

use ExpensesDB;


CREATE TABLE Users(
id int AUTO_INCREMENT,
first_name varchar (30),
last_name varchar (30),
email varchar (100) NOT NULL UNIQUE,
password varchar(100) NOT NULL,
PRIMARY KEY(id));

CREATE TABLE Category(
id int AUTO_INCREMENT,
category varchar(30) not null,
users_id int not null,
PRIMARY KEY(id),
unique (category, users_id),
foreign key(users_id) references Users(id) on delete cascade on update cascade); 

CREATE TABLE Expenses(
id int AUTO_INCREMENT,
users_id int not null,
category varchar(30),
amount int not null,
buyingdate date not null,
primary key(id),
foreign key (users_id) references Users(id) on delete cascade on update cascade,
foreign key (category) references Category(category) on delete set null on update cascade);



