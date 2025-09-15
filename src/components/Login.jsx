import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/userSlice";
import { BASE_URL } from "../slices/constants";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const[error,setError]=useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/user/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      navigate('/feed')
      
    } catch (err) {
      setError(err.response.data)
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Gradient Branding */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col items-center justify-center p-10 relative overflow-hidden">
        {/* Optional decorative blob */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400 opacity-20 rounded-full blur-3xl animate-pulse"></div>

        <h1 className="text-6xl font-extrabold z-10">DevTinder</h1>
        <p className="text-xl italic text-center max-w-md mt-6 z-10">
          “Where developers connect, collaborate, and code their future
          together.”
        </p>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-1/2 flex items-center justify-center bg-base-200 px-6">
        <div className="backdrop-blur-lg bg-white/80 rounded-lg shadow-2xl p-8 w-full max-w-sm">
          <form onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Login
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
           {error&&<p className="text-red-600">{error}</p>} 

            <button type="submit" className="btn btn-primary w-full mt-4">
              Login
            </button>

            <p className="text-center text-sm mt-4 text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
