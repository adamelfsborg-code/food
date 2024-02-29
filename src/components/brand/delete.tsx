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
import { TBrandTableSchema } from "@/lib/schema/brand"
import { DeleteBrandAPI } from "@/actions/protected/culinary/brand"
import useParamHook from "../hooks/use-param-hook"

type BrandDeleteProps = {
  open: boolean
  brand: TBrandTableSchema
}

export function BrandDelete(props: BrandDeleteProps) {
  const router = useParamHook()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(props.open)
  }, [props.open, props.brand])

  const handleAction = async () => {
    const response = await DeleteBrandAPI({ id: props.brand.id });
    
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
    router.push('/culinary/brands')
  }

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete brand &quot;{props.brand?.name}&quot; from our servers.
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
