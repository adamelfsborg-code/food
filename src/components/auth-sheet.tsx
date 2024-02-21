import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import { LoginAPI, RegisterAPI } from "@/actions/user";
import { handleZodFormErrors } from "@/lib/error";
import { TUserDtoSchema, UserDtoSchema } from "@/lib/schema/user";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import { Input } from "./ui/input";

type AuthSheetProps = {
  open: boolean;
};

const AuthSheet = (props: AuthSheetProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<TUserDtoSchema>({
    resolver: zodResolver(UserDtoSchema),
    defaultValues: {
      name: "",
      password: "",
    },
  });

  async function onRegister(values: TUserDtoSchema) {
    const response = await RegisterAPI(values);
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
  }

  async function onLogin(values: TUserDtoSchema) {
    const response = await LoginAPI(values);
    
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
  }


  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <Sheet open={open}>
      <SheetContent>
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <SheetHeader>
              <SheetTitle>Login</SheetTitle>
              <SheetDescription>Login to your account here.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onLogin)}
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
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Login</Button>
                </form>
              </Form>
            </div>
          </TabsContent>
          <TabsContent value="register">
            <SheetHeader>
              <SheetTitle>Register</SheetTitle>
              <SheetDescription>Create your account here.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onRegister)}
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
                          <Input
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Register</Button>
                </form>
              </Form>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default AuthSheet;
