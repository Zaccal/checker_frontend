'use client'

import * as React from 'react'
import { cn } from '@/utils/utils'
import { buttonVariants } from '@/components/ui/button'
import { VariantProps } from 'class-variance-authority'
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui'
import CheckboxLabel from '../common/primitives/CheckboxLabel'
import { createStore, useDebounceCallback, useLocalStorage } from '@/hooks'

interface AlertDialogStore {
  localStoreageKey: string
  state: boolean
  onAction?: () => void
}

const INITIAL_STATE: AlertDialogStore = {
  localStoreageKey: 'global-alert-persistent',
  state: false,
  onAction: undefined,
}

export const AlertDialogStore = createStore<AlertDialogStore>(INITIAL_STATE)

type AlertDialogProps = React.ComponentProps<typeof AlertDialogPrimitive.Root>

function AlertDialog({ ...props }: AlertDialogProps) {
  const localStoreageKey = AlertDialogStore.use(state => state.localStoreageKey)
  const { value: localState } = useLocalStorage<boolean>(localStoreageKey)

  if (localState) {
    return null
  }

  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogPersistent() {
  const { state } = AlertDialogStore.use(state => state)
  const id = React.useId()

  function checkHandler() {
    AlertDialogStore.set({
      state: !state,
    })
  }

  return (
    <CheckboxLabel
      id={id}
      label="Don't ask again"
      checked={state}
      onCheckedChange={checkHandler}
    />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/30 [backdrop-filter:blur(4px)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={cn(
          'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg shadow-black/5 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="alert-dialog-header"
    className={cn(
      'flex flex-col space-y-2 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    data-slot="alert-dialog-footer"
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2.5',
      className,
    )}
    {...props}
  />
)

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

type AlertDialogActionProps = React.ComponentProps<
  typeof AlertDialogPrimitive.Action
> &
  VariantProps<typeof buttonVariants> & {
    onAction?: () => void
  }

function AlertDialogAction({
  className,
  variant,
  onClick,
  onAction,
  ...props
}: AlertDialogActionProps) {
  const { localStoreageKey, state } = AlertDialogStore.use(state => state)
  const { set: setLocalStorage } = useLocalStorage(localStoreageKey, state)

  return (
    <AlertDialogPrimitive.Action
      data-slot="alert-dialog-action"
      onClick={e => {
        setLocalStorage(state)
        onAction?.()
        onClick?.(e)
      }}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  const { localStoreageKey } = AlertDialogStore.use(state => state)
  const { value: currentState } = useLocalStorage<boolean>(localStoreageKey)

  // For smooth transition, user should not see the change immediately
  const debouncedResetState = useDebounceCallback(
    () => AlertDialogStore.set({ state: currentState }),
    300,
  )

  return (
    <AlertDialogPrimitive.Cancel
      data-slot="alert-dialog-cancel"
      onClick={e => {
        debouncedResetState()
        onClick?.(e)
      }}
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'mt-2 sm:mt-0',
        className,
      )}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogPersistent,
}
