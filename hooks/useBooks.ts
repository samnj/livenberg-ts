import { TBooksResult } from "@/lib/types"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { normalizeQuery } from "@/lib/helpers"
import { fetcher } from "@/lib/helpers"

function useBooks({
  query,
  shouldFetch,
}: {
  query: string
  shouldFetch: boolean
}) {
  const router = useRouter()
  const normalizedQuery = normalizeQuery(query)

  const { data, error, isLoading } = useSWR<TBooksResult>(
    shouldFetch ? normalizedQuery : null,
    (key) => fetcher(key, query),
    {
      shouldRetryOnError: false,
      onSuccess: (data) => {
        if (!data.count) {
          toast("No results found")
          return
        }
        router.push(`/books?search=${normalizedQuery}`)
      },
      onError: () => toast.error("Something went wrong"),
    }
  )
  return {
    books: data,
    isLoading,
    isError: error,
  }
}
export default useBooks
