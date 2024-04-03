import React, { useEffect } from "react";
import GoogleButton from "react-google-button";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthConext";

export default function Login() {
  const { googleSignIn } = UserAuth();
  const user = sessionStorage.getItem("user");
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  if (user != null) {
    navigate("/dashboard");
  }

  return (
    <div>
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  );
}
