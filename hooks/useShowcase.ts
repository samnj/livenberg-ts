import { fetchBooksById } from "@/lib/helpers"
import useSWR from "swr"
import { TBooksResult } from "@/lib/types"
import { SHOWCASE_BOOKS_IDS } from "@/lib/constants"

function useShowCase() {
  const { data, error, isLoading } = useSWR<Omit<TBooksResult, "query">>(
    "homeBooks",
    (_) => fetchBooksById(SHOWCASE_BOOKS_IDS),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return { books: data, isError: error, isLoading }
}

export default useShowCase
