"use client"

import Book from "@/components/Book"
import useShowCase from "@/hooks/useShowcase"
import useUserBooks from "@/hooks/useUserBooks"

function BooksShowcase() {
  const { books, isLoading, isError } = useShowCase()
  const { userBooks } = useUserBooks()

  // TODO: create loading spinner/skeleton
  if (isLoading) {
    return <div>loading...</div>
  }

  if (isError) {
    return (
      <div className="p-6 text-4xl text-destructive">
        Something went wrong! Couldn&apos;t fetch books
      </div>
    )
  }
  // TODO: randomize the books to show froom a pool of books
  if (books) {
    return (
      <div className="mt-10 flex gap-6">
        {books.results.map((book) => (
          <Book key={book.id} book={book} userBooks={userBooks} />
        ))}
      </div>
    )
  }
}

export default BooksShowcase
