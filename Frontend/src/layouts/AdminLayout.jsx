import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/Navbars/AdminNavbar";

export default function AdminLayout() {
  return (
    <>
      <AdminNavbar />
      <main className="p-3">
        <Outlet />
      </main>
    </>
  );
}
