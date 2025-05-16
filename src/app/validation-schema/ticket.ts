import { Priority, Status } from "@/generated/prisma";
import { z } from "zod";

export const ticketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535, "Description must be less than 65535"),
  status: z.nativeEnum(Status),
  priority: z.nativeEnum(Priority),
});
