import { wait } from '@/lib/helper'
import React from 'react'

const Page = async () => {
  return (
    <div className='relative' >

      <div className="banner h-[20vh] bg-zinc-900 text-foreground border-b border-border/40 p-2">
        <h4 className='text-center' >Food Types</h4>
      </div>

      <div className="focus w-[50vw] bg-background text-foreground h-[10vh] absolute top-[20vh] left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-border/40 p-2 rounded-lg">
        <h4>Food Types</h4>
      </div>


    </div>
  )
}

export default Page