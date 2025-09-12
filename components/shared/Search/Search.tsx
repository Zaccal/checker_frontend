'use client'

import { SearchDialog } from './SearchDialog/index'

export default function Search() {
  return (
    <SearchDialog.Root>
      <SearchDialog.Input placeholder="Type to search..." />
      <SearchDialog.Empty>No result found</SearchDialog.Empty>
      <SearchDialog.Placeholder>
        What are you looking for?
      </SearchDialog.Placeholder>
      <SearchDialog.List>
        <SearchDialog.Group heading="Todos" type="todos">
          <SearchDialog.TodosResult />
        </SearchDialog.Group>
        <SearchDialog.Group heading="Subtasks" type="subtasks">
          <SearchDialog.SubtasksResult />
        </SearchDialog.Group>
      </SearchDialog.List>
    </SearchDialog.Root>
  )
}
