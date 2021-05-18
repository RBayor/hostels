import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchByCampus } from "../services/fetch/fetchByCampus";
import Footer from "../src/components/footer";
import Head from "next/head";

const Search: React.FC = () => {
  const router = useRouter();
  const [hostels, setHostels] = useState(null);
  const loadingArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const fetchHostelDetails = (
    hostelName: String,
    campus: String,
    img: String
  ) => {};

  useEffect(() => {
    const getCampusHostels = () => {
      fetchByCampus("Dungu")
        .then((hostels) => {
          if (hostels.length > 0) setHostels(hostels);
        })
        .catch((error) => console.log(error));
    };

    getCampusHostels();
  }, []);

  useEffect(() => {
    console.log(hostels);
  }, [hostels]);

  return (
    <div className="flex flex-col">
      <Head>
        <title>Search</title>
        <link rel="icon" href="/logo_transparent.png" />
      </Head>
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

      <div className="max-w-3xl m-auto m">
        <div className="mt-16 m-3">
          <input
            type="text"
            className="w-full p-3 rounded outline-none ring-1 ring-purple-300"
            placeholder="Search"
          />
        </div>

        {/* Search params Price & Campus */}
        <div className="flex w-full mt-3 p-3 space-x-5 text-sm  md:text-lg">
          {/* campus */}

          <select className="p-2 bg-white rounded focus:outline-none text-gray-500 md:w-52 ring-1 ring-purple-300">
            <option disabled selected hidden>
              Campus
            </option>
            <option>Nyankpala</option>
            <option>Dungu</option>
          </select>

          {/* price */}

          <div className="ring-1 ring-purple-300 rounded p-2">
            <span className="bg-green-400 mt-2 rounded text-white p-1 mb-2">
              GHS
            </span>
            <input
              className="p-2 w-24 md:w-40 outline-none rounded appearance-none"
              type="number"
              placeholder="Max Price"
            />
          </div>

          {/* Compare */}
          {/* <div> */}
          <button className="bg-purple-500 rounded p-2 focus:outline-none active:bg-purple-600 ml-auto transition duration-150 transform hover:scale-105">
            <span className="text-white">Compare</span>
            {/* Number of hostels added to compare list appear here */}
            <span className="mt-1 ml-0 text-xs rounded text-green-400">
              (0)
            </span>
          </button>
        </div>
      </div>

      {/* Hostels Matching Search params */}

      <div className="flex flex-col md:flex-row md:flex-wrap mt-10">
        {hostels !== null ? (
          hostels.map((hostel, index) => (
            <div
              key={index}
              className="h-96 w-80  mx-auto text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none m-5"
              style={{
                backgroundImage: `url(${hostel.data().hostelImg})`,
                backgroundRepeat: "no-repeat",
                objectFit: "cover",
              }}
              onClick={() =>
                fetchHostelDetails(
                  hostel.data().hostelName,
                  hostel.data().campus,
                  hostel.data().hostelImg
                )
              }
            >
              <div className="text-purple-500 text-2xl p-3 text-right align-bottom mt-auto h-full font-bold">
                {hostel.data().hostelName != undefined
                  ? hostel.data().hostelName.toUpperCase()
                  : hostel.data().hostelName}
              </div>
            </div>
          ))
        ) : (
          <>
            {loadingArr.map((e, i) => (
              <div
                key={i}
                className="h-96 w-80  mx-auto text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none m-5 animate-pulse bg-gray-300"
                style={{
                  // backgroundColor: "transparent",
                  backdropFilter: "blur(5px)",
                  backgroundRepeat: "no-repeat",
                  objectFit: "cover",
                }}
              >
                <div className="bg-purple-300 rounded-lg h-7 w-36  m-5 ml-auto animate-pulse"></div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Search;
