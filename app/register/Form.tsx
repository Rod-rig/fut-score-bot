"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Form as UIForm, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema, RegisterSchemaType } from "@/lib/schemas/register";
import { createUser } from "./actions";

export function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
  });
  const onSubmit = async (data: RegisterSchemaType) => {
    await createUser(data);
    const result = await signIn("credentials", { ...data, callbackUrl: "/" });
    if (result?.error) {
      console.log(result.error);
    }
  };
  return (
    <Card>
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
                  <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      onChange={field.onChange}
                    />
                  </Field>
                )}
                name="name"
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      autoComplete="new-email"
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      onChange={field.onChange}
                    />
                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your
                      email with anyone else.
                    </FieldDescription>
                  </Field>
                )}
                name="email"
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      autoComplete="new-password"
                      id="password"
                      type="password"
                      required
                      placeholder="********"
                      onChange={field.onChange}
                    />
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                  </Field>
                )}
                name="password"
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      placeholder="********"
                      onChange={field.onChange}
                    />
                    <FieldDescription>
                      Please confirm your password.
                    </FieldDescription>
                  </Field>
                )}
                name="confirmPassword"
              />
              <FieldGroup>
                <Field>
                  <Button type="submit">Create Account</Button>
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
