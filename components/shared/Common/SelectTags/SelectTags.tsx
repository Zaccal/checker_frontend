import BadgeSelect from '@/components/shared/Common/BadgeSelect'
import { Input } from '@/components/ui/input'
import { useList } from '@/hooks'
import { useGetTagsSimplified } from '@/hooks/use-get-tags'
import { type TagSchema } from '@/lib/schemas/tag.schema'
import { type ControllerRenderProps } from 'react-hook-form'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import SelectTagsFallback from './SelectTagsFallback'
import { useState } from 'react'

interface SelectTagsProps {
  field: ControllerRenderProps<{ tags: TagSchema[] }, 'tags'>
  disabled?: boolean
}

function SelectTags({ field, disabled }: SelectTagsProps) {
  const { data, isLoading, error } = useGetTagsSimplified()
  const [tagName, setTagName] = useState('')
  const { value: localTags, push: pushLocalTag } = useList<TagSchema>()

  if (isLoading) return <Skeleton className="w-full h-8 rounded-md" />
  if (error) {
    return <SelectTagsFallback error={error} />
  }

  const allTags = [...data, ...localTags]

  const handleTagClick = (tag: TagSchema) => {
    if (!field.value.length) {
      field.onChange([tag])
    }

    const existingTag = field.value.some(
      (fieldTag: TagSchema) => fieldTag.id === tag.id,
    )
    if (existingTag) {
      field.onChange(
        field.value.filter((fieldTag: TagSchema) => fieldTag.id !== tag.id),
      )
    } else {
      field.onChange([...field.value, tag])
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
    field.onChange([...field.value, newTagData])
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
      const selected = field.value.some(
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
