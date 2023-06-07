import { BOOK_ACTIONS } from "@/lib/constants"
import { handleBook } from "@/lib/helpers"
import { BookmarkMinus, BookmarkPlus } from "lucide-react"
import { toast } from "react-hot-toast"
import { mutate } from "swr"

type BookmarkProps = {
  id: number
  title: string
  userBooks: number[] | undefined
}

function Bookmark({ id, title, userBooks }: BookmarkProps) {
  const isLoggedIn = userBooks !== undefined
  const isBookSaved = isLoggedIn && userBooks?.includes(id)

  const titleText = {
    add: `add ${title} to your library`,
    remove: `remove ${title} from your library`,
  }

  // TODO: refactor logic into its own hook and add toasts for add/delete
  function handleClick() {
    if (!isLoggedIn) {
      toast("Log in to save books")
    } else {
      const action = isBookSaved ? BOOK_ACTIONS.DELETE : BOOK_ACTIONS.ADD
      const newUserBooks =
        action === BOOK_ACTIONS.DELETE
          ? userBooks.filter((book) => book !== id)
          : [...userBooks, id]

      mutate(
        "userBooks",
        handleBook({
          bookId: id,
          action: action,
        }),
        {
          optimisticData: newUserBooks,
        }
      )
    }
  }

  return (
    <button
      title={isBookSaved ? titleText.remove : titleText.add}
      className="hover:text-popover-foreground"
      onClick={handleClick}
    >
      {isBookSaved ? (
        <BookmarkMinus className="h-5 w-5 text-destructive" />
      ) : (
        <BookmarkPlus className="h-5 w-5" />
      )}
    </button>
  )
}

export default Bookmark
