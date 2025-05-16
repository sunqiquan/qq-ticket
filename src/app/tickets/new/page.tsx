import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/ticket-form"), {
  ssr: !true,
});

export default function NewTicket() {
  return (
    <div>
      <TicketForm />
    </div>
  );
}
