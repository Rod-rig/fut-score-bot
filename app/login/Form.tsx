"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@c/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@c/ui/card";
import { FieldGroup } from "@c/ui/field";
import {
  Form as UIForm,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@c/ui/form";
import { Input } from "@c/ui/input";
import { LoginSchema, LoginSchemaType } from "@s/login";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = async (data: LoginSchemaType) => {
    form.clearErrors();

    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      const error = { type: "server", message: "Invalid email or password" };
      form.setError("email", error);
      form.setError("password", error);
      return;
    }

    router.push("/");
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
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        aria-label="email"
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
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
                        id="password"
                        type="password"
                        required
                        onChange={field.onChange}
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name="password"
              />
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </FieldGroup>
          </form>
        </UIForm>
      </CardContent>
    </Card>
  );
}
