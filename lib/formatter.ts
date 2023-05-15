import { BOOK_URL } from "./constants"
import { TBook } from "./types"

export default function formatBook(book: TBook) {
  const id = book.id
  const title = book.title
  // Some authors have a weird 'graf' word in their name
  const authors = book.authors
    .map((author) => author.name.replace(", graf", ""))
    .join("; ")

  const languageName = new Intl.DisplayNames(["en"], { type: "language" })
  const languages = book.languages
    .map((lang) => languageName.of(lang)?.toLowerCase())
    .join(" ")
  const cover = setCover(book.formats["image/jpeg"])
  const downloadLink = `${BOOK_URL}${id}`

  return {
    id,
    title,
    authors,
    cover,
    languages,
    downloadLink,
  }
}

function setCover(link: string) {
  if (link) {
    return link.includes("small") ? link.replace("small", "medium") : link
  }
  return ""
}
