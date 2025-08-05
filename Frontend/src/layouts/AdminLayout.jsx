import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footer";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <main className="p-3">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
