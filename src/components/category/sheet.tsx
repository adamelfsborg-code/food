"use client"

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "../ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import { Input } from "../ui/input";
import { CategoryCreateDtoSchema, TCategoryCreateDtoSchema, TCategoryTableSchema } from "@/lib/schema/category";
import { AddCategoryAPI, EditCategoryAPI } from "@/actions/protected/culinary/category";
import { useEffect, useState } from "react";
import { RedirectType, redirect } from "next/navigation";
import { useRouter } from 'next/navigation'

type CategorySheetProps = {
  open: boolean
  category?: TCategoryTableSchema
};

const CategorySheet = (props: CategorySheetProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { toast } = useToast();
  const form = useForm<TCategoryCreateDtoSchema>({
    resolver: zodResolver(CategoryCreateDtoSchema),
    defaultValues: {
      name: props.category?.name,
    },
  });

  async function onSubmit(values: TCategoryCreateDtoSchema) {
    if (props.category) {
      const response = await EditCategoryAPI({...props.category, ...values });
    
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

      return router.push('/culinary/categories')
    }

    const response = await AddCategoryAPI(values);
    
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

    return router.push('/culinary/categories')
  }

  const handleOpenChange = () => {
    setOpen(!open)
    router.push('/culinary/categories')
  }

  useEffect(() => {
    setOpen(props.open)
    form.setValue("name", props.category?.name || '');
  }, [props.category, props.open, form])

  return (
    <Sheet open={open} onOpenChange={handleOpenChange} >
      <SheetTrigger asChild>
        <Button variant="outline">Add</Button>
      </SheetTrigger> 
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Category</SheetTitle>
          <SheetDescription>Add categories here.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CategorySheet;
