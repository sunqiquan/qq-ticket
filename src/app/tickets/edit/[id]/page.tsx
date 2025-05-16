import db from "@/app/db";
import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/ticket-form"), {
  ssr: !true,
});

interface Props {
  params: { id: string };
}

export default async function EditTicket({ params }: Props) {
  const id = parseInt((await params).id);
  if (Number.isNaN(id)) {
    return <div className="text-destructive">Ticket({id}) not found</div>;
  }

  const ticket = await db.ticket.findUnique({ where: { id } });
  if (!ticket) {
    return <div className="text-destructive">Ticket({id}) not found</div>;
  }

  return (
    <div>
      <TicketForm ticket={ticket} />
    </div>
  );
}
