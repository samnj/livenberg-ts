import {
  mysqlTable,
  serial,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/mysql-core"
import { InferModel, relations } from "drizzle-orm"

export const user = mysqlTable("user", {
  id: varchar("id", { length: 256 }).primaryKey(),
})

export const book = mysqlTable("book", {
  id: serial("id").primaryKey(),
  bookId: int("bookId"),
  addedAt: timestamp("addedAt").defaultNow(),
  ownerId: varchar("ownerId", { length: 256 }).notNull(),
})

export const usersRelations = relations(user, ({ many }) => ({
  books: many(book),
}))

export const booksRelations = relations(book, ({ one }) => ({
  owner: one(user, { fields: [book.ownerId], references: [user.id] }),
}))

export type SavedBook = InferModel<typeof book>
