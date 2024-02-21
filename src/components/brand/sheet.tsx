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
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { BrandCreateDtoSchema, TBrandCreateDtoSchema, TBrandTableSchema } from "@/lib/schema/brand";
import { AddBrandAPI, EditBrandAPI } from "@/actions/protected/culinary/brand";

type BrandSheetProps = {
  open: boolean
  brand?: TBrandTableSchema
};

const BrandSheet = (props: BrandSheetProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { toast } = useToast();
  const form = useForm<TBrandCreateDtoSchema>({
    resolver: zodResolver(BrandCreateDtoSchema),
    defaultValues: {
      name: props.brand?.name,
    },
  });

  async function onSubmit(values: TBrandCreateDtoSchema) {
    if (props.brand) {
      const response = await EditBrandAPI({...props.brand, ...values });
    
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

      return router.push('/culinary/brands')
    }

    const response = await AddBrandAPI(values);
    
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

    return router.push('/culinary/brands')
  }

  const handleOpenChange = () => {
    setOpen(!open)
    router.push('/culinary/brands')
  }

  useEffect(() => {
    setOpen(props.open)
    form.setValue("name", props.brand?.name || '');
  }, [props.brand, props.open, form])

  return (
    <Sheet open={open} onOpenChange={handleOpenChange} >
      <SheetTrigger asChild>
        <Button variant="outline">Add</Button>
      </SheetTrigger> 
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Brand</SheetTitle>
          <SheetDescription>Add brands here.</SheetDescription>
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
              <Button type="submit">{props.brand ? 'Edit' : 'Add'}</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BrandSheet;
