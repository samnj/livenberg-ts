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

import { ArrowDownToLine, BookmarkPlus } from "lucide-react"
import Link from "next/link"
import formatBook from "@/lib/formatter"
import { TBook } from "@/lib/types"

function Book({ book }: { book: TBook }) {
  const { title, authors, cover, languages, downloadLink } = formatBook(book)

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
            title={`add ${title} to your library`}
            href=""
            target="_blank"
            className="hover:text-popover-foreground"
          >
            <BookmarkPlus className="h-5 w-5" />
          </Link>
          <Link
            title={`download ${title}`}
            className="hover:text-popover-foreground"
            href={downloadLink}
            target="_blank"
          >
            <ArrowDownToLine className="h-5 w-5" />
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Book
