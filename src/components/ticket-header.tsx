"use client";
import { type Ticket } from "@/generated/prisma";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TableHead, TableRow } from "./ui/table";
import { useRouter } from "next/navigation";
import { type TicketParams } from "@/app/types";

export default function TicketHeader({ params }: { params: TicketParams }) {
  const router = useRouter();

  const handleOrder = (field: keyof Ticket) => {
    const search = new URLSearchParams();
    if (params.status) search.set("status", params.status);
    if (params.page) search.set("page", params.page);
    search.set("orderBy", field);
    search.set(
      "direction",
      field !== params.orderBy
        ? params.direction
        : params.direction === "asc"
        ? "desc"
        : "asc"
    );
    router.push(`/tickets?${search.toString()}`);
  };

  return (
    <TableRow>
      <TableHead
        onClick={() => handleOrder("title")}
        className="cursor-pointer"
      >
        Title
        {params.orderBy === "title" &&
          (params.direction === "asc" ? (
            <ArrowUp className="inline p-1" />
          ) : (
            <ArrowDown className="inline p-1" />
          ))}
      </TableHead>
      <TableHead
        onClick={() => handleOrder("status")}
        className="cursor-pointer"
      >
        <div className="flex justify-center">
          Status
          {params.orderBy === "status" &&
            (params.direction === "asc" ? (
              <ArrowUp className="inline p-1" />
            ) : (
              <ArrowDown className="inline p-1" />
            ))}
        </div>
      </TableHead>
      <TableHead
        onClick={() => handleOrder("priority")}
        className="cursor-pointer"
      >
        <div className="flex justify-center">
          Priority
          {params.orderBy === "priority" &&
            (params.direction === "asc" ? (
              <ArrowUp className="inline p-1" />
            ) : (
              <ArrowDown className="inline p-1" />
            ))}
        </div>
      </TableHead>
      <TableHead
        onClick={() => handleOrder("createdAt")}
        className="cursor-pointer"
      >
        Created At
        {params.orderBy === "createdAt" &&
          (params.direction === "asc" ? (
            <ArrowUp className="inline p-1" />
          ) : (
            <ArrowDown className="inline p-1" />
          ))}
      </TableHead>
    </TableRow>
  );
}
