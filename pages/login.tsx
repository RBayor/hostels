import { useState, useEffect } from "react";
import firebase from "firebase";
import "../services/firebase";
import { useRouter } from "next/router";

const provider = new firebase.auth.GoogleAuthProvider();

const Login = () => {
  const [authorization, setauthorization] = useState<boolean>(false);
  const [auth, setAuth] = useState<null | {}>(null);
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    setauthorization(true);

    try {
      const res = await firebase.auth().signInWithPopup(provider);
      const { user, credential } = res;

      setAuth({
        user,
        credential,
      });
    } catch (e) {
      console.log(e);
    }
    setauthorization(false);
  };

  const handleLogout = async () => {
    try {
      setAuth(null);
      const res = await firebase.auth().signOut();
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(auth);
    if (auth) router.push("/uploads");
  }, [auth]);

  return (
    <div className="flex space-x-2 bg-gray-200 h-screen w-screen place-content-center items-center">
      <button
        disabled={authorization}
        onClick={handleLoginWithGoogle}
        className="text-white text-xlg font-bold bg-green-400 p-3 rounded focus:outline-none"
      >
        Login With Google
      </button>
      <button
        disabled={authorization}
        onClick={handleLogout}
        className="text-white text-xlg font-bold bg-red-400 p-3 rounded focus:outline-none"
      >
        Logout
      </button>
    </div>
  );
};

export default Login;
