import React from "react";
import DashboardCards from "./Dashbord";
import Feed from "./Feed";

const ParentFeedComponent = () => {
  return (
   <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">

      {/* Left side: Dashboard (50%) */}
      <div className="flex-1 p-4">
        <DashboardCards />
      </div>

      {/* Right side: Feed (50%) */}
      <div className="flex-1 ">
        <Feed />
      </div>
    </div>
  );
};

export default ParentFeedComponent;
