import { GUTENDEX_URL, IDS_URL, BOOK_ACTIONS } from "@/lib/constants"
import { TBooksResult } from "@/lib/types"
import { SavedBook } from "@/lib/db/schema"

export function validateMinLength(value: string) {
  return (
    value.replace(/\s+/g, "").length >= 3 ||
    "At least 3 non-whitespace characters required"
  )
}

export function normalizeQuery(query: string) {
  const lowerCaseWithoutAccents = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
  const normalizedQuery = lowerCaseWithoutAccents.split(" ").sort().join("+")

  return normalizedQuery
}

export async function fetchBooksById(ids: number[]) {
  const res = await fetch(`${IDS_URL}${ids.join(",")}`)

  if (!res.ok) {
    throw new Error("Couldn't fetch books")
  }

  const response = await res.json()
  return response
}

export function createBookFetcher(query: string) {
  return async (key: string) => {
    const res = await fetch(key)
    if (!res.ok) throw new Error("Couldn't fetch books")

    const response = await res.json()
    response.query = query
    return response
  }
}

export function createBookSearchKey(query: string, shouldFetch: boolean) {
  return (pageIndex: number, previousPageData: TBooksResult) => {
    if (!shouldFetch) return null
    if (previousPageData && !previousPageData.next) return null

    return pageIndex === 0
      ? `${GUTENDEX_URL}?search=${query}`
      : previousPageData.next
  }
}

// TODO: handle fetch errors

export async function handleBook({
  bookId,
  action,
}: {
  bookId: number
  action: keyof typeof BOOK_ACTIONS
}) {
  await fetch("/api/books", {
    method: "POST",
    body: JSON.stringify({ bookId, action }),
  })
}

export async function getUserBooks() {
  const res = await fetch("/api/books", {
    method: "GET",
  })

  if (!res.ok) throw new Error("Couldn't fetch user books")

  const response = await res.json()
  const userBooks: SavedBook[] = response.userBooks
  return userBooks.map((book) => book.bookId)
}
