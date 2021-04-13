import Head from "next/head";
import "tailwindcss/tailwind.css";
import Footer from "../components/footer";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();

  const findHostel = (e) => {
    e.preventDefault();
    router.push(`/search`);
  };

  return (
    <div>
      <Head>
        <title>Hostel Hub</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Header */}

      <div className="h-screen w-full flex flex-col">
        <div
          className="h-screen bg-cover bg-center"
          style={{
            backgroundImage: "url(/senam.jpg)",
          }}
        >
          <div className="text-5xl text-center mx-auto p-10 font-bold text-white">
            Hostel Hub
          </div>

          {/* Top image and form */}
          <div className="grid p-10">
            <form className="col-start-2 col-span-4 bg-white rounded-lg shadow p-10 h-full ml-auto w-full md:w-1/4 mr-52">
              <div className="text-start font-black">
                Find A Hostel on Your Campus Now
              </div>
              <select className="w-full mt-4 p-2">
                <option disabled selected hidden>
                  Select Campus
                </option>
                <option>Nyankpala</option>
                <option>Dungu</option>
              </select>

              <button
                onClick={findHostel}
                className="rounded ml-auto bg-green-600 text-white w-full h-10 mt-5"
              >
                Find
              </button>
            </form>
          </div>
        </div>
        {/* Ad */}
        <div className="flex bg-gray-100 rounded-lg shadow m-5 p-3 md:w-1/5 md:p-5">
          <div
            className="h-full w-16 bg-cover "
            style={{ backgroundImage: "url(/magnus.png)" }}
          ></div>
          <div className="ml-10">
            Dogoli Zolideme Magnus
            <br /> Call 0248966248
            <br /> WhatsApp 0506978622
            <br /> UDS Dungu Campus
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
