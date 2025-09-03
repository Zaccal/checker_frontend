import BadgeSelect from '@/components/shared/Common/BadgeSelect'
import { Input } from '@/components/ui/input'
import { useList, useGetTagsFormatted } from '@/hooks/index'
import { type TagSchema } from '@/lib/schemas/tag.schema'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import SelectTagsFallback from './SelectTagsFallback'
import { useState } from 'react'

interface SelectTagsProps {
  disabled?: boolean
  value: TagSchema[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChange: (...event: any[]) => void
}

function SelectTags({ value, onValueChange, disabled }: SelectTagsProps) {
  const { data, isLoading, error } = useGetTagsFormatted()
  const [tagName, setTagName] = useState('')
  const { value: localTags, push: pushLocalTag } = useList<TagSchema>()

  if (isLoading) return <Skeleton className="w-full h-8 rounded-md" />
  if (error) {
    return <SelectTagsFallback error={error} />
  }

  const allTags = [...data, ...localTags]

  const handleTagClick = (tag: TagSchema) => {
    if (value.length) {
      onValueChange([tag])
    }

    const existingTag = value.some(
      (fieldTag: TagSchema) => fieldTag.id === tag.id,
    )
    if (existingTag) {
      onValueChange(
        value.filter((fieldTag: TagSchema) => fieldTag.id !== tag.id),
      )
    } else {
      onValueChange([...value, tag])
    }
  }

  const handleCreateTag = () => {
    if (!tagName) return
    if (allTags.some(tag => tag.name === tagName)) {
      toast.info('Tag already exists')
      return
    }

    const newTagData: TagSchema = {
      id: crypto.randomUUID(),
      name: tagName.trim(),
      isLocal: true,
    }

    pushLocalTag(newTagData)
    onValueChange([...value, newTagData])
    setTagName('')
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleCreateTag()
    }
  }

  const renderTags = () =>
    allTags.map(tag => {
      const selected = value.some(
        (fieldTag: TagSchema) => fieldTag.id === tag.id,
      )
      return (
        <BadgeSelect
          selected={selected}
          className="cursor-pointer"
          size="md"
          key={tag.id}
          onClick={() => {
            handleTagClick(tag)
          }}
        >
          {tag.name}
        </BadgeSelect>
      )
    })

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 p-1 px-3 border border-border rounded-md">
        {allTags.length ? (
          renderTags()
        ) : (
          <p className="text-muted-foreground text-sm">Not tag yet</p>
        )}
      </div>
      <Input
        value={tagName}
        placeholder="Press Enter to create a new tag"
        className="w-full"
        onChange={event => {
          setTagName(event.target.value)
        }}
        onKeyDown={handleInputKeyDown}
        aria-label="New tag name"
        disabled={disabled}
      />
    </div>
  )
}

export default SelectTags
