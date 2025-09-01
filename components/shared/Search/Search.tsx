'use client'

import {
  SearchDialogInput,
  SearchDialog,
  SearchDialogEmpty,
  SearchDialogList,
  SearchDialogGroup,
  SearchDialogTodosResult,
} from './SearchDialog'

export default function Search() {
  return (
    <SearchDialog>
      <SearchDialogInput placeholder="Type to search..." />
      <SearchDialogEmpty>No result found</SearchDialogEmpty>
      <SearchDialogList>
        <SearchDialogGroup heading="Todos">
          <SearchDialogTodosResult />
        </SearchDialogGroup>
        <SearchDialogGroup heading="Subtasks" />
      </SearchDialogList>
    </SearchDialog>
  )
}
