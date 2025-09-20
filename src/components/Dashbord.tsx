import React from "react";

// DashboardCards.jsx
// Stylish 3-cards component with TailwindCSS + DaisyUI

export default function DashboardCards() {
  const cards = [
    {
      id: 1,
      title: "Connections",
      description: "View and manage your connections.",
      color: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white",
    },
    {
      id: 2,
      title: "Requests",
      description: "See who sent you requests.",
      color: "bg-gradient-to-r from-pink-500 to-rose-600 text-white",
    },
    {
      id: 3,
      title: "Interests",
      description: "Check your interests and matches.",
      color: "bg-gradient-to-r from-green-500 to-emerald-600 text-white",
    },
  ];

  return (
    <section className="flex justify-center items-center w-full h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card w-full shadow-xl rounded-2xl transform transition duration-300 hover:scale-105 hover:shadow-2xl ${card.color}`}
          >
            <div className="card-body">
              <h3 className="card-title text-xl font-bold">{card.title}</h3>
              <p className="text-sm opacity-90">{card.description}</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-sm bg-white text-black hover:bg-gray-100 rounded-xl">
                  Show
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
