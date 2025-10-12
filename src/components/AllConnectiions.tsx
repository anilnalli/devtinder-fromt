import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { getAllConnections, setSelectedConnection } from "../slices/allConnections";
import { Link, useNavigate } from "react-router-dom";

const AllConnections = () => {
  const dispatch = useDispatch();
  const allConnections = useSelector((state: any) => state.allConnections?.allConnection);
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
            <Link to={"/chat/" + conn?._id}>
              <button className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center gap-2" onClick={()=>dispatch(setSelectedConnection(conn))}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zM12 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15.375 12a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12c0 4.97 4.03 9 9 9 .996 0 1.953-.162 2.85-.463a.75.75 0 01.592.06l3.7 1.852a.75.75 0 001.087-.838l-.83-3.32a.75.75 0 01.234-.743A8.963 8.963 0 0021.75 12c0-4.97-4.03-9-9-9s-9 4.03-9 9z"
                  />
                </svg>
                Chat
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllConnections;
