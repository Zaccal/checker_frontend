import { searchStateStore } from './store'
import { SearchDialog as SearchDialogRoot } from './SearchDialog'
import { SearchDialogInput } from './SearchDialogInput'
import { SearchDialogEmpty } from './SearchDialogEmpty'
import { SearchDialogList } from './SearchDialogList'
import { SearchDialogGroup } from './SearchDialogGroup'
import { SearchDialogTodosResult } from './SearchDialogTodosResult'
import { SearchDialogSubtasksResult } from './SearchDialogSubtasksResult'
import { SearchDialogFallback } from './Fallback'
import { SearchDialogSkeleton } from './Skeleton'
import SearchDialogPlaceholder from './SearchDialogPlaceholder'

export const SearchDialog = {
  Root: SearchDialogRoot,
  Input: SearchDialogInput,
  Empty: SearchDialogEmpty,
  List: SearchDialogList,
  Group: SearchDialogGroup,
  TodosResult: SearchDialogTodosResult,
  SubtasksResult: SearchDialogSubtasksResult,
  Store: searchStateStore,
  Fallback: SearchDialogFallback,
  Skeleton: SearchDialogSkeleton,
  Placeholder: SearchDialogPlaceholder,
}
