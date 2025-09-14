import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../slices/constants"; // update path as needed
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    imageUrl: "",
    email: "",
    password: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/user/signup", formData);
      console.log("User registered:", res.data);
      // Redirect or notify user her
      return navigate('/login')
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4">
      <div className="card w-full max-w-lg shadow-2xl bg-base-100 p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              type="text"
              name="firstName"
              className="input input-bordered w-full"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              className="input input-bordered w-full"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              name="age"
              className="input input-bordered w-full"
              value={formData.age}
              onChange={handleChange}
              min="13"
              max="100"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="url"
              name="imageUrl"
              className="input input-bordered w-full"
              value={formData.imageUrl}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              name="gender"
              className="select select-bordered w-full"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="nonbinary">Non-binary</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
