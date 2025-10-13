import "@styles/pages/Home.css";
import Header from "@/components/layout/Header";
import SearchBar from "./components/SearchBar";
import CategoryCards from "./components/CategoryCards";
import AppointmentsList from "./components/AppointmentsList";
import NavBar from "@/components/layout/NavBar";

export default function Index() {
  return (
    <>
      <Header />
      <main>
        <SearchBar />
        <CategoryCards />
        <AppointmentsList />
      </main>
      <NavBar />
    </>
  );
}
