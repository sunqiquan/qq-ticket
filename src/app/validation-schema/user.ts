import { Role } from "@/generated/prisma";
import { z } from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name is required")
    .max(255, "Name must be less than 255"),
  username: z
    .string()
    .min(3, "Username is required")
    .max(255, "Username must be less than 255"),
  password: z
    .string()
    .min(6, "Password is required")
    .max(255, "Username must be less than 255")
    .optional()
    .or(z.literal("")),
  role: z.nativeEnum(Role),
});
