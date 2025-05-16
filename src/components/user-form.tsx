/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { userSchema } from "../app/validation-schema/user";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type User } from "@/generated/prisma";

type UserFormData = z.infer<typeof userSchema>;

export default function TicketForm({ user }: { user?: User }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(values: UserFormData) {
    try {
      setIsSubmitting(true);
      setError("");

      let res;
      if (user) {
        res = await axios.patch(`/api/users/${user.id}`, values);
      } else {
        res = await axios.post("/api/users", values);
      }

      console.log(res);
      setIsSubmitting(false);
      if (res.data.code !== 200) {
        setError(res.data.msg);
        return;
      }

      router.push("/tickets");
      router.refresh();
    } catch (e: any) {
      setError(e.message);
      setIsSubmitting(false);
    }
  }

  const form = useForm<UserFormData>({ resolver: zodResolver(userSchema) });

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue={user ? user.name : ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nick Name</FormLabel>
                <FormControl>
                  <Input placeholder="Nick Name ..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            defaultValue={user ? user.username : ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username ..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue={user ? user.password : ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={user ? false : true}
                    placeholder="Password ..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="role"
              defaultValue={user?.role}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Role ..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="TECH">Tech</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {user ? "Update User" : "Create User"}
          </Button>
        </form>
      </Form>
      <div className="text-red-600">{error}</div>
    </div>
  );
}
