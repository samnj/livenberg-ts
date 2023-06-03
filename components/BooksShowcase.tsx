import Book from "@/components/Book"
import { fetchHomeBooks } from "@/lib/helpers"

async function BooksShowcase() {
  try {
    const { results } = await fetchHomeBooks()

    return (
      <div className="mt-10 flex gap-6">
        {results.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    )
  } catch (error) {
    return (
      <div className="p-6 text-4xl text-destructive">
        Something went wrong! Couldn&apos;t fetch books
      </div>
    )
  }
}

export default BooksShowcase
