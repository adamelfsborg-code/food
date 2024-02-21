import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

type SiteBodyProps = HTMLAttributes<HTMLDivElement>

const SiteBody = (props: SiteBodyProps) => {
  return (
    <div {...props} className={cn("flex justify-center items-center mt-10", props.className)} >
      {props.children}
    </div>
  )
}

export default SiteBody