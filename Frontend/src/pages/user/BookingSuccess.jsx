import { Link } from "react-router-dom";
import { CheckCircle, Building2, Sparkles } from "lucide-react";

export default function BookingSuccess() {
  return (
    <div className="h-[80vh] flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* SUCCESS CARD */}
        <div className="relative bg-white rounded-3xl shadow-xl border border-slate-200/60 overflow-hidden">
          {/* BACKGROUND DESIGN ELEMENTS */}
          {/* Subtle gradient overlay for visual appeal */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5"></div>
          {/* Top accent bar with gradient */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500"></div>

          {/* SUCCESS CONTENT */}
          <div className="relative text-center px-8 py-10">
            {/* SUCCESS ICON ANIMATION */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Animated outer glow ring */}
                <div className="absolute inset-0 w-16 h-16 bg-emerald-500/20 rounded-full animate-ping"></div>

                {/* Main success icon container */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-full flex items-center justify-center shadow-2xl transform transition-transform duration-300 hover:scale-105">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>

                {/* Decorative sparkle effects */}
                <div className="absolute -top-2 -right-1">
                  <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
                </div>
                <div className="absolute -bottom-0.5 -left-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute top-0.5 -right-3">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                </div>
              </div>
            </div>

            {/* SUCCESS MESSAGE */}
            <div className="space-y-3 mb-8">
              {/* Main thank you heading */}
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent tracking-tight">
                Thank You!
              </h1>

              {/* Success confirmation section */}
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-emerald-600 tracking-wide">
                  Your Booking Was Successful
                </h2>

                {/* Decorative divider */}
                <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mx-auto"></div>
              </div>

              {/* Detailed success message */}
              <p className="text-slate-600 text-base leading-relaxed max-w-md mx-auto font-medium px-2">
                🎉 Congratulations! Your venue has been successfully reserved.
              </p>
            </div>

            {/* NAVIGATION ACTIONS */}
            <div className="space-y-3">
              {/* Primary action button - Return to venues */}
              <Link
                to="/venues"
                className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
                aria-label="Return to venues list"
              >
                <Building2 className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" />
                Back to Venues
                <div className="w-1.5 h-1.5 bg-white/50 rounded-full group-hover:bg-white/80 transition-colors duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
