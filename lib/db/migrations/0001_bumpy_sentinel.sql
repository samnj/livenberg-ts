ALTER TABLE `book` MODIFY COLUMN `bookId` int NOT NULL;
ALTER TABLE `book` MODIFY COLUMN `addedAt` timestamp NOT NULL DEFAULT (now());