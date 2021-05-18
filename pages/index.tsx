import Head from "next/head";
import "tailwindcss/tailwind.css";
import Footer from "../src/components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getHostels } from "../services/fetch/fetchAll";
import { fetchHostelByName } from "../services/fetch/fetchByName";

const Home: React.FC = () => {
  const router = useRouter();
  const [hostels, setHostels] = useState(null);
  const loadingArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const findHostel = (e) => {
    e.preventDefault();
    router.push("/search");
  };

  const uploadHostel = (e) => {
    e.preventDefault();
    router.push("/uploads");
  };

  const fetchHostelDetails = async (
    hostelName: String,
    campus: String,
    hostelImg: String
  ) => {
    // const res = await fetchHostelByName(hostelName, campus, hostelImg);
    // console.log(res);

    router.push(`/hostel?hostel:${hostelName}?[campus]:${campus}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getHostels();
        if (res.length > 0) setHostels(res);
      } catch (error) {}
    };
    getData();
  }, []);

  // useEffect(() => {
  //   // console.log(hostels);
  //   if (hostels)
  //     hostels.forEach((element) => {
  //       console.log(element.data());
  //     });
  // }, [hostels]);

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
            <form className=" bg-white rounded-lg shadow p-10 h-full ml-auto w-full md:w-96 lg:w-1/3 lg:mr-52">
              <div className="text-start text-gray-900 font-medium">
                Find A Hostel on Your Campus Now
              </div>
              <select className="w-full mt-4 p-2 bg-white focus:outline-none text-gray-500">
                <option disabled selected hidden>
                  Select Campus
                </option>
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
                <button
                  onClick={uploadHostel}
                  className="rounded bg-purple-500 text-white w-full h-10 mt-5 focus:outline-none  cursor-pointer transition duration-150 transform hover:scale-105"
                >
                  Upload Hostel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Ad */}

      <div className="flex flex-col md:flex-row md:flex-wrap">
        {hostels !== null ? (
          hostels.map((hostel, index) => (
            <div
              key={index}
              className="h-96 w-80  mx-auto text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none m-5"
              style={{
                backgroundImage: `url(${hostel.data().hostelImg[0]})`,
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

      <div className="bg-purple-900 text-center p-3 mt-10 text-white">
        <div>Copyright&copy;2021</div>
        <div>Platinum Dev Ltd</div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Home;

{
  /* <div className="flex text-white bg-purple-500 rounded-lg shadow m-5 p-3 md:w-96 md:p-5 cursor-pointer transition duration-150 transform hover:scale-105">
          <div
            className="h-24 w-16 bg-cover"
            style={{ backgroundImage: "url(/magnus.png)" }}
          ></div>
          <div className="ml-5">
            Dogoli Zolideme Magnus
            <br /> Call 0248966248
            <br /> WhatsApp 0506978622
            <br /> UDS Dungu Campus
          </div>
        </div> */
}
