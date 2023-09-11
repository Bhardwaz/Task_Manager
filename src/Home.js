import React, { useState, useEffect } from "react";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import { useNavigate } from "react-router-dom";
const Heading = () => {
  return (
    <div className="mx-auto text-center mt-20 rounded w-4/12 h-full text-4xl text-[#d1fae5]">
      <p> Task Manager App </p>
    </div>
  );
};

const Home = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("credentials");
    if (token) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Heading />
      <div className="mx-auto bg-[#d1fae5] mt-20 rounded w-4/12 h-full text-2xl">
        <div className="flex justify-around p-4 gap-4">
          <p
            onClick={() => setVisible(true)}
            className={`${visible ? "bg-[#2B292E]" : "bg-emerald-400"} ${
              visible ? "text-white" : null
            } p-1 cursor-pointer w-2/4 text-center rounded-full transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#2B292E] hover:text-white`}
          >
            {" "}
            Sign In{" "}
          </p>
          <p
            onClick={() => setVisible(false)}
            className={`${visible ? "bg-emerald-400" : "bg-[#2B292E]"} ${
              visible ? null : "text-white"
            } transition-transform transform hover:scale-105 active:scale-95 p-1 cursor-pointer w-2/4 text-center rounded-full bg-emerald-400 hover:bg-[#2B292E] hover:text-white`}
          >
            {" "}
            Sign Up{" "}
          </p>
        </div>
        {visible ? (
          <SignIn />
        ) : (
          <SignUp visible={visible} setVisible={setVisible} />
        )}
      </div>
    </>
  );
};

export default Home;
