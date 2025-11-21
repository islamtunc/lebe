// Bîsmîllahîrrahmanîrahîm
// Elhamdulillahi rabbi l-'âlamîn
// Esselâtu vesselâmü alâ seyyidinâ Muhammedin
// Lâ havle velâ kuvvete illâ billâhil aliyyil azîm
// Rabbi yessir velâ tu'assir rabbi temmim bil-hayr
// Allahumme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammedin
// SuphanAllahî ve bi hamdihî, subhânallahil azîm
// Estagrifullah el azîm
// La ilâhe illallah, wallahu ekber
// Bîsmîllahîrrahmanîrahîm
// Elhamdulillahi rabbi l-'âlamîn
// Esselâtu vesselâmü alâ seyyidinâ Muhammedin
// Lâ havle velâ kuvvete illâ billâhil aliyyil azîm
// Rabbi yessir velâ tu'assir rabbi temmim bil-hayr
// Allahumme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammedin

"use client";

import { Session, User } from "lucia";
import React, { createContext, useContext } from "react";

interface SessionContext {
  user: User & {
    role: "admin" | "user";
  };
  session: Session | null;
}

const SessionContext = createContext<SessionContext | null>(null);

export default function SessionProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: SessionContext }>) {
  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }

  return context;
}
// Elhamdulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbulalemin
// Lâ havle velâ kuvvete illâ billâhil aliyyil azîm
// Allahumme salli alâ seyyidinâ Muhammedin ve alâ âli seyyidinâ Muhammedin
// SuphanAllahî ve bi hamdihî, subhânallahil azîm
// Estagrifullah el azîm
// La ilâhe illallah, wallahu ekber