import React from "react";

function Card({ title, body }) {
  return (
    <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-10">
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">{title}</h2>
        <p className="mt-2 text-gray-600">{body}</p>
      </div>
    </div>
  );
}

export default Card;
