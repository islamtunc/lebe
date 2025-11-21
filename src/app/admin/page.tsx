// Bismillahirrahmanirahim
// Elhamdulillahirabbulalemin
// Es-selatu vesselamu ala rasulina Muhammedin ve ala alihi ve sahbihi ecmain
// La havle ve la kuvvete illa billahil aliyyil azim
// Allah u Ekber
// La ilahe illallah Muhammedur Resulullah
// Subhanallah, Elhamdulillah, Allahu Ekber, La ilahe illallah
// Estağfirulllah El-Azim
import { requireRole } from "@/lib/middlew";

export default async function Page() {
  const user = await requireRole(["ADMIN"]);

  if (!user) {
    return <h1>Unauthorized</h1>;
    // or redirect("/login")
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Welcome: {user.email}</p>
    </div>
  );
}
