"use client"

import { Button } from "@/components/ui/button"
import useSearch from "@/hooks/useSearch"
import validateMinLength from "@/lib/validateMinLength"
import { Search, XIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

type FormValues = {
  searchInput: string
}

function Searchbar() {
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

  useSearch({
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

  return (
    <div className="w-full max-w-lg space-y-2">
      <form
        className="relative flex items-center space-x-2"
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
      >
        <input
          type="search"
          className={`flex h-10 w-full rounded-md border border-input bg-transparent py-2 pl-3 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            Object.keys(errors).length
              ? "focus-visible:ring-destructive"
              : "focus-visible:ring-ring"
          }`}
          placeholder="Search author or title"
          {...register("searchInput", {
            required: "Cannot search for empty string",
            validate: { minLength: validateMinLength },
          })}
        />
        <XIcon
          className="absolute inset-y-auto right-[4.5rem] h-4 w-4 cursor-pointer text-muted-foreground transition-all hover:scale-110 active:text-muted-foreground/80"
          onClick={() => reset()}
        />
        <Button variant="secondary" type="submit">
          <Search size={20} />
        </Button>
      </form>
      <p className="font-bold text-destructive">
        {errors.searchInput?.message}
      </p>
    </div>
  )
}

export default Searchbar
