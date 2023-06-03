"use client"

import useSWR from "swr"
import { TBooksResult } from "@/lib/types"
import BookList from "@/components/BookList"

type BooksSearchProp = {
  searchParams: {
    search: string
  }
}

function Books({ searchParams: { search } }: BooksSearchProp) {
  const key = search.replace(" ", "+")
  const { data } = useSWR<TBooksResult>(key)

  if (!data) return <></>

  return <BookList books={data?.results} />
}
export default Books
