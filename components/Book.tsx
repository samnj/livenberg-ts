import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import no_cover from "@/public/no_cover.webp"
import Image from "next/image"
import { BOOK_URL } from "@/lib/constants"

import { ArrowDownToLine, BookmarkPlus } from "lucide-react"
import Link from "next/link"

type BookProps = {
  id: number
  title: string
  authors: string
  cover: string
  languages: string
}

function Book({ id, title, authors, cover, languages }: BookProps) {
  return (
    <Card className="flex h-[22rem] w-44 flex-col justify-between">
      <CardHeader className="h-16">
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-1">{authors}</CardDescription>
      </CardHeader>
      <CardContent className="relative flex h-52 w-40 justify-center self-center">
        <Image
          src={cover || no_cover}
          alt={`${title} cover`}
          fill={true}
          className="grayscale"
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div>{languages}</div>
        <div className="flex items-center gap-4">
          <Link
            href=""
            target="_blank"
            className="hover:text-popover-foreground"
          >
            <BookmarkPlus size={20} />
          </Link>
          <Link
            className="hover:text-popover-foreground"
            href={`${BOOK_URL}${id}`}
            target="_blank"
          >
            <ArrowDownToLine size={20} />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Book
