import React from "react";
import { useRouter } from "next/router";

const Hostel = () => {
  const router = useRouter();
  const query = router.query;
  console.log(query);
  return <div></div>;
};

export default Hostel;
