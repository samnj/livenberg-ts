import { mysqlTable, serial, text } from "drizzle-orm/mysql-core"

// this is a test schema and will be deleted
export const test = mysqlTable("test", {
  id: serial("id").primaryKey(),
  name: text("name"),
  comment: text("comment"),
})
