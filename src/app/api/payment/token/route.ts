// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah ve ala alihi ve sahbihi ecmain
// Allahumme salli ala seyyidina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illallah, Allahu Ekber, Allahu Ekber, ve lillahi'l-hamd
import crypto from "crypto";

export async function POST(req: Request) {
  const {
    user_id,
    email,
    amount,
    name,
    return_url,
    cancel_url
  } = await req.json();

  const MERCHANT_ID = process.env.PAYTR_MERCHANT_ID!;
  const MERCHANT_KEY = process.env.PAYTR_MERCHANT_KEY!;
  const MERCHANT_SALT = process.env.PAYTR_MERCHANT_SALT!;

  // PAYTR format: amount → kuruş olarak gönderilir
  const payment_amount = amount * 100;

  // Ödeme bilgileri
  const user_ip = "127.0.0.1"; // production'da gerçek IP al
  const user_basket = Buffer.from(
    JSON.stringify([[name, amount.toString(), "1"]])
  ).toString("base64");

  const no_installment = 0;
  const max_installment = 12;
  const currency = "TL";
  const test_mode = process.env.PAYTR_SANDBOX === "1" ? 1 : 0;

  // PAYTR HASH
  const hash_str =
    MERCHANT_ID +
    user_ip +
    user_id +
    email +
    payment_amount +
    user_basket +
    no_installment +
    max_installment +
    currency +
    test_mode +
    MERCHANT_SALT;

  const paytr_token = crypto
    .createHmac("sha256", MERCHANT_KEY)
    .update(hash_str)
    .digest("base64");

  const formData = new URLSearchParams({
    merchant_id: MERCHANT_ID,
    user_ip,
    merchant_oid: `order_${Date.now()}`,
    email,
    payment_amount: payment_amount.toString(),
    paytr_token,
    user_basket,
    no_installment: no_installment.toString(),
    max_installment: max_installment.toString(),
    currency,
    test_mode: test_mode.toString(),
    merchant_ok_url: return_url,
    merchant_fail_url: cancel_url,
  });

  // PAYTR API'ye istek gönder
  const response = await fetch("https://www.paytr.com/odeme/api/get-token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData,
  });

  const data = await response.json();

  if (data.status !== "success") {
    return Response.json({ error: data.reason }, { status: 400 });
  }

  return Response.json({
    token: data.token,
    iframeUrl: `https://www.paytr.com/odeme/guvenli/${data.token}`,
  });
}
// Bismillahirrahmanirrahim 
// Elhamdulillahirabbulalemin
// Esselatu vesselamu ala rasulillah ve ala alihi ve sahbihi ecmain
// Allahumme salli ala seyyidina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah u Ekber, Allahu Ekber, Allahu Ekber
// La ilahe illallah, Allahu Ekber, Allahu Ekber, ve lillahi'l-hamd