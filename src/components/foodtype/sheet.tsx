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
import { FoodTypeCreateDtoSchema, TFoodTypeCreateDtoSchema, TFoodTypeTableSchema } from "@/lib/schema/foodtype";
import { AddFoodTypeAPI, EditFoodTypeAPI } from "@/actions/protected/culinary/foodtype";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { TCategoryTableSchema } from "@/lib/schema/category";

type FoodTypeSheetProps = {
  open: boolean
  foodType?: TFoodTypeTableSchema
  categories: TCategoryTableSchema[]
};

const FoodTypeSheet = (props: FoodTypeSheetProps) => {
  const router = useParamHook()
  const [open, setOpen] = useState(false)
  const { toast } = useToast();
  const form = useForm<TFoodTypeCreateDtoSchema>({
    resolver: zodResolver(FoodTypeCreateDtoSchema),
    defaultValues: {
      name: props.foodType?.name,
      category: props.foodType?.category,
    },
  });

  async function onSubmit(values: TFoodTypeCreateDtoSchema) {
    if (props.foodType) {
      const response = await EditFoodTypeAPI({...props.foodType, ...values });
    
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

      return router.push('/culinary/foodtypes')
    }

    const response = await AddFoodTypeAPI(values);
    
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

    return router.push('/culinary/foodtypes')
  }

  const handleOpenChange = () => {
    setOpen(!open)
    router.push('/culinary/foodtypes')
  }

  useEffect(() => {
    setOpen(props.open)
    form.setValue("name", props.foodType?.name || '');
    form.setValue("category", props.foodType?.category || '');
  }, [props.foodType, props.open, form])

  return (
    <Sheet open={open} onOpenChange={handleOpenChange} >
      <SheetTrigger asChild>
        <Button variant="outline">Add</Button>
      </SheetTrigger> 
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Food Type</SheetTitle>
          <SheetDescription>Add food-types here.</SheetDescription>
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
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-[200px] justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? props.categories.find(
                                  (category) => category.id === field.value
                                )?.name
                              : "Select Category"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="h-9"
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            {props.categories.map((category) => (
                              <CommandItem
                                value={category.name}
                                key={category.id}
                                onSelect={() => {
                                  form.setValue("category", category.id)
                                }}
                              >
                                {category.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    category.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                  )}
                />
              <Button type="submit">{props.foodType ? 'Edit' : 'Add'}</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FoodTypeSheet;
