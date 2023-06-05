import Searchbar from "@/components/Searchbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid justify-items-center">
      <Searchbar className="" />
      {children}
    </div>
  )
}
