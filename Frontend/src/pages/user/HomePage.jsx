import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Building,
} from "lucide-react";

function HomePage() {
  return (
    <>
      <div className="py-25 mt-15">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Brand Logo and Title */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <h1 className="flex-none text-6xl font-extrabold text-gray-900 leading-tight">
              Welcome To
            </h1>
            {/* MapPin icon serves as brand identifier */}
            <MapPin className="h-12 w-12 text-blue-900 ml-3" />
            <h1 className="text-6xl font-extrabold text-gray-900 leading-tight">
              Easy<span className="text-blue-800">Venue</span>
            </h1>
          </div>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Discover and book the perfect venue for your next event — fast,
            easy, and hassle-free. Whether it's a corporate meeting or a
            wedding, we've got the right space for you
          </p>

          {/* PRIMARY CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-3">
            {/* View Venues Button - Primary Action */}
            <Link to="/venues">
              <button className="group relative px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold tracking-wide uppercase text-sm border border-blue-700/50 hover:border-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-700 shadow-[0_0_15px_rgba(37,99,235,0.25)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:translate-y-1 active:shadow-[0_0_10px_rgba(37,99,235,0.4)] active:scale-[0.98]">
                <span className="flex items-center gap-3 relative">
                  {/* Calendar icon for venue browsing */}
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  >
                    <path d="M19 3h-2V1h-2v2H9V1H7v2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V9h14v10zm0-12H5V5h14v2z" />
                  </svg>
                  View Venues
                  {/* Arrow icon for direction indication */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 transition-all duration-300 group-hover:translate-x-1"
                  >
                    <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </span>
                {/* Glowing effect layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg rounded-lg"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-700 opacity-15 group-hover:opacity-25 blur-lg rounded-lg transition-all duration-300 group-hover:blur-xl"></div>
              </button>
            </Link>

            {/* Admin Panel Button - Secondary Action */}
            <Link to="/admin/venues">
              <button className="group relative px-8 py-4 rounded-lg bg-gray-900 text-gray-200 font-semibold tracking-wide uppercase text-sm border border-gray-600/50 hover:border-gray-500 transition-all duration-300 ease-in-out hover:text-white hover:bg-black shadow-[0_0_15px_rgba(75,85,99,0.25)] hover:shadow-[0_0_25px_rgba(75,85,99,0.4)] active:translate-y-1 active:shadow-[0_0_10px_rgba(75,85,99,0.4)] active:scale-[0.98]">
                <span className="flex items-center gap-3 relative">
                  {/* Star icon for admin privileges */}
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 transition-transform duration-300 group-hover:rotate-75"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Admin Panel
                  {/* Checkmark icon for admin access */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 transition-all duration-300 group-hover:scale-125"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </span>
                {/* Glowing effect layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg rounded-lg"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-600 to-gray-800 opacity-15 group-hover:opacity-25 blur-lg rounded-lg transition-all duration-300 group-hover:blur-xl"></div>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      {/* Showcase key benefits and features of EasyVenue platform */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Why Choose EasyVenue?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We make venue booking simple, transparent, and efficient for
              everyone with our cutting-edge platform.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Prime Locations */}
            <Link to="/venues" aria-label="Explore venues in prime locations">
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-300">
                {/* Floating Icon */}
                <div className="absolute -top-6 left-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-5 group-hover:text-blue-600 transition-colors duration-300">
                    Prime Locations
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Discover venues in the best locations across the city,
                    perfect for any event type with excellent accessibility.
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Explore Locations</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Feature 2: Easy Booking */}
            <Link to="/venues" aria-label="Experience easy venue booking">
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-300">
                {/* Floating Icon */}
                <div className="absolute -top-6 left-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-6 h-6" />
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-5 group-hover:text-green-600 transition-colors duration-300">
                    Easy Booking
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Book your preferred venue in just a few clicks with our
                    streamlined booking process and instant confirmation.
                  </p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Start Booking</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Feature 3: Any Capacity */}
            <Link to="/venues" aria-label="Find venues for any capacity">
              <div className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-300">
                {/* Floating Icon */}
                <div className="absolute -top-6 left-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6" />
                  </div>
                </div>
                <div className="pt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-5 group-hover:text-purple-600 transition-colors duration-300">
                    Any Capacity
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    From intimate gatherings to large events, find venues that
                    fit your guest count perfectly with flexible arrangements.
                  </p>
                  <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>Find Venues</span>
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURED VENUES SECTION */}

      {/* Display premium venue options with real data */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Venues
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore some of our most popular and highly-rated venues trusted
              by thousands of customers
            </p>
          </div>

          {/* Venue Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Venue Card 1: Ocean Breeze */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              {/* Venue Image Header */}
              <div className="relative h-64 bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                <Building className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />

                {/* Premium Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold">
                    Premium
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-300 fill-current"
                    />
                  ))}
                </div>
              </div>

              {/* Venue Information */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    Ocean Breeze
                  </h3>
                  {/* Availability Status */}
                  <div className="flex items-center bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                    Available
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  Perfect for lively parties and elegant gatherings, with modern
                  amenities and a vibrant atmosphere.
                </p>

                {/* Venue Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      <span>100+ guests</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Goa</span>
                    </div>
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">
                      ₹5,000
                    </span>
                    <span className="text-xl"> /</span>PerHour
                  </div>
                  <Link to="/venues/5">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Venue Card 2: Serene Valley */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              {/* Venue Image Header */}
              <div className="relative h-64 bg-gradient-to-br from-green-400 via-green-500 to-green-600 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                <Building className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />

                {/* Business Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold">
                    Business
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-300 fill-current"
                    />
                  ))}
                  <Star className="w-4 h-4 text-gray-300" />
                </div>
              </div>

              {/* Venue Information */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                    Serene Valley
                  </h3>
                  {/* Popularity Badge */}
                  <div className="flex items-center bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                    Popular
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  Ideal for business meetings and seminars, equipped with
                  state-of-the-art technology and professional amenities.
                </p>

                {/* Venue Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      <span>200+ guests</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Bangalore</span>
                    </div>
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-green-600">
                      ₹5,500
                    </span>
                    <span className="text-xl"> /</span>PerHour
                  </div>
                  <Link to="/venues/13">
                    <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Venue Card 3: Amber Palace */}
            <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
              {/* Venue Image Header */}
              <div className="relative h-64 bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                <Building className="w-20 h-20 text-white group-hover:scale-110 transition-transform duration-300" />

                {/* Luxury Badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-semibold">
                    Luxury
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="absolute bottom-4 left-4 flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-300 fill-current"
                    />
                  ))}
                </div>
              </div>

              {/* Venue Information */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                    Amber Palace
                  </h3>
                  {/* Trending Badge */}
                  <div className="flex items-center bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                    Trending
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  Experience timeless grandeur at this Royal Palace, perfect for
                  majestic celebrations and elegant gatherings.
                </p>

                {/* Venue Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Users className="w-4 h-4 mr-1" />
                      <span>150+ guests</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Udaipur</span>
                    </div>
                  </div>
                </div>

                {/* Pricing and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-purple-600">
                      ₹6,000
                    </span>
                    <span className="text-xl"> /</span>PerHour
                  </div>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALL TO ACTION SECTION */}
      {/* Final conversion section with gradient background */}
      <div className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-2xl overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/3 rounded-full -translate-x-32 -translate-y-32"></div>
        </div>

        {/* CTA Content */}
        <div className="relative max-w-5xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Book Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Perfect Venue?
            </span>
          </h2>

          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who found their ideal event
            space with EasyVenue. Experience seamless booking and exceptional
            service.
          </p>

          {/* Primary CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/venues"
              className="group relative px-6 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105"
            >
              <span className="flex items-center">
                Get Started Today
                <ArrowRight className="ml-1.5 mt-1 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center space-x-8 text-white/80">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-300 mr-2" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>10k+ Happy Customers</span>
            </div>
            <div className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              <span>500+ Venues</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
