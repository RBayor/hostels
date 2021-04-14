import { useRouter } from "next/router";
import React from "react";
import Footer from "../components/footer";

const Search: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      {/* Header */}
      <div className="flex p-3 w-full h-12 bg-purple-500 md:h-20">
        <img
          loading="lazy"
          src="/logo_transparent.png"
          className="ml-5 h-20 md:h-40 cursor-pointer transition duration-150 transform hover:scale-110"
          onClick={() => router.push("/")}
        />
        {/* <div className="text-white m-2 md:hidden">Hosted By Platinum Dev</div> */}
      </div>

      {/* Search params Price & Campus */}
      <div className="flex w-full mt-16 p-3 space-x-5 text-sm md:mt-32 md:text-lg items-center">
        {/* campus */}
        <div>
          <select className="p-2 bg-white focus:outline-none text-gray-500">
            <option disabled selected hidden>
              Campus
            </option>
            <option>Nyankpala</option>
            <option>Dungu</option>
          </select>
        </div>

        {/* price */}

        <div>
          <span className="bg-green-400 mt-2 rounded text-white p-1 mb-2">
            GHS
          </span>
          <input
            className="p-2 w-24 focus:outline-none "
            type="number"
            placeholder="Max Price"
          />
        </div>
        {/* Compare */}
        <div>
          <button className="bg-purple-500 rounded p-2 focus:outline-none active:bg-purple-600 ml-auto">
            <span className="text-white">Compare</span>{" "}
            {/* Number of hostels added to compare list appear here */}
            <span className="mt-1 ml-0 text-xs rounded text-green-400">
              (0)
            </span>
          </button>
        </div>
      </div>

      {/* Hostels Matching Search params */}

      {/* <Footer /> */}
    </div>
  );
};

export default Search;
