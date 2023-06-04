"use client"

import BookList from "@/components/BookList"
import useBooks from "@/hooks/useBooks"

type BooksSearchProp = {
  searchParams: {
    search: string
  }
}

function Books({ searchParams: { search } }: BooksSearchProp) {
  const { books, size, setSize } = useBooks({ query: search })
  if (books) {
    console.log("books:", books)
    console.log("size:", size)
  }

  return (
    <div>
      <button onClick={() => setSize(size + 1)}>fetch next</button>
    </div>
  )
  // if (!results) return <></>
  // return (
  //   <div className="mt-8 grid w-fit justify-items-center">
  //     <p className="justify-self-start text-sm text-muted-foreground">
  //       {count} results for <span className="font-bold italic">{query}</span>
  //     </p>
  //     <BookList books={results} />
  //   </div>
  // )
}
export default Books
