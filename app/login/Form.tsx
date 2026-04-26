"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { Button } from "@c/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@c/ui/card";
import { Field, FieldGroup, FieldLabel } from "@c/ui/field";
import { Form as UIForm, FormField } from "@c/ui/form";
import { Input } from "@c/ui/input";
import { LoginSchema, LoginSchemaType } from "@s/login";

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
    <Card className="max-w-2xl mx-auto">
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
                      aria-label="email"
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
                      aria-label="password"
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
  );
}
