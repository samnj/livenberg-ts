import useSearch from "@/hooks/useSearch"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  searchInput: string
}

export default function useSearchForm() {
  const [searchData, setSearchData] = useState({
    query: "",
    shouldFetch: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormValues>({
    defaultValues: {
      searchInput: "",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  })

  const { isLoading } = useSearch({
    query: searchData.query,
    shouldFetch: searchData.shouldFetch,
  })

  function onSubmit() {
    setSearchData({
      query: getValues("searchInput"),
      shouldFetch: true,
    })
    reset()
  }

  function onError() {
    setSearchData({
      query: "",
      shouldFetch: false,
    })
  }

  function handleFormSubmit() {
    return handleSubmit(onSubmit, onError)
  }

  return {
    register,
    handleFormSubmit,
    errors,
    isLoading,
  }
}
