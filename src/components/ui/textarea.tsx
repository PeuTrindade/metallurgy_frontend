import * as React from 'react'

import { cn } from '@/lib/utils'

interface TextareaProps extends React.ComponentProps<'textarea'> {
  error?: string
  height?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error, height, ...props }, ref) => {
  return (
    <div className="flex flex-col">
      <textarea
        className={cn(
          `flex ${height ?? 'min-h-[90px]'} w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
          error
            ? 'border-2 border-red-500 focus:border-red-500 focus-visible:outline-none'
            : 'border-input focus:border-primary focus:border-2 focus-visible:outline-none',
          className,
        )}
        ref={ref}
        {...props}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }
