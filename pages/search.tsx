import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchByCampus } from "../services/fetch/fetchByCampus";
import { fetchAllHostels } from "../services/fetch/fetchAll";
import Head from "next/head";
import { useParams } from "../services/search/searchState";
import { useFavs } from "../services/favourite/favourite";

const Search: React.FC = (props) => {
  const router = useRouter();
  const [hostels, setHostels] = useState(null);
  const { params, setParams } = useParams();
  const loadingArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const [searchQuery, setSearchQuery] = useState<string | null>();
  const [allHostels, setAllHostels] = useState(null);
  const { favs, setFavs, addToFavs } = useFavs();

  const fetchHostelDetails = async (id: string) => {
    router.push({
      pathname: "/hostel",
      query: { id },
    });
  };

  const getHostelsByParams = () => {
    if (params !== null) {
      fetchByCampus(params.campus.toString(), parseInt(params.maxPrice))
        .then((hostels) => {
          if (hostels.length > 0) setHostels(hostels);
        })
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    getHostelsByParams();
  }, [params]);

  useEffect(() => {
    if (searchQuery && searchQuery !== "") {
      setHostels(
        allHostels.filter((hostel) =>
          hostel
            .data()
            .hostelName.toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      );
    } else {
      getHostelsByParams();
    }
  }, [searchQuery]);

  const updateQuery = (event) => {
    event.preventDefault();

    setSearchQuery(event.target.value);
  };

  const handleParamsChange = (event) => {
    event.preventDefault();
    setParams((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // useEffect(() => {
  //   // console.log(searchParams);
  //   // console.log(auth);
  // }, [hostels]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetchAllHostels();
        if (res.length > 0) setAllHostels(res);
      } catch (error) {}
    };
    fetchAll();
  }, []);

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
      </div>

      <div className="max-w-3xl m-auto ">
        <div className="mt-16 m-3">
          <input
            type="text"
            className="w-full p-3 rounded outline-none ring-1 ring-purple-300"
            placeholder="Hostel Name"
            name="query"
            onChange={updateQuery}
          />
        </div>

        {/* Search params Price & Campus */}
        <div className="flex w-full mt-3 p-3 space-x-5 text-sm  md:text-lg">
          {/* campus */}

          <select
            className="p-2 bg-white rounded focus:outline-none text-gray-500 md:w-52 ring-1 ring-purple-300"
            name="campus"
            onChange={handleParamsChange}
            value={params ? params.campus : "dungu"}
          >
            <option value="nyankpala">Nyankpala</option>
            <option value="dungu">Dungu</option>
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
              name="maxPrice"
              onChange={handleParamsChange}
              value={params ? params.maxPrice : 10000}
            />
          </div>

          {/* Compare */}
          {/* <div> */}
          <button
            className="bg-purple-500 rounded p-2 w-16 focus:outline-none active:bg-purple-600  transition duration-150 transform hover:scale-105"
            onClick={() => router.push("/favourites")}
          >
            <div className="flex flex-row ">
              <img src="/assets/unfav.svg" />
              <span className="ml-1 text-xs rounded text-green-400">
                ({favs.length})
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Hostels Matching Search params */}

      <div className="flex flex-col md:flex-row md:flex-wrap mt-10 max-w-full m-auto">
        {hostels !== null ? (
          hostels.map((hostel, index) => (
            <div className="mx-auto md:mx-0 2xl:ml-3" key={index}>
              <div
                className="h-96 w-80 md:h-80 md:w-72 2xl:h-96 2xl:w-80  text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none m-5"
                style={{
                  backgroundImage: `url(${hostel.data().hostelImg[0]})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                onClick={() => fetchHostelDetails(hostel.data().id)}
              ></div>
              <div className="text-purple-500 text-2xl p-3 text-center align-bottom mt-auto font-bold">
                {hostel.data().hostelName != undefined
                  ? hostel.data().hostelName.toUpperCase()
                  : hostel.data().hostelName}
              </div>
              <div className="text-green-500 text-xl  text-center align-bottom font-semibold">
                GHS {hostel.data().minPrice} - GHS {hostel.data().maxPrice}
              </div>
            </div>
          ))
        ) : (
          <>
            {loadingArr.map((e, i) => (
              <div
                key={i}
                className="h-96 w-80 md:h-80 md:w-72 2xl:h-96 2xl:w-80 mx-auto text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none m-5 animate-pulse bg-gray-300"
                style={{
                  // backgroundColor: "transparent",
                  backdropFilter: "blur(5px)",
                  backgroundRepeat: "no-repeat",
                  objectFit: "cover",
                }}
              ></div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
