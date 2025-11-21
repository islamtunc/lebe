// Bismillahirrahmanirahim
// Elhamdulillahirabbulalemin
// Ve salatu ve selamu ala resulina Muhammedin ve alihi ve sahbihi ecmain
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// Estağfirullah El-Azim
// La ilahe illallah, Muhammedur Resulullah

import { requireRole } from "@/lib/middlew";

export default async function Page() {
  const user = await requireRole(["USER", "ADMIN"]);

  if (user) return <h1>Redirecting...</h1>;

  return <h1>Guest Page - Public</h1>;
}

