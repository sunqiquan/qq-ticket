/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "@/app/db";
import Pagination from "@/components/pagination";
import StatusFilter from "@/components/status-filter";
import TicketPriority from "@/components/ticket-priority";
import TicketStatusBadge from "@/components/ticket-status-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Status } from "@/generated/prisma";
import Link from "next/link";
import TicketHeader from "@/components/ticket-header";
import { type TicketParams } from "@/app/types";

export default async function Tickets({
  searchParams,
}: {
  searchParams: TicketParams;
}) {
  const params = await searchParams;
  if (!params.orderBy) params.orderBy = "createdAt";
  if (!params.direction) params.direction = "desc";

  const where: Record<string, any> = {};
  if (params.status) {
    if (params.status === "OPEN/STARTED" || params.status === "") {
      where["NOT"] = { status: Status.CLOSED };
    } else if (Object.values(Status).includes(params.status as Status)) {
      where["status"] = params.status as Status;
    }
  }

  const pageSize = 10;
  const current = parseInt(params.page) || 1;
  const total = await db.ticket.count({ where });

  const ticktes = await db.ticket.findMany({
    where,
    orderBy: { [params.orderBy]: params.direction },
    take: pageSize,
    skip: (current - 1) * pageSize,
  });

  return (
    <div className="w-full">
      <div className="flex justify-between mb-3 mr-3">
        <div className="flex items-center gap-2 ml-3">
          Status: <StatusFilter />
        </div>

        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New Ticket
        </Link>
      </div>
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TicketHeader params={params} />
          </TableHeader>
          <TableBody>
            {ticktes &&
              ticktes.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <TicketStatusBadge status={ticket.status} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <TicketPriority priority={ticket.priority} />
                    </div>
                  </TableCell>
                  <TableCell>
                    {ticket.createdAt.toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <Pagination current={current} pageSize={pageSize} total={total} />
    </div>
  );
}
