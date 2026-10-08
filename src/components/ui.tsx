import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '../lib/utils'

export function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'dark'
  size?: 'sm' | 'default' | 'lg' | 'icon'
}) {
  const variants = {
    primary: 'bg-primary text-white shadow-sm hover:bg-primary-strong',
    secondary: 'border border-border bg-card text-foreground hover:bg-muted',
    ghost: 'text-muted-foreground hover:bg-muted hover:text-foreground',
    danger: 'bg-danger text-white hover:bg-danger/90',
    dark: 'bg-navy text-white hover:bg-navy-soft',
  }
  const sizes = {
    sm: 'h-9 px-3 text-xs',
    default: 'h-11 px-4 text-sm',
    lg: 'h-14 px-6 text-base',
    icon: 'size-11 p-0',
  }
  return (
    <button
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-xl border border-border bg-card px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10',
        className,
      )}
      {...props}
    />
  )
}

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-2xl border border-border bg-card shadow-card', className)} {...props} />
}

export function Badge({
  children,
  tone = 'neutral',
  className,
}: {
  children: ReactNode
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'blue'
  className?: string
}) {
  const tones = {
    neutral: 'bg-muted text-muted-foreground',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
    blue: 'bg-primary/10 text-primary',
  }
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold', tones[tone], className)}>{children}</span>
}

export function Modal({
  open,
  onClose,
  title,
  children,
  className,
}: {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  className?: string
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <div className={cn('max-h-[92vh] w-full max-w-xl overflow-auto rounded-3xl border border-border bg-card shadow-modal', className)}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-6 py-5">
          <p className="text-lg font-bold">{title}</p>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close dialog"><X className="size-5" /></Button>
        </div>
        {children}
      </div>
    </div>
  )
}
