import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllConnections } from "../slices/allConnections";

const connections = [
  { id: 1, name: "Anil Kumar", role: "Frontend Developer", company: "Google" },
  { id: 2, name: "Rashmi Reddy", role: "UI/UX Designer", company: "Microsoft" },
  { id: 3, name: "Suresh Babu", role: "Backend Engineer", company: "Amazon" },
  { id: 4, name: "Priya Sharma", role: "Data Scientist", company: "Meta" },
  {
    id: 5,
    name: "Rahul Varma",
    role: "Fullstack Developer",
    company: "Netflix",
  },
];

const AllConnections = () => {
  const dispatch = useDispatch();
  const allConnections = useSelector((state: any) => state.allConnections);
  const getAllConnection = async () => {
    const res = await axios.get(BASE_URL + "/users/connections", {
      withCredentials: true,
    });
    dispatch(getAllConnections(res.data));
  };
  useEffect(() => {
    getAllConnection();
  }, []);
  console.log("allconections", { allConnections });
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Connections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allConnections?.data?.map((conn: any) => (
          <div
            key={conn._id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300 flex flex-col items-center text-center"
          >
            {/* Profile Image */}
            <img
              src={conn.imageUrl || "https://via.placeholder.com/100"} // fallback
              alt={conn.firstName}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200"
            />

            {/* First Name */}
            <h2 className="text-lg font-semibold text-gray-800">
              {conn.firstName}
            </h2>

            {/* Age */}
            <p className="text-gray-600">Age: {conn.age || "N/A"}</p>


            {/* Button */}
            <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllConnections;
