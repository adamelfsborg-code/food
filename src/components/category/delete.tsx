"use client"

import { DeleteCategoryAPI } from "@/actions/protected/culinary/category"
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
import { TCategoryTableSchema } from "@/lib/schema/category"
import { useEffect, useState } from "react"
import { toast } from "../ui/use-toast"
import useParamHook from "../hooks/use-param-hook"

type CategoryDeleteProps = {
  open: boolean
  category: TCategoryTableSchema
}

export function CategoryDelete(props: CategoryDeleteProps) {
  const router  = useParamHook()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(props.open)
  }, [props.open, props.category])

  const handleAction = async () => {
    const response = await DeleteCategoryAPI({ id: props.category.id });
    
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
    router.push('/culinary/categories')
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete category &quot;{props.category?.name}&quot; from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
} 
