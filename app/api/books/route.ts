import { BOOK_ACTIONS } from "@/lib/constants"
import { db } from "@/lib/db/index"
import { book, user } from "@/lib/db/schema"
import { auth } from "@clerk/nextjs"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }
  const { bookId, action } = await request.json()

  if (action === BOOK_ACTIONS.ADD) {
    try {
      await db.insert(book).values({ bookId: bookId, ownerId: userId })
      console.log(`added book ${bookId}`)
      return NextResponse.json(`Added book ${bookId}`)
    } catch (error) {
      console.log(error)
      return NextResponse.json(`Failed to add book ${bookId} to database`, {
        status: 500,
      })
    }
  }

  if (action === BOOK_ACTIONS.DELETE) {
    try {
      await db
        .delete(book)
        .where(and(eq(book.bookId, bookId), eq(book.ownerId, userId)))
      console.log(`deleted book ${bookId}`)
      return NextResponse.json(`Deleted book ${bookId}`)
    } catch (error) {
      console.log(error)
      return NextResponse.json(`Failed to delete book ${bookId}`, {
        status: 500,
      })
    }
  }
}

export async function GET() {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  // NOTE: should add books array to user schema to make this faster
  try {
    const userBooks = await db
      .select()
      .from(book)
      .where(eq(book.ownerId, userId))

    return NextResponse.json({
      status: 200,
      userBooks,
    })
  } catch (error) {
    return NextResponse.json("Failed to get user Books")
  }
}
