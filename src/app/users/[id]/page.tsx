import db from "@/app/db";
import UserForm from "@/components/user-form";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

export default async function EditUser({ params }: Props) {
  const session = await getServerSession(options);
  if (!session || session.user.role !== "ADMIN") {
    return <p className="text-destructive">Admin access required</p>;
  }

  const id = parseInt((await params).id);
  if (Number.isNaN(id)) {
    return <div className="text-destructive">User({id}) not found</div>;
  }

  const user = await db.user.findUnique({
    where: { id },
  });
  if (!user) {
    return <div className="text-destructive">User({id}) not found</div>;
  }

  user.password = "";
  return (
    <div>
      <UserForm user={user} />
    </div>
  );
}
