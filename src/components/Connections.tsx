import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../slices/constants";
import { useDispatch, useSelector } from "react-redux";
import { getConnections } from "../slices/connectionsSlice";

// ConnectionsComponent.jsx
// A responsive 3-cards-in-a-row component using Tailwind CSS + DaisyUI
// Usage: <ConnectionsComponent connections={yourArray} />

export default function ConnectionsComponent({}) {
  const dispatch = useDispatch();
  const connection: any = useSelector((state) => (state as any)?.connections);
  const getconnectionsData = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users/connections/recieved", {
        withCredentials: true,
      });
      dispatch(getConnections(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getconnectionsData();
  }, []);

  const acceptOrRejctRequest = async (status: any, person: any) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connectionRequest/review/" + status + "/" + person._id,
        {},
        { withCredentials: true }
      );
      if(res){
        let filterdConnections=connection.data?.filter((o:any)=>o?._id!==person?._id);
        dispatch(getConnections(filterdConnections))
      }
      
    } catch (err) {}
  };
  return (
    <section className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Connections</h2>

      {/* responsive grid: 1 col on xs, 2 on sm, 3 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(connection?.data||connection)?.map((person: any) => (
          <article
            key={person._id}
            className="card card-side bg-base-100 shadow-md p-4 items-center"
          >
            {/* Card image area */}
            <figure className="w-24 h-24 shrink-0 mr-4">
              <img
                src={person?.fromUserId?.imageUrl}
                alt={`${person.fromUserId?.firstName} profile`}
                className="w-full h-full object-cover rounded-full border-2 border-base-200"
              />
            </figure>

            {/* Card body */}
            <div className="card-body p-0">
              <h3 className="card-title text-lg">
                {person.fromUserId?.firstName}
              </h3>

              <div className="card-actions mt-2">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => acceptOrRejctRequest("rejected", person)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => acceptOrRejctRequest("accepted", person)}
                >
                  {" "}
                  Accept
                </button>
              </div>
            </div>
          </article>
        ))}
        {!connection&&connection?.data?.length===0&&<div className="text-danger">No Connection Request Found</div>}
      </div>
    </section>
  );
}
