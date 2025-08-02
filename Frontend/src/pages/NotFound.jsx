import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Optimized icon with better accessibility */}
          <div
            className="flex justify-center mb-6"
            role="img"
            aria-label="Error icon"
          >
            <div className="p-4 bg-blue-100 rounded-full">
              <AlertTriangle
                className="h-12 w-12 text-blue-600"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Better semantic HTML structure */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3" role="status">
            404
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>

          {/* More concise and actionable explanation */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            This page doesn't exist. Check the URL or return to the homepage.
          </p>

          {/* Enhanced button with better UX */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Return to homepage"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
