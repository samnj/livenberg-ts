import { useAuth } from "@clerk/nextjs"
import { getUserBooks } from "@/lib/helpers"
import useSWR from "swr"

function useUserBooks() {
  const { userId } = useAuth()

  const { data, error, isLoading } = useSWR(
    userId ? "userBooks" : null,
    getUserBooks
  )

  return { userBooks: data, isLoading, isError: error }
}

export default useUserBooks
