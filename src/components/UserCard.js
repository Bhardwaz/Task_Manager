import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const UserCard = ({ user }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const updateUserRole = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.patch(
        `http://localhost:3001/allUsers/${user.id}`,
        {
          userRole: selectedValue,
        },
        config
      );
      console.log(data);
      toast.success("user role updated successfully", {
        duration: 3000,
        autoClose: true,
        position: "top center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in updating user role", {
        position: "bottom center",
        duration: 3000,
        autoClose: true,
      });
    }
  };
  return (
    <div className="px-3 py-1 rounded-lg w-full mt-5 font-bold bg-slate-200 mb-8">
      <div>
        <p>
          {" "}
          Name : <span className="font-bold"> {user.name}</span>{" "}
        </p>
        <p>{user.email} </p>
      </div>
      <div className="flex flex-col">
        <label className="pl-10 pt-5 text-xl" htmlFor="userRole">
          Select a Role:
        </label>
        <div className="flex justify-center">
          <select
            className={`p-1 border-gray-300
             border rounded-md focus:outline-none focus:border-blue-500 w-11/12`}
            id="userRole"
            name="userRole"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="">Select a Role:</option>
            <option value="Admin"> Admin </option>
            <option value="Controller"> Controller </option>
            <option value="Head Coach"> Head Coach </option>
            <option value="Coach"> Coach </option>
          </select>
        </div>
        <button
          onClick={() => updateUserRole()}
          type="button"
          className="bg-green-400 w-11/12 rounded-lg p-1 cursor-pointe text-center transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#2B292E] hover:text-white ml-12 mt-4"
        >
          {" "}
          Update{" "}
        </button>
      </div>
    </div>
  );
};

export default UserCard;
