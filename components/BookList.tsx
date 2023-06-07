"use client"

import Book from "@/components/Book"
import { TBook } from "@/lib/types"
import useUserBooks from "@/hooks/useUserBooks"

function BookList({ books }: { books: TBook[] }) {
  const { userBooks } = useUserBooks()

  return (
    <div className="mt-6 grid gap-6 min-[420px]:grid-cols-2 min-[600px]:grid-cols-3 min-[850px]:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {books.map((book) => (
        <Book key={book.id} book={book} userBooks={userBooks} />
      ))}
    </div>
  )
}

export default BookList
