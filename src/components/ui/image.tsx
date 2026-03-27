import { forwardRef, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils';
import './image.css'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, className, ...props }, ref) => {
    if (!src) {
      return <div data-empty-image ref={ref} className={cn("bg-grey200", className)} {...props} />
    }

    return (
      <img
        ref={ref}
        src={src}
        className={cn("max-w-full h-auto", className)}
        {...props}
      />
    )
  }
)
Image.displayName = 'Image'
