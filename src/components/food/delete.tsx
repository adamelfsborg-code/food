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
import { DeleteFoodAPI } from "@/actions/protected/culinary/food"
import { TFoodTableSchema } from "@/lib/schema/food"

type FoodDeleteProps = {
  open: boolean
  food: TFoodTableSchema
}

export function FoodDelete(props: FoodDeleteProps) {
  const router  = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(props.open)
  }, [props.open, props.food])

  const handleAction = async () => {
    const response = await DeleteFoodAPI({ id: props.food.id });
    
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
    router.push('/culinary/foods')
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete food &quot;{props.food?.name}&quot; from our servers.
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
