import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/Navbars/PublicNavbar";
import Footer from "../components/Footer";

export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <main className="p-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
