import { Prisma } from "@/generated/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TicketStatusBadge from "./ticket-status-badge";
import Link from "next/link";
import TicketPriority from "./ticket-priority";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

export default function DashRecentTickets({
  tickets,
}: {
  tickets: TicketWithUser[];
}) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Updated</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {tickets
            ? tickets.map((ticket) => (
                <div key={ticket.id} className="flex items-center">
                  <TicketStatusBadge status={ticket.status} />
                  <div className="ml-4 space-y-1">
                    <Link href={`/tickets/${ticket.id}`}>
                      <p>{ticket.title}</p>
                      <p>{ticket.assignedToUser?.name || "Unassigned"}</p>
                    </Link>
                  </div>
                  <div className="ml-auto font-medium">
                    <TicketPriority priority={ticket.priority} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </CardContent>
    </Card>
  );
}
