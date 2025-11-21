// Bismillahirrahmanirahim
// ElHAMDULİLLAHİRABBULALEMİN
// Es-selatu ve Es-selamu ala Resulina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illallah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illallah
// Subhanallah , Elhamdulillah, Allahu Ekber
// Hasbunallahu ve ni'mel vekil
// La havle ve la kuvvete illa billahil aliyyil azim
"use client";

import { useState } from "react";

export default function PaymentPage() {
  const [iframeUrl, setIframeUrl] = useState("");

  const startPayment = async () => {
    const res = await fetch("/api/paytr/token", {
      method: "POST",
      body: JSON.stringify({
        user_id: "123",
        email: "user@test.com",
        name: "Ürün Adı",
        amount: 100,
        return_url: "https://localhost:3000/payment/success",
        cancel_url: "https://localhost:3000/payment/fail",
      }),
    });

    const data = await res.json();
    if (data.token) {
      setIframeUrl(data.iframeUrl);
    }
  };

  return (
    <div>
      <button onClick={startPayment}>Ödeme Başlat</button>

      {iframeUrl && (
        <iframe
          src={iframeUrl}
          style={{ width: "100%", height: "600px", border: "0" }}
        ></iframe>
      )}
    </div>
  );
}
