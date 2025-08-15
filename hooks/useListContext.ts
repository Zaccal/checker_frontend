import { listContext } from '@/provider/ListProvider'

export function useListContext() {
  const { value: list, set } = listContext.useSelect()
  if (!list) {
    throw new Error(
      'List context is not provided. Make sure to wrap your component with ListProvider.',
    )
  }

  return { ...list, setList: set }
}
