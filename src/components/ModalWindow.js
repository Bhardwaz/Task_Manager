import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { addTask } from "../utils/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
const ModalWindow = ({
  setModalVisible,
  setFetch,
  setInstructions,
  instructions,
  setSubject,
  subject,
}) => {
  const dispatch = useDispatch();

  const addTaskForUsers = async () => {
    if (!subject && !instructions) return;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/tasks",
        {
          subject: subject,
          instructions: instructions,
        },
        config
      );
      const spreadObject = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          spreadObject[key] = data[key];
        }
      }
      dispatch(addTask({ ...spreadObject, status: false }));
      setModalVisible(false);
      setSubject("");
      setInstructions("");
      setFetch(!fetch);
      toast.success("Task added successfully", {
        duration: 3000,
        autoClose: true,
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in adding task", {
        duration: 3000,
        autoClose: true,
        position: "top-center",
      });
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-70 bg-gray-800">
      <div className="bg-white p-4 rounded shadow-md w-1/2">
        <h1 className="text-3xl font-bold mb-4">Subject</h1>
        <input
          className="text-xl border border-gray-300 rounded px-3 py-2 w-full"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <h1 className="text-3xl font-bold mt-4">Instructions</h1>
        <input
          className="text-xl border border-gray-300 rounded px-3 py-2 w-full"
          type="text"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <p className="mt-1 h-2 text-red-400 italic font-semi-bold">
          {subject === "" && instructions === ""
            ? null
            : "All fields are required**"}
        </p>
        <div className="flex gap-2 justify-start mt-2">
          <button
            onClick={() => addTaskForUsers()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mt-4 rounded"
          >
            Add
          </button>

          <button
            onClick={() => setModalVisible(false)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
