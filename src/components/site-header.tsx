import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type SiteHeaderProps = HTMLAttributes<HTMLDivElement>

const SiteHeader = (props: SiteHeaderProps) => {
  return (
    <div {...props} className={cn('header bg-background px-4 py-2', props.className)}>
      {props.children}
    </div>
  )
}

export default SiteHeader