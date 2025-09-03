import { List as Root, listContext } from './List'
import { ListHeader } from './ListHeader'
import { ListTitle } from './ListTitle'
import {
  ListChangeIconOption,
  ListDeleteOption,
  ListDropdown,
  ListRenameOption,
} from './ListDropdown/index'

export const List = {
  Root,
  Header: ListHeader,
  Title: ListTitle,
  Dropdown: ListDropdown,
  ChangeIconOption: ListChangeIconOption,
  DeleteOption: ListDeleteOption,
  RenameOption: ListRenameOption,
}

export { listContext }
