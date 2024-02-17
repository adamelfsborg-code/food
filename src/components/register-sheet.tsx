import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { RegisterAPI, RegisterUserAction } from "@/actions/user/user"
import { handleZodFormErrors } from "@/lib/error"
import { useToast } from "./ui/use-toast"
import { TUserDtoSchema, UserDtoSchema } from "@/lib/schema/user"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction, useEffect, useState } from "react"

type RegisterSheetProps = {
  open: boolean,
}

export function RegisterSheet(props: RegisterSheetProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const form = useForm<TUserDtoSchema>({
    resolver: zodResolver(UserDtoSchema),
    defaultValues: {
      name: "",
      password: ""
    },
  })

  async function onSubmit(values: TUserDtoSchema) {
    const response = await RegisterAPI(values)
    if (!response?.success && response?.error) return handleZodFormErrors<keyof TUserDtoSchema>(form, response.error)

    toast({
      className: cn(
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
      ),
      description: response.message,
    });

  }

  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

  return (
    <Sheet open={open}>
      <SheetTrigger asChild>
        <Button variant='outline'>Register</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Register</SheetTitle>
          <SheetDescription>
            Create your account here
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Register</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
