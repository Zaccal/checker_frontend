const TaskSubtaskCount = ({ count }: { count: number }) => {
  return (
    <>
      <span className="dot"></span>
      <span className="text-sm text-muted-foreground">{count} Steps</span>
    </>
  )
}

export default TaskSubtaskCount
