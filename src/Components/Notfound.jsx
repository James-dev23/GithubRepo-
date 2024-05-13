import React from "react";
import { Link } from "react-router-dom";
function Notfound() {
  return (
    <div className="p-3 flex flex-col gap-4 items-center relative top-40">
      <h2 className="text-white text-6xl font-semibold">404</h2>
      <h2 className="text-white text-4xl font-bold">Page not found.</h2>
      <button className="text-white text-3xl bg-[#6c2fd4] py-3 px-6 min-w-2 sm:w-[25%]">
        <Link to="/">Go to the Homepage</Link>.
      </button>
    </div>
  );
}

export default Notfound;
