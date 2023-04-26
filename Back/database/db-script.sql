DROP DATABASE IF EXISTS projectDb;
CREATE DATABASE projectDb;
USE projectDb;

CREATE TABLE `media`
(
    `Id` INT NOT NULL AUTO_INCREMENT,
    `fileName` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`Id`)
);

CREATE TABLE `user`
(
    `Id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `userName` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_Id` INT NOT NULL,
    PRIMARY KEY (`Id`)
);

CREATE TABLE `message`
(
    `Id` INT NOT NULL AUTO_INCREMENT,
    `header` VARCHAR(255) NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `timeStamp` DATETIME NOT NULL,
    `user_Id` INT NOT NULL,
    `media_Id` INT NOT NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`user_Id`) REFERENCES `user`(`Id`),
    FOREIGN KEY (`media_Id`) REFERENCES `media`(`Id`)
);

CREATE TABLE `likesMessage`
(
    `user_Id` INT NOT NULL,
    `msg_Id` INT NOT NULL,
    FOREIGN KEY (`user_Id`) REFERENCES `user`(`Id`),
    FOREIGN KEY (`msg_Id`) REFERENCES `message`(`Id`)
);

CREATE TABLE `reply`
(
    `Id` INT NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(255) NOT NULL,
    `msg_Id` INT NOT NULL,
    `user_Id` INT NOT NULL,
    `media_Id` INT NOT NULL,
    `parent_Id` INT NOT NULL,
    PRIMARY KEY (`Id`),
    FOREIGN KEY (`msg_Id`) REFERENCES `message`(`Id`),
    FOREIGN KEY (`user_Id`) REFERENCES `user`(`Id`),
    FOREIGN KEY (`media_Id`) REFERENCES `media`(`Id`),
    FOREIGN KEY (`parent_Id`) REFERENCES `reply`(`Id`)
);

CREATE TABLE `likesReply`
(
    `user_Id` INT NOT NULL,
    `reply_Id` INT NOT NULL,
    FOREIGN KEY (`user_Id`) REFERENCES `user`(`Id`),
    FOREIGN KEY (`reply_Id`) REFERENCES `reply`(`Id`)
);
