import { GUTENDEX_URL, SHOWCASE_BOOKS_IDS } from "@/lib/constants"
import Book from "@/components/Book"
import formatBook from "@/lib/formatter"
import { TBook } from "@/lib/types"

async function fetchHomeBooks(URL: string): Promise<{ results: TBook[] }> {
  const res = await fetch(`${URL}?ids=${SHOWCASE_BOOKS_IDS}`)

  if (!res.ok) {
    throw new Error("Couldn't fetch home page books")
  }

  return res.json()
}

async function BooksShowcase() {
  try {
    const books = await fetchHomeBooks(GUTENDEX_URL)
    const fbooks = books.results.map((book) => formatBook(book))

    return (
      <div className="mt-10 flex gap-6">
        {fbooks.map(({ id, title, authors, cover, languages }) => (
          <Book
            key={id}
            id={id}
            title={title}
            authors={authors}
            cover={cover}
            languages={languages}
          />
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
