// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulina Muhammedin ve ala alihi ve sahbihi ecmain
// Suphanallah, Elhamdulillah, Allahu Ekber
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
import { validateRequest } from "@/app/malper/auth";
import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/lib/types";

export async function GET(
  req: Request,
  { params: { username } }: { params: { username: string } },
) {
  try {
    const { admin: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = await prisma.admin.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
      select: getUserDataSelect(loggedInUser.id),
    });

    if (!admin) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(admin);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
