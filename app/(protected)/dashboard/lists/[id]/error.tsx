'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-destructive-foreground bg-destructive">
      Something went wrong: {error.message}
    </div>
  )
}
