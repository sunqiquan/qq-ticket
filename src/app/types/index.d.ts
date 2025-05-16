/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Ticket } from "@/generated/prisma";

export interface Result<T = any> {
  code: number;
  msg: string;
  data?: T;
}

export interface TicketParams {
  status: string;
  page: string;
  orderBy: keyof Ticket;
  direction: "asc" | "desc";
}
