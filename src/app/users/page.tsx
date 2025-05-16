import UserForm from "@/components/user-form";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import db from "../db";
import Link from "next/link";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

export default async function Users() {
  const session = await getServerSession(options);
  if (!session || session.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin access required</p>;
  }

  const users = await db.user.findMany();

  return (
    <div>
      <UserForm />
      {users ? (
        <div className="w-full mt-5">
          <div className="rounded-md sm:border">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary hover:bg-secondary/80">
                  <TableHead className="font-medium">Full Name</TableHead>
                  <TableHead className="font-medium">User Name</TableHead>
                  <TableHead className="font-medium">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/users/${user.id}`}>{user.username}</Link>
                    </TableCell>
                    <TableCell className="font-medium">
                      <Link href={`/users/${user.id}`}>{user.role}</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : null}
    </div>
  );
}
