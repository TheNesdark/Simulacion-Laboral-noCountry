"use client";

import Header from "@/components/layout/Header";
import NavBar from "@/components/layout/NavBar";
import ReportsList from "./components/ReportsList";
import "@/styles/pages/Reports.css";

export default function ReportsPage() {
  return (
    <>
      <Header />
      <main className="reports">
        <ReportsList />
      </main>
      <NavBar />
    </>
  );
}