import type { ButtonHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { Spinner } from './Spinner'

type Variant = 'primary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  loading?: boolean
}

export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner label="Enviando" />}
      {children}
    </button>
  )
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...rest
}: LinkProps & { variant?: Variant }) {
  return <Link className={`btn btn-${variant} ${className}`} {...rest} />
}

export function ExternalButtonLink({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return (
    <a className={`btn btn-${variant} ${className}`} target="_blank" rel="noreferrer" {...rest}>
      {children}
    </a>
  )
}
