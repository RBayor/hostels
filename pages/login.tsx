import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "../services/authentication/firebaseClient";
import "firebase/auth";
import { useRouter } from "next/router";
import { useAuth } from "../services/authentication/auth";
import Head from "next/head";

const provider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const [authorization, setAuthorization] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const auth = useAuth();
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    setAuthorization(true);

    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
    setAuthorization(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthorization(true);

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(loginInfo.email, loginInfo.password);

      // console.log(res);
    } catch (e) {
      console.log(e);
    }
    setAuthorization(false);
  };

  const HandleFieldsChange = (event) => {
    setLoginInfo((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    // console.log(auth);
    if (auth.user) router.push("/uploads");
  }, [auth]);

  return (
    <div
      className="h-screen bg-cover bg-center p-10"
      style={{
        backgroundImage: "url(/senam.jpg)",
      }}
    >
      <Head>
        <title>Login</title>
        <link rel="icon" href="/logo_transparent.png" />
      </Head>
      <div className="p-6 max-w-sm  md:max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-10">
        <form>
          <div className="text-3xl font-medium text-purple-500 w-full mb-5 text-center">
            Sign in
          </div>
          <input
            className="bg-white rounded p-2 outline-none ring-1 mb-3 w-full "
            name="email"
            type="text"
            placeholder="Email"
            onChange={HandleFieldsChange}
          />
          <input
            className="bg-white rounded p-2 outline-none ring-1 mb-3 w-full "
            name="password"
            type="password"
            placeholder="Password"
            onChange={HandleFieldsChange}
            autoComplete=""
          />

          <button
            disabled={
              authorization ||
              loginInfo.email === "" ||
              loginInfo.password === ""
            }
            onClick={handleSignIn}
            className="text-white text-xlg font-bold bg-purple-400 p-3 rounded focus:outline-none w-full mt-5 mb-2 cursor-pointer transition duration-150 transform hover:scale-105"
          >
            Sign in
          </button>

          <button
            disabled={
              authorization ||
              loginInfo.email === "" ||
              loginInfo.password === ""
            }
            onClick={handleLoginWithGoogle}
            className="text-white text-xlg font-bold bg-green-400 p-3 rounded focus:outline-none w-full cursor-pointer transition duration-150 transform hover:scale-105"
          >
            Sign in With Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
