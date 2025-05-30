import prisma from "@/lib/prisma";
import { UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
  orgId: number;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: await bcrypt.hash(body.password, 10),
      role: UserRole.USER,
      orgId: body.orgId,
    },
  });

  const { password, ...result } = user;
  return new Response(JSON.stringify(result));
}
