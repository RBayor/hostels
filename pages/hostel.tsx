import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchByID } from "../services/fetch/fetchByID";
import Head from "next/head";
import "tailwindcss/tailwind.css";

const Hostel = (props) => {
  const router = useRouter();
  const query = router.query;
  const [hostel, setHostel] = useState(null);

  useEffect(() => {
    const fetchHostel = async () => {
      if (query) {
        const res = await fetchByID(query.id.toString());
        res.forEach((hostel) => {
          setHostel(hostel.data());
        });
      }
    };

    fetchHostel();
  }, []);

  // useEffect(() => {
  //   console.log(hostel);
  // }, [hostel]);
  return hostel !== null ? (
    <div className="flex flex-col">
      <Head>
        <title>{hostel.hostelName.toUpperCase()}</title>
        <link rel="icon" href="/logo_transparent.png" />
      </Head>

      {/* Display hostel images in cards that when clicked open a modal to full image */}
      <div className="mx-auto text-4xl p-5 font-bold text-purple-500">
        {hostel.hostelName.toUpperCase()}
      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap mt-5 mx-auto">
        {hostel.hostelImg.map((img, index) => (
          <div
            key={index}
            className="h-96 w-80  text-white rounded-lg shadow cursor-pointer transition duration-150 transform hover:scale-105 outline-none mx-5"
            style={{
              backgroundImage: `url(${img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            // onClick={() => fetchHostelDetails(hostel.data().id)}
          ></div>
        ))}
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
