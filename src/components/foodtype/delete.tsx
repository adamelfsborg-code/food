"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import { DeleteFoodTypeAPI } from "@/actions/protected/culinary/foodtype"
import { TFoodTypeTableSchema } from "@/lib/schema/foodtype"
import useParamHook from "../hooks/use-param-hook"

type FoodTypeDeleteProps = {
  open: boolean
  foodType: TFoodTypeTableSchema
}

export function FoodTypeDelete(props: FoodTypeDeleteProps) {
  const router  = useParamHook()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(props.open)
  }, [props.open, props.foodType])

  const handleAction = async () => {
    const response = await DeleteFoodTypeAPI({ id: props.foodType.id });
    
    if (!response?.success && response?.error) {
      toast({
        variant: 'destructive',
        description: response.error
      })

      return
    }

    toast({
      description: response.message,
    });

    return
  }

  const handleOpenChange = () => {
    setOpen(!open);
    router.push('/culinary/foodtypes')
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete food-type &quot;{props.foodType?.name}&quot; from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 
