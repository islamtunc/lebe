// Bîsmîllahîrrahmanîrahîm
// Elhamdulillahi rabbi l-'âlamîn
// Esselâtu vesselâmü alâ seyyidinâ Muhammedin
// Lâ havle velâ kuvvete illâ billâhil aliyyil azîm
// Rabbi yessir velâ tu'assir rabbi temmim bil-hayr
// Allahumme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammedin
// SuphanAllahî ve bi hamdihî, subhânallahil azîm
// Estagrifullah el azîm
// La ilâhe illallah, wallahu ekber

import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { verify } from "@node-rs/bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return new Response("Invalid", { status: 401 });

  if (!await verify(user.password, password)) {
    return new Response("Invalid", { status: 401 });
  }

  const session = await lucia.createSession(user.id, {});
  const cookie = lucia.createSessionCookie(session.id);

  return new Response("ok", {
    headers: { "Set-Cookie": cookie.serialize() }
  });
}
