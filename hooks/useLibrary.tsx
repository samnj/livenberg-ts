import useUserBooks from "@/hooks/useUserBooks"
import useSWRInfinite from "swr/infinite"
import { GUTENDEX_URL } from "@/lib/constants"
import { TBooksResult } from "@/lib/types"

// TODO: CONDITIONAL RENDERING AND REFACTOR
function getKey(
  pageIndex: number,
  previousPageData: TBooksResult,
  libraryBooks?: string
) {
  if (!libraryBooks) return null
  if (previousPageData && !previousPageData.next) return null

  return pageIndex === 0
    ? `${GUTENDEX_URL}?ids=${libraryBooks}`
    : previousPageData.next
}

async function fetcher(key: string) {
  const res = await fetch(key)
  if (!res.ok) throw new Error("Couldn't fetch books")

  const response = await res.json()
  return response
}

function useLibrary() {
  const { userBooks } = useUserBooks()
  const libraryBooks = userBooks?.join(",")

  const { data, error, isLoading, size, setSize, isValidating } =
    useSWRInfinite<TBooksResult>(
      (pageIndex, previousPageData) =>
        getKey(pageIndex, previousPageData, libraryBooks),
      fetcher,
      { keepPreviousData: true }
    )

  const hasNextPage = data && Boolean(data[data.length - 1].next)

  // TODO: find a solution for this hack below. keepPreviousData prevents an empty library

  return {
    books: userBooks?.length ? data : [],
    error,
    isLoading,
    size,
    setSize,
    isValidating,
    hasNextPage,
  }
}

export default useLibrary
