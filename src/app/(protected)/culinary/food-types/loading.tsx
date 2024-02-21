import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = async () => {

  return (
    <div>
      <div className="banner h-[20vh] border-b border-border/40 p-2">
        <Skeleton className='w-[100px] h-[20px] rounded-full' />
      </div>
    </div>
  )
}

export default loading