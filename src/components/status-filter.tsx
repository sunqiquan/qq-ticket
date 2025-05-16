"use client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SelectGroup } from "@radix-ui/react-select";

const statuses: { label: string; value: string }[] = [
  { label: "All", value: "ALL" },
  { label: "Open / Started", value: "OPEN/STARTED" },
  { label: "Open", value: "OPEN" },
  { label: "Started", value: "STARTED" },
  { label: "Closed", value: "CLOSED" },
];

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div>
      <Select
        defaultValue={searchParams.get("status") || ""}
        onValueChange={(status) => {
          router.push(`/tickets${status ? `?status=${status}` : ""}`);
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by Status ..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
