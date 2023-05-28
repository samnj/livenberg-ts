import useSWR from "swr"
import { TBookSearch } from "@/lib/types"
import { GUTENDEX_URL } from "@/lib/constants"

async function fetcher(url: string) {
  const res = await fetch(url)
  if (!res.ok) throw new Error("Couldn't fetch books")

  return res.json()
}

function useSearch({
  query,
  shouldFetch,
}: {
  query: string
  shouldFetch: boolean
}) {
  const SEARCH_URL = `${GUTENDEX_URL}?search=${query}`

  const { data, error, isLoading } = useSWR<TBookSearch>(
    shouldFetch ? SEARCH_URL : null,
    fetcher
  )
  return {
    books: data,
    isLoading,
    isError: error,
  }
}

export default useSearch
