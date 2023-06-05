import Link from "next/link"
import { Button } from "./ui/button"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"

function Navbar() {
  return (
    <div className="container flex h-16 items-center justify-between px-8">
      <div className="text-lg font-extrabold">
        <Link title="Go back home" href="/">
          Livenberg
        </Link>
      </div>
      <div className="flex items-center gap-4 transition-all ease-linear">
        <Button variant="ghost">
          <Link title="Go to library" href="/library">
            My Books
          </Link>
        </Button>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <Button>Login</Button>
          </SignInButton>
        </SignedOut>
      </div>
    </div>
  )
}

export default Navbar
