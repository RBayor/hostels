import React from "react";

interface User {
  name: string;
  token: string;
}

const Uploads: React.FC<User> = () => {
  return <div>welcome to uploads</div>;
};

export default Uploads;
