CREATE TABLE `book` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`bookId` int,
	`addedAt` timestamp DEFAULT (now()),
	`ownerId` varchar(256) NOT NULL);

CREATE TABLE `user` (
	`id` varchar(256) PRIMARY KEY NOT NULL);
