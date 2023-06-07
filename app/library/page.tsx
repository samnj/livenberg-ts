"use client"

import useLibrary from "@/hooks/useLibrary"
import BookList from "@/components/BookList"
import { useRef } from "react"
import useIntersection from "@/hooks/useIntersection"

function LibraryPage() {
  const { books, size, setSize, isValidating, hasNextPage } = useLibrary()

  const bottomOfPageRef = useRef<HTMLDivElement>(null)

  useIntersection({
    ref: bottomOfPageRef,
    callback: () => {
      if (!isValidating && hasNextPage) {
        setSize(size + 1)
      }
    },
    options: { threshold: 0.5 },
  })

  if (!books?.length)
    return (
      <p className="mt-10 text-center text-2xl font-bold">
        Your library is empty
      </p>
    )

  const count = books[0].count
  const header = `${count} ${count === 1 ? "book" : "books"} in library`

  return (
    <div className="container grid w-fit justify-items-center">
      <p className="mb-2 justify-self-start text-lg">{header}</p>
      {books.map(({ results, next }) => (
        <BookList key={next} books={results} />
      ))}
      <div className="mt-6 animate-pulse italic " ref={bottomOfPageRef}>
        {isValidating && hasNextPage && "Loading"}
      </div>
    </div>
  )
}

export default LibraryPage
