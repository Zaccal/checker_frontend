'use client'

import {
  SearchDialogInput,
  SearchDialog,
  SearchDialogEmpty,
  SearchDialogList,
  SearchDialogGroup,
  SearchDialogTodosResult,
  SearchDialogSubtasksResult,
} from './SearchDialog'

export default function Search() {
  return (
    <SearchDialog>
      <SearchDialogInput placeholder="Type to search..." />
      <SearchDialogEmpty>No result found</SearchDialogEmpty>
      <SearchDialogList>
        <SearchDialogGroup heading="Todos" type="todos">
          <SearchDialogTodosResult />
        </SearchDialogGroup>
        <SearchDialogGroup heading="Subtasks" type="subtasks">
          <SearchDialogSubtasksResult />
        </SearchDialogGroup>
      </SearchDialogList>
    </SearchDialog>
  )
}
