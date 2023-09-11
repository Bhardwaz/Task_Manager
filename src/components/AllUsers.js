import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();
  const users = useSelector((store) => store.users.users);
  useEffect(() => {
    getAllUsers();
  }, []);
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/allUsers");
      setAllUsers(data);
    } catch (error) {
      console.log(error);
      toast.success("Error is getting users", {
        duration: 3000,
        autoClose: true,
        position: "top center",
      });
    }
  };
  return (
    <div className="mx-auto w-8/12 mt-20">
      <div className="flex justify-between w-full text-3xl bg-slate-200 font-bold p-4 rounded-lg">
        <p> All Users </p>
        <div
          onClick={() => navigate("/home")}
          className="bg-green-400 text-lg font-bold rounded-lg p-1 cursor-pointer text-center transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#2B292E] hover:text-white"
        >
          Back
        </div>
      </div>
      <div>
        {allUsers.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
