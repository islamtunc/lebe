// Bismillahirrahmanirahim
// ElHAMDULİLLAHİRABBULALEMİN
// Es-selatu ve Es-selamu ala Resulina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illallah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illallah
// Subhanallah , Elhamdulillah, Allahu Ekber
// Hasbunallahu ve ni'mel vekil
// La havle ve la kuvvete illa billahil aliyyil azim
import { cookies } from "next/headers";
import { lucia } from "@/auth";

export async function requireRole(allowedRoles: string[]) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value;
  if (!sessionId) return null;

  const { user } = await lucia.validateSession(sessionId);
  if (!user) return null;

  return allowedRoles.includes(user.role) ? user : null;
}
