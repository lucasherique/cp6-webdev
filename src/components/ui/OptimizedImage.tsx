import type { ImgHTMLAttributes } from 'react'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'alt'> & {
  alt: string
  width: number
  height: number
}

/** Imagem com dimensões fixas (sem salto de layout) e carregamento preguiçoso. */
export function OptimizedImage({ alt, width, height, ...rest }: Props) {
  return <img alt={alt} width={width} height={height} loading="lazy" decoding="async" {...rest} />
}
