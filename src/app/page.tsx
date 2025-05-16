// "use client";

import db from "@/app/db";
import DashChart from "@/components/dash-chart";
import DashRecentTickets from "@/components/dash-recent-tickets";

export default async function Dashboard() {
  const tickets = await db.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTicket = await db.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const chartData = groupTicket.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRecentTickets tickets={tickets} />
        </div>
        <div>
          <DashChart data={chartData} />
        </div>
      </div>
    </div>
  );
}
