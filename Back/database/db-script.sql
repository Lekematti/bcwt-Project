DROP DATABASE IF EXISTS projectdb;
CREATE DATABASE projectdb;
USE projectdb;


CREATE TABLE `user`
(
    `u_Id` INT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`u_Id`)
);

CREATE TABLE `message`
(
    `m_Id` INT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    `filename` TEXT,
    `timeStamp` TIMESTAMP NOT NULL,
    `user_Id` INT,
    PRIMARY KEY (`m_Id`),
    FOREIGN KEY (`user_Id`) REFERENCES `user`(`u_Id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `reply`
(
    `r_Id` INT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,
    `msg_Id` INT NOT NULL,
    `parent_Id` INT NOT NULL,
    PRIMARY KEY (`r_Id`),
    FOREIGN KEY (`msg_Id`) REFERENCES `message`(`m_Id`),
    FOREIGN KEY (`parent_Id`) REFERENCES `reply`(`r_Id`)
);