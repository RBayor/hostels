import React from "react";

interface User {
  name: string;
  token: string;
}

const Uploads: React.FC<User> = () => {
  return (
    <div className="p-6 max-w-sm  md:max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-10">
      <div>
        <div className="text-3xl font-medium text-purple-500 w-full">
          Upload Hostel
        </div>
        <form className="pt-5">
          {/* Owner Details */}
          <div className="text-xl text-purple-500 mt-3 mb-3">Owner</div>
          <input
            className="bg-white rounded p-2 outline-none ring-1 mb-3 w-full "
            name="ownerName"
            type="text"
            placeholder="Owner Name"
          />
          <input
            className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
            name="primaryContact"
            type="text"
            placeholder="Primary Phone Number"
          />
          <input
            className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
            name="primaryContact"
            type="text"
            placeholder="Secondary Phone Number (optional)"
          />
          <input
            className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
            name="primaryContact"
            type="text"
            placeholder="Email"
          />
          <input
            className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
            name="primaryContact"
            type="text"
            placeholder="Occupation"
          />

          {/* Hostel Details */}
          <div className="text-xl text-purple-500 mt-3 mb-3">
            Hostel Details
          </div>
          <input
            className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
            name="hostelName"
            type="text"
            placeholder="Hostel Name"
          />
          <select className="p-2 bg-white focus:outline-none w-full rounded mb-3 ring-1">
            <option disabled selected hidden>
              Campus
            </option>
            <option>Nyankpala</option>
            <option>Dungu</option>
          </select>
          <input
            className="bg-white rounded p-2 outline-none mb-3 w-full "
            name="file"
            type="file"
            placeholder="Hostel Name"
          />
          <textarea
            className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
            name="description"
            placeholder="Description"
          />
          <input
            className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
            name="file"
            type="text"
            placeholder="Location"
          />
        </form>
      </div>
    </div>
  );
};

export default Uploads;
