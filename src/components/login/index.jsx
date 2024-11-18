import React, { useContext, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig.js";
import { AuthContext } from "../../authContext/auth.jsx";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/index.jsx";
const provider = new GoogleAuthProvider();
const Login = () => {
  const navigate = useNavigate();
  const { authUser, isLoading } = useContext(AuthContext);
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log(authUser, "hello");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isLoading && authUser) {
      navigate("/");
    }
  }, [isLoading, authUser]);
  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <>
      <button
        onClick={signInWithGoogle}
        className="border-black border-2 p-2 m-10"
      >
        Login With Google{" "}
      </button>
    </>
  );
};

export default Login;
