import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-purple-600">DevTinder</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          The ultimate platform for developers to connect, collaborate, and build world-changing projects together.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="btn btn-primary px-6 py-2 text-white text-lg shadow-md"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="btn bg-white text-purple-600 border border-purple-600 px-6 py-2 text-lg hover:bg-purple-50"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why DevTinder?</h2>
        <div className="flex flex-wrap justify-center gap-10 px-6">
          <div className="max-w-sm bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Find Your Dev Match</h3>
            <p className="text-gray-600">
              Connect with like-minded developers based on skills, goals, and projects.
            </p>
          </div>

          <div className="max-w-sm bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Collaborate on Projects</h3>
            <p className="text-gray-600">
              Join or create open-source and personal projects with your matches.
            </p>
          </div>

          <div className="max-w-sm bg-gray-50 p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">Grow Together</h3>
            <p className="text-gray-600">
              Build your network, enhance your skills, and grow your dev portfolio.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-purple-50 px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">About DevTinder</h2>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg">
          DevTinder is a social and collaborative platform built for developers. Whether you're looking for a coding partner, building your next side project, or simply networking with fellow coders — DevTinder helps you connect and create in a meaningful way.
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} DevTinder. All rights reserved.
      </footer>
    </div>
  );
}
