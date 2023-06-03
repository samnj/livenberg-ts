import { TBookSearch } from "@/lib/types"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"
import { normalizeQuery } from "@/lib/helpers"
import { fetcher } from "@/lib/helpers"

function useSearch({
  query,
  shouldFetch,
}: {
  query: string
  shouldFetch: boolean
}) {
  const router = useRouter()
  const normalizedQuery = normalizeQuery(query)

  const { data, error, isLoading } = useSWR<TBookSearch>(
    shouldFetch ? normalizedQuery : null,
    fetcher,
    {
      shouldRetryOnError: false,
      onSuccess: (data) => {
        if (!data.count) {
          toast("No results found")
          return
        }
        router.push(`/results/${normalizedQuery}`)
      },
      onError: () => toast.error("Something went wrong"),
    }
  )
  return {
    books: data,
    originalQuery: query,
    isLoading,
    isError: error,
  }
}
export default useSearch
