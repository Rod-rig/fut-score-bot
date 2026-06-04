"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@c/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@c/ui/card";
import { Field, FieldDescription, FieldGroup } from "@c/ui/field";
import {
  Form as UIForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@c/ui/form";
import { Input } from "@c/ui/input";
import { RegisterSchema, RegisterSchemaType } from "@s/register";
import { createUser } from "./actions";

export function RegisterForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const form = useForm<RegisterSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    form.clearErrors();
    const createUserResult = await createUser(data, id);
    if (createUserResult) {
      await signIn("credentials", { ...data, callbackUrl: "/" });
    }
  };
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UIForm {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        aria-label="name"
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        required
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="name"
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        aria-label="email"
                        autoComplete="new-email"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your
                      email with anyone else.
                    </FieldDescription>
                  </FormItem>
                )}
                name="email"
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        aria-label="password"
                        autoComplete="new-password"
                        id="password"
                        type="password"
                        required
                        placeholder="********"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                    <FieldDescription>
                      Must be at least 6 characters long.
                    </FieldDescription>
                  </FormItem>
                )}
                name="password"
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="confirm-password">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        aria-label="confirm-password"
                        autoComplete="new-password"
                        id="confirm-password"
                        type="password"
                        required
                        placeholder="********"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                    <FieldDescription>
                      Please confirm your password.
                    </FieldDescription>
                  </FormItem>
                )}
                name="confirmPassword"
              />
              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting
                      ? "Creating account..."
                      : "Create Account"}
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <a href="/login">Sign in</a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </UIForm>
      </CardContent>
    </Card>
  );
}
