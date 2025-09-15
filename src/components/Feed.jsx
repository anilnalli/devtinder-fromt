import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../slices/feedSlice";
import { BASE_URL } from "../slices/constants";
import "./Feed.css"; // 👈 we'll put gradient animation CSS here

export default function Feed() {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.feed?.data || []);
  const len=profiles.length
  const user = useSelector((state) => state.user || {});

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % profiles.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
  };
 useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        index === len - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval); // cleanup when unmount
  }, []);
   
  let profile = profiles[index];
  console.log("profile==>",{len,profile,index,profiles})
  const getFeedData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      await dispatch(addfeed(res));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && profiles.length === 0) {
      getFeedData();
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center h-screen animated-bg">
      <div className="w-[380px] bg-white rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Profile Image */}

        <figure className="h-[460px] relative">
          <img
            src={profile?.imageUrl || ""}
            alt={profile?.firstName || ""}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
            <h2 className="text-2xl font-semibold text-white">
              {profile?.firstName}, {profile?.age || ""}
            </h2>
            <p className="text-sm text-gray-200">
              {profile?.bio || "No bio available"}
            </p>
          </div>
        </figure>

        {/* Action Buttons */}
        <div className="absolute bottom-5 left-40 right-0 flex justify-center gap-8">
          <button
            onClick={handlePrev}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-md shadow-lg text-red-500 text-2xl transition hover:scale-110 hover:bg-red-100"
          >
            ✖
          </button>
          <button
            onClick={handleNext}
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-md shadow-lg text-green-500 text-2xl transition hover:scale-110 hover:bg-green-100"
          >
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
