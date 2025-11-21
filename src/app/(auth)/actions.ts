// Bismillahirahmanirahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illallah, Muhammedur Resulullah
// La havle vela kuvvete illa billah
// Astagfirullah al azim
// La ilahe illallah, wahdahu la sharika lahu,
// lahul mulku wa lahul hamdu yuhyi wa yumit
// wa huwa ala kulli shay'in qadir

"use server";

import { lucia, validateRequest } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const { session } = await validateRequest();

  if (!session) {
    // Kullanıcı zaten logout ise yine login sayfasına döndür
    return redirect("/login");
  }

  // 1. Session DB'den silinir
  await lucia.invalidateSession(session.id);

  // 2. Tarayıcıdaki cookie temizlenir
  const blank = lucia.createBlankSessionCookie();

  cookies().set(
    blank.name,
    blank.value,
    blank.attributes
  );

  // 3. login sayfasına yönlendirilir
  redirect("/login");
}
// La ilahe illallahu wahdahu la sharika lahu,
// lahul mulku wa lahul hamdu yuhyi wa yumit
// wa huwa ala kulli shay'in qadir
// Astagfirullah al azim
// La havle vela kuvvete illa billah
// La ilahe illallah, Muhammedur Resulullah
// Subhanallah, Elhamdulillah, Allahu Ekber
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Essalatu vesselamu ala Resulina Muhammedin
// Elhamdulillahi Rabbil Alamin
