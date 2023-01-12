create database TesisEye;
use TesisEye;
create table Users(
	email VARCHAR(100) primary key,
	name VARCHAR(75) not null,
	password VARCHAR(250) not null
);
create table Images(
	id_image VARCHAR(100) primary key,
	url VARCHAR(255) not null,
	name VARCHAR(100) not null,
	externalId VARCHAR(100) not null
)
