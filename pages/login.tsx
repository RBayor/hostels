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
    <div className="p-6 max-w-sm  md:max-w-lg mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4 mt-10">
      <div>
        <form>
          <div className="text-3xl font-medium text-purple-500 w-full mb-5 text-center">
            Sign in
          </div>
          <input
            className="bg-white rounded p-2 outline-none ring-1 mb-3 w-full "
            name="ownerName"
            type="text"
            placeholder="Email"
          />
          <input
            className="bg-white rounded p-2 outline-none ring-1 mb-3 w-full "
            name="ownerName"
            type="text"
            placeholder="Password"
          />

          <button
            disabled={authorization}
            onClick={handleLogout}
            className="text-white text-xlg font-bold bg-purple-400 p-3 rounded focus:outline-none w-full mt-5 mb-2"
          >
            Sign in
          </button>

          <button
            disabled={authorization}
            onClick={handleLoginWithGoogle}
            className="text-white text-xlg font-bold bg-green-400 p-3 rounded focus:outline-none  w-full"
          >
            Sign in With Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
