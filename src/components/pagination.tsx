"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

interface Props {
  current: number;
  pageSize: number;
  total: number;
}

export default function Pagination({ current, pageSize, total }: Props) {
  const pageCount = Math.ceil(total / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageChange = (page: number) => {
    const parmas = new URLSearchParams(searchParams);
    parmas.set("page", page.toString());
    router.push("?" + parmas.toString());
  };

  if (pageCount <= 1) return null;

  return (
    <div className="mt-4">
      <div>
        <Button
          variant="outline"
          disabled={current === 1}
          onClick={() => pageChange(1)}
        >
          <ChevronFirst />
        </Button>
        <Button
          variant="outline"
          disabled={current === 1}
          onClick={() => pageChange(current - 1)}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          disabled={current === pageCount}
          onClick={() => pageChange(current + 1)}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          disabled={current === pageCount}
          onClick={() => pageChange(pageCount)}
        >
          <ChevronLast />
        </Button>
      </div>
      <div>
        <p>
          Page {current} of {pageCount}
        </p>
      </div>
    </div>
  );
}
