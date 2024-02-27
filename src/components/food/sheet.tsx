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
import { FoodCreateDtoSchema, TFoodCreateDtoSchema, TFoodTableSchema } from "@/lib/schema/food";
import { AddFoodAPI, EditFoodAPI } from "@/actions/protected/culinary/food";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "../ui/command";
import { TFoodTypeTableSchema } from "@/lib/schema/foodtype";
import { TBrandTableSchema } from "@/lib/schema/brand";

type FoodSheetProps = {
  open: boolean
  food?: TFoodTableSchema
  foodTypes: TFoodTypeTableSchema[]
  brands: TBrandTableSchema[]
};

const FoodSheet = (props: FoodSheetProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { toast } = useToast();
  const form = useForm<TFoodTableSchema>({
    resolver: zodResolver(FoodCreateDtoSchema),
    defaultValues: {
      name: props.food?.name,
      foodtype: props.food?.foodtype,
      brand: props.food?.brand,
      kcal: props.food?.kcal,
      protein: props.food?.protein,
      carbs: props.food?.carbs,
      fiber: props.food?.fiber,
      sugars: props.food?.sugars,
      fat: props.food?.fat,
      saturated: props.food?.saturated,
      unsaturated: props.food?.unsaturated,
    },
  });

  async function onSubmit(values: TFoodTableSchema) {
    if (props.food) {
      const response = await EditFoodAPI({...props.food, ...values });
    
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

      return router.push('/culinary/foods')
    }
    const response = await AddFoodAPI(values);
    
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

    return router.push('/culinary/foods')
  }

  const handleOpenChange = () => {
    setOpen(!open)
    router.push('/culinary/foods')
  }

  useEffect(() => {
    setOpen(props.open)
    form.setValue("name", props.food?.name || '');
    form.setValue("foodtype", props.food?.foodtype || '');
    form.setValue("brand", props.food?.brand || '');
    form.setValue("kcal", props.food?.kcal || 0);
    form.setValue("protein", props.food?.protein || 0);
    form.setValue("carbs", props.food?.carbs || 0);
    form.setValue("fiber", props.food?.fiber || 0);
    form.setValue("sugars", props.food?.sugars || 0);
    form.setValue("fat", props.food?.fat || 0);
    form.setValue("saturated", props.food?.saturated || 0);
    form.setValue("unsaturated", props.food?.unsaturated || 0);
  }, [props.food, props.open, form])

  return (
    <Sheet open={open} onOpenChange={handleOpenChange} >
      <SheetTrigger asChild>
        <Button variant="outline">Add</Button>
      </SheetTrigger> 
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Food</SheetTitle>
          <SheetDescription>Add foods here.</SheetDescription>
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
                name="foodtype"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Food Type</FormLabel>
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
                              ? props.foodTypes.find(
                                  (foodtype) => foodtype.id === field.value
                                )?.name
                              : "Select Food Type"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Food Types..."
                            className="h-9"
                          />
                          <CommandEmpty>No Food Types found.</CommandEmpty>
                          <CommandGroup>
                            {props.foodTypes.map((foodtype) => (
                              <CommandItem
                                value={foodtype.name}
                                key={foodtype.id}
                                onSelect={() => {
                                  form.setValue("foodtype", foodtype.id)
                                }}
                              >
                                {foodtype.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    foodtype.id === field.value
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
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Brand</FormLabel>
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
                              ? props.brands.find(
                                  (brand) => brand.id === field.value
                                )?.name
                              : "Select Brand"}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Brand..."
                            className="h-9"
                          />
                          <CommandEmpty>No Brand found.</CommandEmpty>
                          <CommandGroup>
                            {props.brands.map((brand) => (
                              <CommandItem
                                value={brand.name}
                                key={brand.id}
                                onSelect={() => {
                                  form.setValue("brand", brand.id)
                                }}
                              >
                                {brand.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    brand.id === field.value
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
              <FormField
                control={form.control}
                name="kcal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>KCAL</FormLabel>
                    <FormControl>
                      <Input placeholder="KCAL" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="protein"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Protein</FormLabel>
                    <FormControl>
                      <Input placeholder="Protein" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="carbs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Carbs</FormLabel>
                    <FormControl>
                      <Input placeholder="Carbs" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fiber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fiber</FormLabel>
                    <FormControl>
                      <Input placeholder="Fiber" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sugars"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sugars</FormLabel>
                    <FormControl>
                      <Input placeholder="Sugars" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fat</FormLabel>
                    <FormControl>
                      <Input placeholder="Fat" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="saturated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Saturated</FormLabel>
                    <FormControl>
                      <Input placeholder="Saturated" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unsaturated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unsaturated</FormLabel>
                    <FormControl>
                      <Input placeholder="Unsaturated" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{props.food ? 'Edit' : 'Add'}</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FoodSheet;
