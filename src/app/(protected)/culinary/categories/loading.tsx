import SiteBody from '@/components/site-body'
import SiteFocus from '@/components/site-focus'
import SiteHeader from '@/components/site-header'
import SiteHero from '@/components/site-hero'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const loading = async () => {

  return (
    <div className='relative' >
      <SiteHeader>
        <Skeleton className='w-[100px] h-[28px] rounded-full bg-accent/50' />
      </SiteHeader>

      <SiteHero>
        
      </SiteHero>

      <SiteFocus>
        <Skeleton className='text-center w-[61px] h-[36px] rounded-full bg-accent/50' />
      </SiteFocus>

      <SiteBody className='flex-col gap-y-2' >
        <Skeleton className='text-center w-[50vw] h-[10vh] rounded-sm bg-accent/50' />
        <Skeleton className='text-center w-[50vw] h-[20vh] rounded-sm bg-accent/50' />
        <Skeleton className='text-center w-[50vw] h-[5vh] rounded-sm bg-accent/50' />
      </SiteBody>
    </div>
  )
}

export default loading