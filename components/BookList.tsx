"use client"

import Book from "@/components/Book"
import { TBook } from "@/lib/types"

function BookList({ books }: { books: TBook[] }) {
  return (
    <div>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  )
}

export default BookList
