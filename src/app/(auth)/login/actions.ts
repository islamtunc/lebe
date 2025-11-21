// Bismillahirahmanirahim
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illallah, Muhammedur Resulullah
// La havle vela kuvvete illa billah
// Astagfirullah al azim
// La ilahe illallahu  wahdahu la sharika lahu,
// lahul mulku wa lahul hamdu yuhyi wa yumit
// wa huwa ala kulli shay'in qadir

"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function login(
  credentials: LoginValues
): Promise<{ error: string | null }> {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const existingUser = await prisma.user.findFirst({
      where: {
        username: { equals: username, mode: "insensitive" },
      },
    });

    // Kullanıcı yoksa
    if (!existingUser || !existingUser.passwordHash) {
      return { error: "Incorrect username or password" };
    }

    // Şifre doğrulama
    const validPassword = await verify(existingUser.passwordHash, password);

    if (!validPassword) {
      return { error: "Incorrect username or password" };
    }

    // RBAC: user.role zaten mevcut
    // Eğer admin değilse, admin paneline yönlendirme engellemesi
    // Örn: if (existingUser.role !== "admin") return { error: "Access denied" };

    const session = await lucia.createSession(existingUser.id, {});

    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    // Login başarılı → home'a yönlendir
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error("[LOGIN_ERROR]", error);
    return { error: "Something went wrong. Please try again." };
  }
}
// Subhanallah, Elhamdulillah, Allahu Ekber, La ilahe illallah
// Estağfirulllah El-Azim
// Elhmadulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbulalemin
// La havle ve la kuvvete illa billahil aliyyil azim
// Allah u Ekber
// La ilahe illallah Muhammedur Resulullah
// Subhanallah, Elhamdulillah, Allahu Ekber, La ilahe illallah
// Estağfirulllah El-Azim
// Elhmadulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbulalemin
// La havle ve la kuvvete illa billahil aliyyil azim
// Allah u Ekber