import * as React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.ComponentProps<'input'> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          error
            ? 'border-2 border-red-500 focus:border-red-500 focus-visible:outline-none' // Borda vermelha com erro
            : 'border-input focus:border-primary focus:border-2 focus-visible:outline-none', // Borda mais grossa no foco
          className,
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>} {/* Exibe a mensagem de erro */}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
