import Head from "next/head";
import "tailwindcss/tailwind.css";
import Footer from "../components/footer";
import { useRouter } from "next/router";
// import "../services/firebase";
import { useEffect } from "react";
import { getHostels } from "../services/hostels";

const Home: React.FC = () => {
  const router = useRouter();

  const findHostel = (e) => {
    e.preventDefault();
    router.push("/search");
  };

  const uploadHostel = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  useEffect(() => {
    // getHostels();
  }, []);

  return (
    <div>
      <Head>
        <title>Hostel Hub</title>
        <link rel="icon" href="/logo_transparent.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Header */}

      <div className="flex flex-col">
        <div
          className="h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url(/senam.jpg)",
          }}
        >
          <div className="text-6xl text-center mx-auto p-10 font-bold text-white ">
            <span className="cursor-pointer">Hostel Hub</span>
          </div>

          {/* Top image and form */}
          <div className="grid p-10">
            <form className=" bg-white rounded-lg shadow p-10 h-full ml-auto w-full md:w-96 lg:w-1/3 lg:mr-52">
              <div className="text-start font-black">
                Find A Hostel on Your Campus Now
              </div>
              <select className="w-full mt-4 p-2 bg-white focus:outline-none text-gray-500">
                <option disabled selected hidden>
                  Select Campus
                </option>
                <option>Nyankpala</option>
                <option>Dungu</option>
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
      <div className="flex text-white bg-purple-500 rounded-lg shadow m-5 p-3 md:w-96 md:p-5 cursor-pointer transition duration-150 transform hover:scale-105">
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
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
