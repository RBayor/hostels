import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchByID } from "../services/fetch/fetchByID";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import { useParams } from "../services/search/searchState";
import { fetchByCampus } from "../services/fetch/fetchByCampus";
import { useFavs } from "../services/favourite/favourite";

const Hostel = () => {
  const router = useRouter();
  const query = router.query;
  const { params, setParams } = useParams();
  const { favs, setFavs, addToFavs } = useFavs();
  const [hostel, setHostel] = useState(null);
  const [hostels, setHostels] = useState([]);
  const loadingArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  const fetchHostelDetails = async (id: string) => {
    clearData();
    router
      .push({
        pathname: "/hostel",
        query: { id },
      })
      .then(() => location.reload());

    // fetchHostel();
  };

  const clearData = () => {
    setHostel(null);
    setHostels([]);
  };

  const fetchHostel = async () => {
    if (query) {
      const res = await fetchByID(query.id.toString());
      res.forEach((hostel) => {
        setHostel(hostel.data());
      });
    }
  };

  useEffect(() => {
    fetchHostel();
  }, []);

  useEffect(() => {
    const getHostelsByParams = () => {
      if (params !== null && hostel !== null) {
        fetchByCampus(params.campus.toString(), parseInt(params.maxPrice))
          .then((host) => {
            if (host.length > 0) {
              host.forEach((ele) => {
                if (hostel.hostelName !== ele.data().hostelName) {
                  setHostels((prev) => [...prev, ele.data()]);
                }
              });
              // console.log(hostels);
            }
          })
          .catch((error) => console.log(error));
      }
    };
    getHostelsByParams();
  }, [hostel]);

  // const updateFav = (hostel) => {
  // if (!favs.includes(hostel)) setFavs((prev) => [...prev, hostel]);
  // addToFavs(hostel);
  // console.log(hostel);
  // };

  // useEffect(() => {
  //   console.log(hostels);
  // }, [hostels]);

  return hostel !== null ? (
    <div className="flex flex-col">
      <Head>
        <title>{hostel.hostelName.toUpperCase()}</title>
        <link rel="icon" href="/logo_transparent.png" />
      </Head>

      {/* Display hostel images in cards that when clicked open a modal to full image */}
      <div className="flex flex-col  md:flex-row md:flex-wrap mt-5 mx-auto">
        {hostel.hostelImg.map((img, index) => (
          <div
            key={index}
            className="h-96 w-80  text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none mx-5"
            style={{
              backgroundImage: `url(${img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto mt-10 flex flex-col md:flex-row">
        <div className="m-3">
          <span className="font-bold text-xl text-purple-500 mb-5">
            Description
          </span>
          <div className="text-purple-400 flex flex-row pb-2 pt-2 text-lg">
            <img
              src="/assets/unfav.svg"
              className="mr-3 text-sm cursor-pointer"
              onClick={() => addToFavs(hostel)}
            />
            {hostel.hostelName.toUpperCase()}
          </div>
          <div className="text-purple-400 flex flex-row pb-2 pt-2 text-sm">
            <img src="/assets/location.svg" className="mr-3 text-sm" />
            {hostel.campus.toUpperCase()}
          </div>
          <div className="text-green-400 flex flex-row pb-2 pt-2 text-sm">
            <img src="/assets/cost.svg" className="mr-3 text-sm" />
            GHS {hostel.minPrice} - GHS {hostel.maxPrice}
          </div>
          <div className="p-3">{hostel.description}</div>
        </div>

        <div className="min-h-max min-w-max p-10 flex flex-col flex-grow rounded-lg shadow outline-none m-10  space-y-5">
          <img src="/assets/info.svg" className="mx-auto h-10 m-3" />

          <span className="flex flex-row text-purple-500">
            <img src="/assets/apartment.svg" className="mr-3 " />
            {hostel.hostelName.toUpperCase()}
          </span>

          {hostel.ownerName ? (
            <span className=" text-purple-500 flex flex-row">
              <img src="/assets/person.svg" className="mr-3" />
              {hostel.ownerName.toUpperCase()}
            </span>
          ) : null}

          {hostel.primaryPhone ? (
            <a href={`tel:${hostel.primaryPhone}`}>
              <span className=" text-purple-500 flex flex-row">
                <img src="/assets/call.svg" className="mr-3" />
                {hostel.primaryPhone}
              </span>
            </a>
          ) : null}
          {hostel.secondaryPhone ? (
            <a href={`tel:${hostel.secondaryPhone}`}>
              <span className=" text-purple-500 flex flex-row">
                <img src="/assets/call.svg" className="mr-3" />
                {hostel.secondaryPhone}
              </span>
            </a>
          ) : null}
        </div>
      </div>

      <div className="mx-auto text-purple-500 text-2xl">Similar Hostels</div>

      <div className="container mx-auto flex flex-col md:flex-row md:flex-wrap mt-10 mb-10">
        {hostels !== null ? (
          hostels.map((hostel, index) => (
            <div className="mx-auto md:mx-2" key={index}>
              <div
                className="h-96 w-80  text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none m-5"
                style={{
                  backgroundImage: `url(${hostel.hostelImg[0]})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                onClick={() => fetchHostelDetails(hostel.id)}
              ></div>
              <div className="text-purple-500 text-2xl p-3 text-center align-bottom mt-auto font-bold">
                {hostel.hostelName != undefined
                  ? hostel.hostelName.toUpperCase()
                  : hostel.hostelName}
              </div>
              <div className="text-green-500 text-xl  text-center align-bottom font-semibold">
                GHS {hostel.minPrice} - GHS {hostel.maxPrice}
              </div>
            </div>
          ))
        ) : (
          <>
            {loadingArr.map((e, i) => (
              <div
                key={i}
                className="h-96 w-80  mx-auto md:mx-2 text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none m-5 animate-pulse bg-gray-300"
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
  ) : (
    <></>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}

export default Hostel;
