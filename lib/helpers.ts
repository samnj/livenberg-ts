import { SEARCH_URL } from "@/lib/constants"
import { IDS_URL, SHOWCASE_BOOKS_IDS } from "@/lib/constants"
import { TBook } from "@/lib/types"

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

export async function fetcher(key: string, originalQuery: string) {
  const url = `${SEARCH_URL}${key}`
  const res = await fetch(url)
  if (!res.ok) throw new Error("Couldn't fetch books")

  const response = await res.json()
  response.query = originalQuery
  return response
}

export async function fetchHomeBooks(): Promise<{ results: TBook[] }> {
  const res = await fetch(`${IDS_URL}${SHOWCASE_BOOKS_IDS}`)

  if (!res.ok) {
    throw new Error("Couldn't fetch home page books")
  }

  return res.json()
}
