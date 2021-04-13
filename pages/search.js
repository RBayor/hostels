import React from "react";
import Footer from "../components/footer";

function Search() {
  return (
    <div>
      {/* Header */}
      <div className="flex p-3 w-full h-10 bg-purple-500 md:h-20">
        <img src="/logo_transparent.png" className="h-12 mr-3 md:h-40" />
      </div>

      {/* Search params Price & Campus */}
      <div className="flex mt-5 p-3 space-x-5 text-sm md:mt-10">
        {/* campus */}
        <select className="p-2 bg-white focus:outline-none text-gray-500">
          <option disabled selected hidden>
            Campus
          </option>
          <option>Nyankpala</option>
          <option>Dungu</option>
        </select>
        {/* price */}
        <span>
          <span className="bg-green-400 mt-2 rounded text-white p-1 mb-2">
            GHS
          </span>
          <input
            className="p-2 w-24 focus:outline-none "
            type="number"
            placeholder="Max Price"
          />
        </span>
        {/* Compare */}
        <button className="bg-purple-500 rounded p-2 focus:outline-none active:bg-purple-600">
          <span className="text-white">Compare</span>{" "}
          {/* Number of hostels added to compare list appear here */}
          <span className="mt-1 ml-0 text-xs rounded text-green-400">(0)</span>
        </button>
      </div>

      {/* Hostels Matching Search params */}

      {/* <Footer /> */}
    </div>
  );
}

export default Search;
