import Searchbar from "@/components/Searchbar"

function HomePage() {
  return (
    <div className="container flex min-h-full grow flex-col items-center justify-center">
      <Searchbar />
      <div className="flex flex-col gap-4">
        <blockquote className="mt-6 text-2xl italic">
          A room without books is like a body without a soul
        </blockquote>
        <p className="text-right">Marcus Tullius Cicero</p>
      </div>
    </div>
  )
}

export default HomePage
