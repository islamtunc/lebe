// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah ve ala alihi ve sahbihi ecmain
// Allahumme salli ala seyyidina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illallah, Allahu Ekber, Allahu Ekber, ve lillahi'l-hamd
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.formData();

  const merchant_oid = body.get("merchant_oid") as string;
  const status = body.get("status") as string;
  const total_amount = body.get("total_amount") as string;
  const hash = body.get("hash") as string;

  const MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY!;
  const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT!;

  const hash_str =
    merchant_oid + MERCHANT_SALT + status + total_amount;

  const my_hash = crypto
    .createHmac("sha256", MERCHANT_KEY)
    .update(hash_str)
    .digest("base64");

  if (hash !== my_hash) {
    return new Response("PAYTR notification failed", { status: 400 });
  }

  if (status === "success") {
    console.log("Ödeme başarılı:", merchant_oid);
    // TODO: Order → Paid olarak işaretle
  } else {
    console.log("Ödeme başarısız:", merchant_oid);
  }

  return new Response("OK"); // PAYTR OK bekliyor
}
// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah ve ala alihi ve sahbihi ecmain
// Allahumme salli ala seyyidina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illallah, Allahu Ekber, Allahu Ekber, ve lillahi'l-hamd