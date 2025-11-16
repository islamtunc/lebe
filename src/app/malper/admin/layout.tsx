// Bismillahirahmanirahim 
// ElHAMDULİLLAHİRABBULALEMİN
// Es-selatu ve Es-selamu ala Resulina Muhammedin ve ala alihi ve sahbihi ecmain
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illallah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// Allah u Ekber, Allah u Ekber, Allah u Ekber, La ilahe illallah
// Subhanallah , Elhamdulillah, Allahu Ekber
// Hasbunallahu ve ni'mel vekil
// La havle ve la kuvvete illa billahil aliyyil azim

import { redirect } from "next/navigation";
import Navbar from "./Navbar";

import 'bootstrap/dist/css/bootstrap.css'
import { Row, Col, Alert } from "react-bootstrap";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
      <div
        className="flex min-h-screen flex-col"
        style={{ backgroundColor: "#22c55e" /* Tailwind'in green-500 tonu, beyazla uyumlu canlı bir yeşil */ }}
      >
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow flex-row gap-2 p-2">
        
          {/* Sol MenuBar kaldırıldı */}
          <div className="flex-1 flex flex-col">
           
            <Row>
        <Col>
          <Alert variant="success" style={{ textAlign: "center", fontSize: "18px" }}>
            Selam Aleykum dear Customer or Developer, Welcome to Admin Panel
          </Alert>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Alert
            style={{
              background: "green",
              color: "white",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            Sernameye name nameye Allah <br />
            Be namaye nameye kemi wi Wallah
          </Alert>
        </Col>
      </Row>
            {children}
          </div>
          {/* Sağ MenuBar sadece sm ve üstü ekranlarda görünür */}
        </div>
        {/* Mobilde altta MenuBar */}
        <Footer />
      </div>
  );
}






export function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-16 bg-gray-800 text-white">
      <p className="text-sm">
        © {new Date().getFullYear()} Yekazad Software Center. All rights reserved.
      </p>
      <span className="mx-2">|</span>
      <p className="text-xs text-gray-400">
        Admin Panel &mdash; Empowering your management experience.
      </p>
    </footer>
  );
  
}