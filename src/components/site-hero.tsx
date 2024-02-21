import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type SiteHeroProps = HTMLAttributes<HTMLDivElement>

const SiteHero = (props: SiteHeroProps) => {
  return (
    <div {...props} className={cn('h-[20vh] bg-accent text-foreground border-b border-border/40 p-2', props.className)} >
      {props.children}
    </div>
  )
}

export default SiteHero