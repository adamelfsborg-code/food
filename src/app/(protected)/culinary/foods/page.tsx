import { GetFoodAPI, ListFoodsAPI } from '@/actions/protected/culinary/food'
import { DataTable } from '@/components/ui/data-table'
import React from 'react'
import { columns } from '@/components/food/columns'
import { redirect } from 'next/navigation'
import { FoodDelete } from '@/components/food/delete'
import { wait } from '@/lib/helper'
import SiteHeader from '@/components/site-header'
import SiteHero from '@/components/site-hero'
import SiteFocus from '@/components/site-focus'
import SiteBody from '@/components/site-body'
import FoodSheet from '@/components/food/sheet'
import { PageProps } from '@/types/page'
import { ListBrandsAPI } from '@/actions/protected/culinary/brand'
import { ListFoodTypesAPI } from '@/actions/protected/culinary/foodtype'


const Page = async (pageProps: PageProps) => {
  await wait(0)
  const editId = pageProps.searchParams?.editId || ''
  const deleteId = pageProps.searchParams?.deleteId || ''
  const pageIndex = pageProps.searchParams?.pageIndex || '0'

  const foods = await ListFoodsAPI({ pageIndex: pageIndex, pageSize: 10 })
  if (!foods.success) {
    return redirect('/')
  }

  const brands = await ListBrandsAPI({ pageIndex: pageIndex, pageSize: 1000 })
  if (!brands.success) {
    return redirect('/')
  }

  const foodTypes = await ListFoodTypesAPI({ pageIndex: pageIndex, pageSize: 1000 })
  if (!foodTypes.success) {
    return redirect('/')
  }


  const editFood = await GetFoodAPI({ id: editId })  
  if (editId != "" && !editFood.success) {
    return redirect('/culinary/foods')
  }

  const deleteFood = await GetFoodAPI({ id: deleteId })  
  if (deleteId != "" && !deleteFood.success) {
    return redirect('/culinary/foods')
  }

  return (
    <div className='relative' >
      <SiteHeader>
        <h4 className='font-bold text-lg' >Foods</h4>
      </SiteHeader>

      <SiteHero>
        
      </SiteHero>

      <SiteFocus>
        <FoodSheet open={editFood.food ? true : false} food={editFood.food!} foodTypes={foodTypes.foodTypes?.rows!} brands={brands.brands?.rows!} />
      </SiteFocus>
      
      <SiteBody>
        <DataTable columns={columns} data={foods.foods!} />
      </SiteBody>

      <FoodDelete food={deleteFood.food!} open={deleteFood.food ? true : false} />
    </div>
  )
}

export default Page
