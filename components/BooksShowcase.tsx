"use client"

import Book from "@/components/Book"
import useShowCase from "@/hooks/useShowcase"
import useUserBooks from "@/hooks/useUserBooks"
import ShowcaseSkeleton from "@/components/ShowcaseSkeleton"

function BooksShowcase() {
  const { books, isLoading, isError } = useShowCase()
  const { userBooks } = useUserBooks()

  if (isLoading) {
    return <ShowcaseSkeleton />
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
      <div className="mt-10 flex max-w-full gap-6 overflow-x-auto">
        {books.results.map((book) => (
          <Book key={book.id} book={book} userBooks={userBooks} />
        ))}
      </div>
    )
  }
}

export default BooksShowcase
