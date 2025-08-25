import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Search as SearchIcon } from 'lucide-react'
import { InputIcon } from '../Common/InputIcon'

const Search = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <SearchIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <InputIcon icon={<SearchIcon />} placeholder="Search" />
        <div className="max-h-[80vh] py-5 w-full">
          <p className="text-sm text-center text-muted-foreground">Not Found</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Search
