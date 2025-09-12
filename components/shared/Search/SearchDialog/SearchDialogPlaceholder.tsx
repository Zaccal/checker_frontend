import { searchStateStore } from './store'

interface SearchDialogPlaceholderProps {
  children: string
}

const SearchDialogPlaceholder = ({
  children,
}: SearchDialogPlaceholderProps) => {
  const { notFoundSubtasks, notFoundTodos, searchQuery } =
    searchStateStore.use()

  if (searchQuery) return null

  if (notFoundTodos || notFoundSubtasks) return null

  return (
    <span className="text-muted-foreground text-center my-8">{children}</span>
  )
}

export default SearchDialogPlaceholder
