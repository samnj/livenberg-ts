import Link from "next/link"
import { Button } from "./ui/button"

function Navbar() {
  return (
    <div className="container flex h-16 items-center justify-between px-8">
      <div className="text-lg font-extrabold">
        <Link href="/">Livenberg</Link>
      </div>
      <div className="space-x-4">
        <Button className="" variant="outline">
          <Link href="/library">My Books</Link>
        </Button>
        <Button>Login</Button>
      </div>
    </div>
  )
}

export default Navbar
