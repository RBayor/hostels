import Head from "next/head";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchAllHostels } from "../services/fetch/fetchAll";
import { useParams } from "../services/search/searchState";
import { useFavs } from "../services/favourite/favourite";

// interface Props {
//   [index: number]: Hostel;
// }

// interface Hostel {
//   ownerName: null | string;
//   primaryPhone: null | string;
//   secondaryPhone: null | string;
//   email: null | string;
//   hostelName: null | string;
//   campus: null | string;
//   images: null | string;
//   description: null | string;
//   hostelImg: [];
//   minPrice: number;
//   maxPrice: number;
// }

const Home = () => {
  const router = useRouter();
  const [hostels, setHostels] = useState(null);
  const loadingArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const { params, setParams } = useParams();
  // const { favs, setFavs } = useFavs();
  const findHostel = (e) => {
    e.preventDefault();
    router.push("/search");
  };

  // const uploadHostel = (e) => {
  //   e.preventDefault();
  //   router.push("/uploads");
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchAllHostels();
        if (res.length > 0) setHostels(res);
      } catch (error) {}
    };
    getData();
  }, []);

  const fetchHostelDetails = async (id) => {
    router.push({ pathname: "/hostel", query: { id } });
  };

  const handleParamsChange = (event) => {
    // console.log(event.target.value);
    event.preventDefault();
    setParams((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // useEffect(() => {
  //   console.log(params);
  // });

  return (
    <div>
      <Head>
        <title>Hostel Hub</title>
        <link rel="icon" href="/logo_transparent.png" />
      </Head>

      {/* Header */}

      <div className="flex flex-col">
        <div
          className="h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url(/senam.jpg)",
          }}
        >
          <div className="text-6xl text-center mx-auto p-10 font-bold text-purple-600 ">
            <span className="cursor-pointer">Hostel Hub</span>
          </div>

          {/* Top image and form */}
          <div className="grid p-10">
            <form className=" bg-white rounded-lg shadow p-10 h-full ml-auto w-full md:w-72 lg:w-96 lg:mr-52">
              <div className="text-start text-gray-900 font-medium">
                Find A Hostel on Your Campus Now
              </div>
              <select
                className="w-full mt-4 p-2 bg-white focus:outline-none text-gray-500 ring-1 rounded ring-purple-500"
                name="campus"
                value={params ? params.campus : "dungu"}
                onChange={handleParamsChange}
              >
                <option value="nyankpala">Nyankpala</option>
                <option value="dungu">Dungu</option>
              </select>

              <div className="flex flex-col xl:flex-row xl:space-x-4">
                <button
                  onClick={findHostel}
                  className="rounded  bg-green-500 text-white w-full h-10 mt-5 focus:outline-none  cursor-pointer transition duration-150 transform hover:scale-105"
                >
                  Find
                </button>
                {/* <button
                  onClick={uploadHostel}
                  className="rounded bg-purple-500 text-white w-full h-10 mt-5 focus:outline-none  cursor-pointer transition duration-150 transform hover:scale-105"
                >
                  Upload Hostel
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Ad */}

      <div className="flex flex-col md:flex-row md:flex-wrap max-w-full mx-auto mt-10 ">
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
              <div className="text-purple-500 text-2xl text-center align-bottom font-bold">
                {hostel.data().hostelName != undefined
                  ? hostel.data().hostelName.toUpperCase()
                  : hostel.data().hostelName}
              </div>
              <div className="text-green-500 text-xl  text-center align-bottom font-semibold">
                GHS {hostel.data().minPrice} - GHS {hostel.data().maxPrice}
                {/* {console.log(hostel.data().maxPrice)} */}
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
              ></div>
            ))}
          </>
        )}
      </div>

      <div className="bg-purple-900 text-center p-3 mt-10 text-white">
        <div>Copyright&copy;2021</div>
        <div>Platinum Dev Ltd</div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

// export async function getStaticProps(context) {
//   let hostels = [];
//   const res = await fetchAllHostels();

//   res.forEach((hostel) => hostels.push(hostel.data()));

//   return {
//     props: { hostels },
//     revalidate: 7200,
//   };
// }

export default Home;
