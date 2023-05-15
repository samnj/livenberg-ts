import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

function Searchbar() {
  return (
    <div className="relative flex w-full max-w-lg items-center space-x-2">
      <Input type="search" placeholder="Search author or title" />
      <Button variant="secondary" type="submit">
        <Search size={20} />
      </Button>
    </div>
  )
}

export default Searchbar
