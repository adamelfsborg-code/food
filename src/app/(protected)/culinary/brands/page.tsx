import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { columns } from '@/components/category/columns'
import { PageProps } from '@/types/page'
import { redirect } from 'next/navigation'
import { wait } from '@/lib/helper'
import SiteHeader from '@/components/site-header'
import SiteHero from '@/components/site-hero'
import SiteFocus from '@/components/site-focus'
import SiteBody from '@/components/site-body'
import { GetBrandAPI, ListBrandsAPI } from '@/actions/protected/culinary/brand'
import BrandSheet from '@/components/brand/sheet'
import { BrandDelete } from '@/components/brand/delete'


const Page = async (pageProps: PageProps) => {
  await wait(0)
  const editId = pageProps.searchParams?.editId || ''
  const deleteId = pageProps.searchParams?.deleteId || ''
  
  const brands = await ListBrandsAPI({})
  if (!brands.success) {
    return redirect('/')
  }

  const editBrand = await GetBrandAPI({ id: editId })  
  if (editId != "" && !editBrand.success) {
    return redirect('/culinary/brands')
  }

  const deleteBrand = await GetBrandAPI({ id: deleteId })  
  if (deleteId != "" && !deleteBrand.success) {
    return redirect('/culinary/brands')
  }

  return (
    <div className='relative' >
      <SiteHeader>
        <h4 className='font-bold text-lg' >Brands</h4>
      </SiteHeader>

      <SiteHero>
        
      </SiteHero>

      <SiteFocus>
        <BrandSheet open={editBrand.brand ? true : false} brand={editBrand.brand} />
      </SiteFocus>
      
      <SiteBody>
        <DataTable columns={columns} data={brands.brands!} />
      </SiteBody>

      <BrandDelete brand={deleteBrand.brand!} open={deleteBrand.brand ? true : false} />
    </div>
  )
}

export default Page
