"use client"

import BookList from "@/components/BookList"
import useBooks from "@/hooks/useBooks"
import { useRef } from "react"
import useIntersection from "@/hooks/useIntersection"

type BooksSearchProp = {
  searchParams: {
    search: string
  }
}

function Books({ searchParams: { search } }: BooksSearchProp) {
  const { books, isValidating, size, setSize, hasNextPage } = useBooks({
    query: search,
  })
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

  if (!books) return <></>

  const { count, query } = books[0]

  return (
    <div className="mt-8 grid w-fit justify-items-center">
      <p className="justify-self-start text-sm text-muted-foreground">
        {count} results for <span className="font-bold italic">{query}</span>
      </p>
      {books.map(({ results, next }) => (
        <BookList key={next} books={results} />
      ))}
      <div className="mt-6 animate-pulse italic " ref={bottomOfPageRef}>
        {isValidating && hasNextPage && "Loading"}
      </div>
    </div>
  )
}
export default Books
