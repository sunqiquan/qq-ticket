import db from "@/app/db";
import TicketDetail from "./ticket-detail";

interface Props {
  params: { id: string };
}

export default async function ViewTicket({ params }: Props) {
  const id = parseInt((await params).id);
  if (Number.isNaN(id)) {
    return <div className="text-destructive">Ticket({id}) not found</div>;
  }

  const ticket = await db.ticket.findUnique({ where: { id } });
  if (!ticket) {
    return <div className="text-destructive">Ticket({id}) not found</div>;
  }

  const users = await db.user.findMany();

  return <TicketDetail ticket={ticket} users={users} />;
}
