import React, { useEffect } from "react";
import { useFavs } from "../services/favourite/favourite";
import Image from "next/image";

const Favourites = () => {
  const { favs, setFavs, addToFavs } = useFavs();

  useEffect(() => {
    // console.log(favs);
  }, [favs]);

  return favs.length > 0 ? (
    <div className="container mx-auto flex flex-col md:flex-row md:flex-wrap mt-10 mb-10">
      {favs.map((hostel, index) => (
        <div className="mx-auto md:mx-0 2xl:ml-3" key={index}>
          <div className="w-80 text-white rounded-lg shadow transition duration-150 transform hover:scale-105 outline-none m-5">
            <div
              className="h-96 w-80 md:h-80 md:w-72 2xl:h-96 2xl:w-80 rounded"
              style={{
                backgroundImage: `url(${hostel.hostelImg[0]})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              //   onClick={() => fetchHostelDetails(hostel.data().id)}
            ></div>

            <div className="text-purple-500 text-2xl p-3 text-center align-bottom font-bold">
              {hostel.hostelName != undefined
                ? hostel.hostelName.toUpperCase()
                : hostel.hostelName}
            </div>
            <div className="text-purple-500 text-center align-bottom font-semibold">
              {hostel.campus.toUpperCase()}
            </div>
            <div className="text-green-500   text-center align-bottom font-semibold">
              GHS {hostel.minPrice} - GHS {hostel.maxPrice}
            </div>
            <hr className="mt-5 m-3" />
            <div className="text-center text-black p-3 ">
              {hostel.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};

export default Favourites;
