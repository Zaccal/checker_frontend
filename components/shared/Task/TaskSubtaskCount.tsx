const TaskSubtaskCount = ({ count }: { count: number }) => {
  if (count === 0) return null

  return (
    <>
      <span className="text-sm text-muted-foreground">{count} Steps</span>
    </>
  )
}

export default TaskSubtaskCount
