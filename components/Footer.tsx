import Link from "next/link"
import { Github } from "lucide-react"

function Footer() {
  return (
    <footer className="mt-14 flex h-16 items-center justify-center gap-4 font-firaMono text-sm">
      <p>
        Created by{" "}
        <Link
          target="_blank"
          className="underline underline-offset-2"
          href="https://github.com/samnj"
        >
          @samnj
        </Link>
      </p>
      <Link href="https://github.com/samnj/livenberg-ts" target="_blank">
        <Github size={18} />
      </Link>
    </footer>
  )
}

export default Footer
