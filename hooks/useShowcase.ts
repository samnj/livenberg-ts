import { fetchHomeBooks } from "@/lib/helpers"
import useSWR from "swr"
import { TBooksResult } from "@/lib/types"

function useShowCase() {
  const { data, error, isLoading } = useSWR<Omit<TBooksResult, "query">>(
    "homeBooks",
    fetchHomeBooks,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  return { books: data, isError: error, isLoading }
}

export default useShowCase
