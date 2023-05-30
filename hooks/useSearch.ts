import { GUTENDEX_URL } from "@/lib/constants"
import { TBookSearch } from "@/lib/types"
import useSWR from "swr"
import { useRouter } from "next/navigation"
import { toast } from "react-hot-toast"

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
  const router = useRouter()

  const SEARCH_URL = `${GUTENDEX_URL}?search=${query}`

  const { data, error, isLoading } = useSWR<TBookSearch>(
    shouldFetch ? SEARCH_URL : null,
    fetcher,
    {
      shouldRetryOnError: false,
      onSuccess: (data) => {
        if (!data.count) {
          toast("No results found")
          return
        }
        router.push(`/results/${query}`)
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

export default useSearch
