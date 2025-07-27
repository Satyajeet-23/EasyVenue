import { Outlet } from 'react-router-dom';
import PublicNavbar from '../components/Navbars/PublicNavbar';

export default function PublicLayout() {
    return (
        <>
            <PublicNavbar />
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
}
