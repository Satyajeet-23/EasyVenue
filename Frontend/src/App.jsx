import { Routes, Route } from 'react-router-dom';

import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import HomePage from './pages/user/HomePage';
import VenueList from './pages/user/VenueList';
import VenueDetails from './pages/user/VenueDetails';
import BookingForm from './pages/user/BookingForm';
import BookingSuccess from './pages/user/BookingSuccess';

// Admin Pages
import AdminVenueList from './pages/admin/AdminVenueList';
import AddVenueForm from './pages/admin/AddVenueForm';
import AvailabilityForm from './pages/admin/AvailabilityForm';
import RecentBookings from './pages/admin/RecentBookings';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<VenueList />} />
          <Route path="/venues/:venueId" element={<VenueDetails />} />
          <Route path="/book/:venueId" element={<BookingForm />} />
          <Route path="/book/:venueId/confirm" element={<BookingSuccess />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="venues" element={<AdminVenueList />} />
          <Route path="venues/new" element={<AddVenueForm />} />
          <Route path="venues/:id/availability" element={<AvailabilityForm />} />
          <Route path="bookings/recent" element={<RecentBookings />} />
        </Route>

        {/* Optional: 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}
