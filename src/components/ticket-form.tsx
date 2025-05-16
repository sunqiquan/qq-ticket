/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { ticketSchema } from "../app/validation-schema/ticket";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import SimpleMED from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
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
import { type Ticket } from "@/generated/prisma";

type TicketFormData = z.infer<typeof ticketSchema>;

export default function TicketForm({ ticket }: { ticket?: Ticket }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(values: TicketFormData) {
    try {
      setIsSubmitting(true);
      setError("");

      let res;
      if (ticket) {
        res = await axios.patch(`/api/tickets/${ticket.id}`, values);
      } else {
        res = await axios.post("/api/tickets", values);
      }

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

  const form = useForm<TicketFormData>({ resolver: zodResolver(ticketSchema) });

  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket ? ticket.title : ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ticket Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Title ..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="description"
            defaultValue={ticket?.description}
            render={({ field }) => (
              <SimpleMED placeholder="Description ..." {...field} />
            )}
          />
          <div className="flex w-full space-x-4">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Status ..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority ..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">Low</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {ticket ? "Update Ticket" : "Create Ticket"}
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/tickets")}
            className="ml-4"
          >
            Back to List
          </Button>
        </form>
      </Form>
      <div className="text-destructive">{error}</div>
    </div>
  );
}
