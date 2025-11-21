// Bismillahirrahmanirrahim 
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illallah, Muhammedur Resulullah
// La havle vela kuvvete illa billah
// Astagfirullah al azim
// La ilahe illallahu wahdahu la sharika lahu,
// lahul mulku wa lahul hamdu yuhyi wa yumit
// wa huwa ala kulli shay'in qadir

"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  credentials: SignUpValues
): Promise<{ error: string | null }> {
  try {
    const { username, email, password } = signUpSchema.parse(credentials);

    // ✔ password hash — güvenli default parametreler
    const passwordHash = await hash(password);

    const userId = generateIdFromEntropySize(10);

    // ✔ username kontrolü
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: { equals: username, mode: "insensitive" },
      },
    });

    if (existingUsername) {
      return { error: "Username already taken" };
    }

    // ✔ email kontrolü
    const existingEmail = await prisma.user.findFirst({
      where: {
        email: { equals: email, mode: "insensitive" },
      },
    });

    if (existingEmail) {
      return { error: "Email already taken" };
    }

    // ✔ kullanıcı oluşturma (RBAC: role default → “user”)
    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayName: username,
        email,
        passwordHash,
        role: "user", // <-- RBAC BURADA BAŞLIYOR
      },
    });

    // ✔ session oluştur
    const session = await lucia.createSession(userId, {});
    const cookie = lucia.createSessionCookie(session.id);

    cookies().set(cookie.name, cookie.value, cookie.attributes);

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;

    console.error("[SIGNUP_ERROR]", error);
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