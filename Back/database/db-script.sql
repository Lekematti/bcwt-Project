DROP DATABASE IF EXISTS projectdb;
CREATE DATABASE projectdb;
USE projectdb;


CREATE TABLE `user`
(
    `Id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `userName` VARCHAR(255),
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`Id`)
);

CREATE TABLE `message`
(
    `Id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `photo` TEXT,
    `timeStamp` TIMESTAMP NOT NULL,
    `user_Id` INT,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`user_Id`) REFERENCES `user`(`Id`)
);

CREATE TABLE `reply`
(
    `Id` INT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,
    `msg_Id` INT NOT NULL,
    `parent_Id` INT NOT NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`msg_Id`) REFERENCES `message`(`Id`),
    FOREIGN KEY (`parent_Id`) REFERENCES `reply`(`Id`)
);


