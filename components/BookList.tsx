"use client"

import Book from "@/components/Book"
import { TBook } from "@/lib/types"
import useUserBooks from "@/hooks/useUserBooks"

function BookList({ books }: { books: TBook[] }) {
  const { userBooks } = useUserBooks()

  return (
    <div className="mt-6 grid grid-cols-4 gap-6">
      {books.map((book) => (
        <Book key={book.id} book={book} userBooks={userBooks} />
      ))}
    </div>
  )
}

export default BookList
