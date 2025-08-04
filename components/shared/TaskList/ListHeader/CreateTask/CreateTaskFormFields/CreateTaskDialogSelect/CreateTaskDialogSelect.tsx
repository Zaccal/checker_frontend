import BadgeSelect from '@/components/shared/Common/BadgeSelect'
import { Input } from '@/components/ui/input'
import { useList } from '@/hooks'
import { useGetTagsSimplified } from '@/hooks/use-get-tags'
import { useObject } from '@/hooks/useObject'
import type { CreateTask, TagSchema } from '@/lib/schemas/CreateTask.schema'
import { type ControllerRenderProps } from 'react-hook-form'
import { toast } from 'sonner'
import CreateTaskDialogSelectFallback from './CreateTaskDialogSelectFallback'
import { DEFUALT_TAG_CREATE_STATE } from '@/lib/constants/constants'

interface CreateTaskDialogFormFieldsSelectProps {
	field: ControllerRenderProps<CreateTask, 'tags'>
}

function CreateTaskDialogFormFieldsSelect({
	field,
}: CreateTaskDialogFormFieldsSelectProps) {
	const { data, isLoading, error } = useGetTagsSimplified()
	const {
		object: newTag,
		set: setNewTag,
		reset: resetNewTag,
	} = useObject(DEFUALT_TAG_CREATE_STATE)
	const { value: localTags, push: pushLocalTag } = useList<TagSchema>()
	const allTags = [...data, ...localTags]

	const handleTagClick = (tag: TagSchema) => {
		if (!field.value) {
			field.onChange([tag])
			return
		}
		const existingTag = field.value.some(fieldTag => fieldTag.id === tag.id)
		if (existingTag) {
			field.onChange(field.value.filter(fieldTag => fieldTag.id !== tag.id))
		} else {
			field.onChange([...field.value, tag])
		}
	}

	const handleCreateTag = () => {
		if (!newTag.tagName) return
		if (allTags.some(tag => tag.name === newTag.tagName)) {
			toast.info('Tag already exists')
			return
		}

		const newTagData: TagSchema = {
			id: crypto.randomUUID(),
			name: newTag.tagName.trim(),
			color: newTag.tagColor,
		}

		pushLocalTag(newTagData)
		field.onChange([...(field.value ?? []), newTagData])
		resetNewTag()
	}

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			handleCreateTag()
		}
	}

	const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewTag('tagColor', event.target.value)
	}

	const renderTags = () =>
		allTags.map(tag => {
			const selected = field.value?.some(fieldTag => fieldTag.id === tag.id)
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
		<CreateTaskDialogSelectFallback
			data={data}
			isLoading={isLoading}
			error={error}
		>
			<div className="space-y-2">
				<div className="space-x-1 p-1 border border-border rounded-md">
					{renderTags()}
				</div>
				<div className="grid grid-cols-8 items-center gap-2">
					<Input
						value={newTag.tagName}
						placeholder="Press Enter to create a new tag"
						className="col-span-7"
						onChange={event => {
							setNewTag('tagName', event.target.value)
						}}
						onKeyDown={handleInputKeyDown}
						aria-label="New tag name"
					/>
					<Input
						value={newTag.tagColor}
						onChange={handleColorChange}
						type="color"
						className="w-full h-full cursor-pointer"
						aria-label="Tag color"
					/>
				</div>
			</div>
		</CreateTaskDialogSelectFallback>
	)
}

export default CreateTaskDialogFormFieldsSelect
