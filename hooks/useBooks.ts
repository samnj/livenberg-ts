import {
  createBookFetcher,
  createBookSearchKey,
  normalizeQuery,
} from "@/lib/helpers"
import { TBooksResult } from "@/lib/types"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import useSWRInfinite from "swr/infinite"

type useBooksProps = {
  query: string
  shouldFetch?: boolean
}

function useBooks({ query, shouldFetch = true }: useBooksProps) {
  const router = useRouter()
  const normalizedQuery = normalizeQuery(query)

  const getKey = createBookSearchKey(normalizedQuery, shouldFetch)
  const fetcher = createBookFetcher(query)
  const options = {
    shouldRetryOnError: false,
    onSuccess: (data: TBooksResult[]) => {
      if (!data) {
        toast("No results found")
        return
      }
      if (data.length > 1) return
      router.push(`/books?search=${normalizedQuery}`)
    },
    onError: () => toast.error("Something went wrong"),
  }

  const { data, error, isLoading, size, setSize, isValidating } =
    useSWRInfinite<TBooksResult>(getKey, fetcher, options)

  const hasNextPage = data && Boolean(data[data.length - 1].next)

  return {
    books: data,
    isLoading,
    isValidating,
    isError: error,
    size,
    setSize,
    hasNextPage,
  }
}
export default useBooks
