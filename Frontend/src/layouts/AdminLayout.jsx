import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/Navbars/AdminNavbar';

export default function AdminLayout() {
    return (
        <>
            <AdminNavbar />
            <main className="p-4 bg-gray-100 min-h-screen">
                <Outlet />
            </main>
        </>
    );
}
