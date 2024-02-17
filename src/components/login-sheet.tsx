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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { LoginUserAction } from "@/actions/user/user"
import { TUserLoginSchema, UserLoginSchema } from "@/lib/schema/user"
import { handleZodFormErrors } from "@/lib/error"
import { useState } from "react"

export function LoginSheet() {
  const [sheetOpen, setSheetOpen] = useState(true);

  const form = useForm<TUserLoginSchema>({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      name: "Adam Elfsborg",
      password: "TrojanBaoz42!"
    },
  })

  async function onSubmit(values: TUserLoginSchema) {
    const response = await LoginUserAction(values)
    if (!response?.success && response?.error) return handleZodFormErrors<keyof TUserLoginSchema>(form, response.error)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' >Login</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Login</SheetTitle>
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
              <Button type="submit">Login</Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  )
}
