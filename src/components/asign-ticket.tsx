/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Ticket, User } from "@/generated/prisma";
import axios from "axios";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AsignTicket({
  ticket,
  users,
}: {
  ticket: Ticket;
  users: User[];
}) {
  const [isAsigning, setIsAsigning] = useState(false);
  const [error, setError] = useState("");

  const asignTicket = async (userId: string) => {
    try {
      setIsAsigning(true);
      setError("");
      await axios.patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === "0" ? null : parseInt(userId),
      });
      setIsAsigning(false);
    } catch (e: any) {
      setError(e.message);
      setIsAsigning(false);
    }
  };

  return (
    <>
      <Select
        defaultValue={ticket.assignedToUserId?.toString() || "0"}
        onValueChange={asignTicket}
        disabled={isAsigning}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder="Select User ..."
            defaultValue={ticket.assignedToUserId?.toString() || "0"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassigned</SelectItem>
          {users.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </>
  );
}
