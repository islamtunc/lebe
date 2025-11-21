// Bîsmîllahîrrahmanîrahîm
// Elhamdulillahi rabbi l-'âlamîn
// Esselâtu vesselâmü alâ seyyidinâ Muhammedin
// Lâ havle velâ kuvvete illâ billâhil aliyyil azîm
// Rabbi yessir velâ tu'assir rabbi temmim bil-hayr
// Allahumme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammedin
// SuphanAllahî ve bi hamdihî, subhânallahil azîm
// Estagrifullah el azîm
// La ilâhe illallah, wallahu ekber
import { lucia } from "@/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "@node-rs/bcrypt";

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  const hashed = await hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      role: role ?? "USER"
    }
  });

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return new Response("ok", {
    headers: { "Set-Cookie": sessionCookie.serialize() }
  });
}
