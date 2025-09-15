import { useDispatch, useSelector } from "react-redux";
import SignUp from "./SignUp";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../slices/constants";
import { addUser } from "../slices/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user || {});
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.gender || "",
    imageUrl: user?.imageUrl || "",
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
    console.log("Form Submitted:", formData);
    try {
      const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      console.error(err);
    }
    setShowAlert(true)
    // you can later call axios.post(BASE_URL + "/user/signup", formData);
  };
  setTimeout(() => {setShowAlert(false)}, 3000);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Parent grid with equal height children */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl p-6 items-stretch">
        {/* Left Side → SignUp */}
        
        <div className="bg-white rounded-3xl shadow-2xl p-6 flex items-center justify-center h-150">
          <div className="w-full max-w-md h-full">
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-center mb-6">Profile </h2>

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

                {/* Submit Button */}
                <div className="pt-4">
                  <button type="submit" className="btn btn-primary w-full">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side → Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center w-full   transform transition duration-500 hover:scale-105">
          {/* Profile Image */}
          <div className="relative w-36 h-36">
            <img
              src={user.imageUrl}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
            />
            <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
          </div>

          {/* Profile Details */}
          <h2 className="mt-4 text-2xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500 capitalize">{user.gender}</p>
          <p className="mt-3 text-gray-600 italic">
            "Passionate about building interactive web apps with React &
            Tailwind CSS."
          </p>

          {/* Stats Section */}
          <div className="mt-6 flex justify-around text-gray-700 w-full">
            <div>
              <p className="text-xl font-bold">120</p>
              <p className="text-sm">Posts</p>
            </div>
            <div>
              <p className="text-xl font-bold">4.2k</p>
              <p className="text-sm">Followers</p>
            </div>
            <div>
              <p className="text-xl font-bold">321</p>
              <p className="text-sm">Following</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6">
            <Link
              to="/feed"
              className="px-5 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition duration-300"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
