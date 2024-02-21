import { GetCategoryAPI, ListCategoriesAPI } from '@/actions/protected/culinary/category'
import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import CategorySheet from '@/components/category/sheet'
import { columns } from '@/components/category/columns'
import { PageProps } from '@/types/page'
import { redirect } from 'next/navigation'
import { AlertDialogDelete } from '@/components/category/delete'
import { wait } from '@/lib/helper'
import SiteHeader from '@/components/site-header'
import SiteHero from '@/components/site-hero'
import SiteFocus from '@/components/site-focus'
import SiteBody from '@/components/site-body'


const Page = async (pageProps: PageProps) => {
  await wait(1000)
  const editId = pageProps.searchParams?.editId || ''
  const deleteId = pageProps.searchParams?.deleteId || ''
  
  const categories = await ListCategoriesAPI({})
  if (!categories.success) {
    return redirect('/')
  }

  const editCategory = await GetCategoryAPI({ id: editId })  
  if (editId != "" && !editCategory.success) {
    return redirect('/culinary/categories')
  }

  const deleteCategory = await GetCategoryAPI({ id: deleteId })  
  if (deleteId != "" && !deleteCategory.success) {
    return redirect('/culinary/categories')
  }


  return (
    <div className='relative' >
      <SiteHeader>
        <h4 className='font-bold text-lg' >Categories</h4>
      </SiteHeader>

      <SiteHero>
        
      </SiteHero>

      <SiteFocus>
        <CategorySheet open={editCategory.category ? true : false} category={editCategory.category} />
      </SiteFocus>
      
      <SiteBody>
        <DataTable columns={columns} data={categories.categories!} />
      </SiteBody>

      <AlertDialogDelete category={deleteCategory.category!} open={deleteCategory.category ? true : false} />
    </div>
  )
}

export default Page
