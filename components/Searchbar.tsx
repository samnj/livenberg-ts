"use client"

import { Button } from "@/components/ui/button"
import useSearchForm from "@/hooks/useSearchForm"
import { validateMinLength } from "@/lib/helpers"
import { RotateCw, Search } from "lucide-react"

function Searchbar() {
  const { register, handleFormSubmit, errors, isLoading } = useSearchForm()
  return (
    <div className="w-full max-w-lg space-y-2">
      <form
        className="relative flex items-center space-x-2"
        onSubmit={handleFormSubmit()}
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
        <Button variant="secondary" type="submit">
          {isLoading ? (
            <RotateCw className="h-[18px] w-[18px] animate-spin" />
          ) : (
            <Search className="h-[18px] w-[18px]" />
          )}
        </Button>
      </form>
      <p className="font-bold text-destructive">
        {errors.searchInput?.message}
      </p>
    </div>
  )
}

export default Searchbar
