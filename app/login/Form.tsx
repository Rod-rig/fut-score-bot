"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Form as UIForm, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginSchemaType } from "@/lib/schemas/login";

export function LoginForm() {
  const [error, setError] = useState<string | undefined>();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = async (data: LoginSchemaType) => {
    setError(undefined);
    const result = await signIn("credentials", { ...data, callbackUrl: "/" });
    if (result?.error) {
      setError("Wrong email or password");
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <UIForm {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                        onChange={field.onChange}
                      />
                    </Field>
                  )}
                  name="email"
                />
                <FormField
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        onChange={field.onChange}
                        placeholder="********"
                      />
                    </Field>
                  )}
                  name="password"
                />
                <Field>
                  {error}
                  <Button type="submit">Login</Button>
                </Field>
              </FieldGroup>
            </form>
          </UIForm>
        </CardContent>
      </Card>
    </div>
  );
}
