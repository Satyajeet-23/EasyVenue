import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-md">
                <div className="flex justify-center mb-4 text-yellow-500">
                    <AlertTriangle className="h-16 w-16" strokeWidth={1.5} />
                </div>

                <h1 className="text-4xl font-bold text-gray-800 mb-2">404 | Page Not Found</h1>
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <Link
                    to="/"
                    className="inline-flex items-center px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
