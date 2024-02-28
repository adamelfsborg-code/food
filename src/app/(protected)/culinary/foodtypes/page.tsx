import { GetFoodTypeAPI, ListFoodTypesAPI } from '@/actions/protected/culinary/foodtype'
import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { columns } from '@/components/foodtype/columns'
import { PageProps } from '@/types/page'
import { redirect } from 'next/navigation'
import { FoodTypeDelete } from '@/components/foodtype/delete'
import { wait } from '@/lib/helper'
import SiteHeader from '@/components/site-header'
import SiteHero from '@/components/site-hero'
import SiteFocus from '@/components/site-focus'
import SiteBody from '@/components/site-body'
import FoodTypeSheet from '@/components/foodtype/sheet'
import { ListCategoriesAPI } from '@/actions/protected/culinary/category'


const Page = async (pageProps: PageProps) => {
  await wait(0)
  const editId = pageProps.searchParams?.editId || ''
  const deleteId = pageProps.searchParams?.deleteId || ''
  
  const foodTypes = await ListFoodTypesAPI({})
  if (!foodTypes.success) {
    return redirect('/')
  }

  const categories = await ListCategoriesAPI({})
  if (!categories.success) {
    return redirect('/')
  }

  const editFoodType = await GetFoodTypeAPI({ id: editId })  
  if (editId != "" && !editFoodType.success) {
    return redirect('/culinary/foodtypes')
  }

  const deleteFoodType = await GetFoodTypeAPI({ id: deleteId })  
  if (deleteId != "" && !deleteFoodType.success) {
    return redirect('/culinary/foodtypes')
  }


  return (
    <div className='relative' >
      <SiteHeader>
        <h4 className='font-bold text-lg' >Food Types</h4>
      </SiteHeader>

      <SiteHero>
        
      </SiteHero>

      <SiteFocus>
        <FoodTypeSheet open={editFoodType.foodtype ? true : false} foodType={editFoodType.foodtype} categories={categories.categories!} />
      </SiteFocus>
      
      <SiteBody>
        <DataTable columns={columns} data={foodTypes.foodtypes!} />
      </SiteBody>

      <FoodTypeDelete foodType={deleteFoodType.foodtype!} open={deleteFoodType.foodtype ? true : false} />
    </div>
  )
}

export default Page
