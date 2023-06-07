import Searchbar from "@/components/Searchbar"
import BooksShowcase from "@/components/BooksShowcase"

function HomePage() {
  return (
    <div className="container flex min-h-full grow flex-col items-center justify-center gap-16">
      <Searchbar />
      <div className="flex flex-col gap-3">
        <blockquote className="mt-6 text-xl italic">
          A room without books is like a body without a soul.
        </blockquote>
        <p className="text-right">Marcus Tullius Cicero</p>
      </div>
      {/* https://github.com/vercel/next.js/issues/42292 */}
      {/* @ts-expect-error Server Component */}
      <BooksShowcase />
    </div>
  )
}

export default HomePage
