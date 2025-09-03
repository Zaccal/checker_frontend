import { Todo as Root } from './Todo'
import { TodoCheckboxItem } from './TodoCheckboxItem'
import { TodoHeader } from './TodoHeader'
import { TodoOptions } from './TodoOptions'
import { TodoSubTasks } from './TodoSubtasks'
import { TodoFooter } from './TodoFooter'
import { TodoSubtasksAccordionTrigger } from './TodoAccrodionTrigger'
import { TodoDropdown } from './TodoDropdown'
import { TodoDeleteOption } from './TodoDeleteOption'
import TodoExpireDate from './TodoStatus'
import TodoTags from './TodoTags'
import TodoList from './TodoList'

import {
  TodoEditDialog,
  TodoEditDialogFormFields,
  TodoEditDialogSubtasks,
  TodoEditOption,
} from './TodoDropdownEdit/index'

export const Todo = {
  Root: Root,
  CheckboxItem: TodoCheckboxItem,
  Header: TodoHeader,
  Options: TodoOptions,
  SubTasks: TodoSubTasks,
  Footer: TodoFooter,
  SubtasksAccordionTrigger: TodoSubtasksAccordionTrigger,
  Dropdown: TodoDropdown,
  DeleteOption: TodoDeleteOption,
  ExpireDate: TodoExpireDate,
  Tags: TodoTags,
  List: TodoList,
  EditDialog: TodoEditDialog,
  EditDialogFormFields: TodoEditDialogFormFields,
  EditDialogSubtasks: TodoEditDialogSubtasks,
  EditOption: TodoEditOption,
}
