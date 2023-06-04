import { GUTENDEX_URL, IDS_URL, SHOWCASE_BOOKS_IDS } from "@/lib/constants"
import { TBook, TBooksResult } from "@/lib/types"

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

export async function fetchHomeBooks(): Promise<{ results: TBook[] }> {
  const res = await fetch(`${IDS_URL}${SHOWCASE_BOOKS_IDS}`)

  if (!res.ok) {
    throw new Error("Couldn't fetch home page books")
  }

  return res.json()
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
