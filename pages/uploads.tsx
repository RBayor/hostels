import React, { useEffect, useState } from "react";
import { useAuth } from "../services/authentication/auth";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/storage";
import { firestore } from "../services/authentication/firebaseClient";
import Head from "next/head";
import { v4 as uuidv4 } from "uuid";

interface User {
  name: string;
  token: string;
}

interface Hostel {
  ownerName: null | string;
  primaryPhone: null | string;
  secondaryPhone: null | string;
  email: null | string;
  hostelName: null | string;
  campus: null | string;
  images: null | string;
  description: null | string;
  hostelImg: [];
  minPrice: number;
  maxPrice: number;
}

const Uploads: React.FC = () => {
  const router = useRouter();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [imgState, setImgState] = useState(false);
  const [hostelDoc, setHostelDoc] = useState<null | string>(null);
  const [uploaded, setUploaded] = useState<number>(0);
  const [hostelInfo, setHostelInfo] = useState<Hostel>({
    ownerName: null,
    primaryPhone: null,
    secondaryPhone: null,
    email: null,
    hostelName: null,
    campus: null,
    images: null,
    description: null,
    hostelImg: [],
    minPrice: null,
    maxPrice: null,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    await createFirestoreDoc();

    if (hostelInfo.images) {
      for (let i = 0; i < hostelInfo.images.length; i++) {
        await uploadTask(hostelInfo.images[i]);
      }
    }
    setLoading(false);
  };

  const createFirestoreDoc = async () => {
    await firestore
      .collection("hostels")
      .add({
        userID: `${auth.user.uid}`,
        id: uuidv4,
        ownerName: hostelInfo.ownerName.toLowerCase(),
        primaryPhone: hostelInfo.primaryPhone,
        secondaryPhone: hostelInfo.secondaryPhone,
        email: hostelInfo.email.toLowerCase(),
        hostelName: hostelInfo.hostelName.toLowerCase(),
        campus: hostelInfo.campus.toLowerCase(),
        description: hostelInfo.description.toLowerCase(),
        minPrice: parseInt(`${hostelInfo.minPrice}`),
        maxPrice: parseInt(`${hostelInfo.maxPrice}`),
      })
      .then((doc) => setHostelDoc(doc.id));
  };

  const updateImageLocation = async () => {
    if (hostelInfo.hostelImg && hostelDoc) {
      await firestore.collection("hostels").doc(hostelDoc).set(
        {
          hostelImg: hostelInfo.hostelImg,
        },
        { merge: true }
      );
    }
  };

  const handleImages = (event) => {
    setHostelInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.files,
    }));
  };

  useEffect(() => {
    // hostelInfo.images.forEach((img, index) => uploadTask(img));
  }, [hostelInfo.images]);

  const uploadTask = async (img: any) => {
    let storageRef = firebase.storage().ref("hostels" + "/" + img.name);
    let task = storageRef.put(img);
    task.on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploaded(Math.floor(percentage));
      },
      (error) => {},
      async () => {
        task.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          //   console.log(downloadURL);

          setHostelInfo((prev: any) => ({
            ...prev,
            hostelImg: [...prev.hostelImg, downloadURL],
          }));
        });
      }
    );
  };

  const handleChange = (event) => {
    setHostelInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (!auth.user) router.push("/login");
  }, []);

  useEffect(() => {
    updateImageLocation();
  }, [hostelInfo.hostelImg]);

  return (
    <div
      className="h-screen bg-cover bg-center p-10"
      style={{
        backgroundImage: "url(/senam.jpg)",
      }}
    >
      <Head>
        <title>Upload Hostel</title>
        <link rel="icon" href="/logo_transparent.png" />
      </Head>
      <div className="p-6 max-w-sm  md:max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 ">
        <div>
          <div className="text-3xl font-medium text-purple-500 w-full">
            Upload Hostel
          </div>
          <form className="pt-5" onSubmit={handleSubmit}>
            {/* Owner Details */}
            <div className="text-xl text-purple-500 mt-3 mb-3">Owner</div>
            <input
              className="bg-white rounded p-2 outline-none ring-1 mb-3 w-full "
              name="ownerName"
              type="text"
              placeholder="Owner Name"
              onChange={handleChange}
              value={hostelInfo.ownerName || ""}
            />
            <input
              className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
              name="primaryPhone"
              type="text"
              placeholder="Primary Phone Number"
              onChange={handleChange}
              required
            />
            <input
              className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
              name="secondaryPhone"
              type="text"
              placeholder="Secondary Phone Number (optional)"
              onChange={handleChange}
            />
            <input
              className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
              name="email"
              type="text"
              placeholder="Email"
              onChange={handleChange}
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
              required
              onChange={handleChange}
            />
            <input
              className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
              name="minPrice"
              type="number"
              placeholder="Minumum Price"
              required
              onChange={handleChange}
            />
            <input
              className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
              name="maxPrice"
              type="number"
              placeholder="Maximum Price"
              required
              onChange={handleChange}
            />
            <select
              name="campus"
              className="p-2 bg-white focus:outline-none w-full rounded mb-3 ring-1 text-gray-500"
              onChange={handleChange}
              required
            >
              <option disabled selected value="" hidden>
                Campus
              </option>
              <option value="nyankpala">Nyankpala</option>
              <option value="dungu">Dungu</option>
            </select>
            <div>
              <input
                className="bg-white rounded p-2 outline-none mb-3"
                name="images"
                type="file"
                placeholder="Hostel Name"
                onChange={handleImages}
                multiple
                required
              />
              <span className="text-green-500">
                {uploaded === 0 ? <></> : `${uploaded}%`}
              </span>
            </div>

            <textarea
              className="bg-white rounded p-2 outline-none mb-3 w-full ring-1"
              name="description"
              placeholder="Description"
              required
              onChange={handleChange}
            />
            <button
              // onClick={handleSubmit}
              type="submit"
              disabled={loading}
              className="text-white text-xlg font-bold bg-purple-500 p-3 rounded focus:outline-none w-full cursor-pointer transition duration-150 transform hover:scale-105 "
            >
              Upload
            </button>
            <button
              onClick={() => router.replace("/")}
              className="text-white text-xlg font-bold bg-red-500 p-3 rounded focus:outline-none w-full cursor-pointer transition duration-150 transform hover:scale-105 mt-3"
            >
              Home
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Uploads;
