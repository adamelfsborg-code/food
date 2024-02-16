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
import { RegisterUserAction } from "@/actions/user/user"
import { handleZodFormErrors } from "@/lib/error"
import { useToast } from "./ui/use-toast"
import { TUserDtoSchema, UserDtoSchema } from "@/lib/schema/user"

export function RegisterSheet() {
  const { toast } = useToast()
  const form = useForm<TUserDtoSchema>({
    resolver: zodResolver(UserDtoSchema),
    defaultValues: {
      name: "",
      password: ""
    },
  })

  async function onSubmit(values: TUserDtoSchema) {
    const response = await RegisterUserAction(values)
    if (!response?.success && response?.error) return handleZodFormErrors<keyof TUserDtoSchema>(form, response.error)

    toast({
      description: response.message!,
    })

  }

  return (
    <Sheet>
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
                      <Input placeholder="..." {...field} />
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
                      <Input type="password" placeholder="..." {...field} />
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
