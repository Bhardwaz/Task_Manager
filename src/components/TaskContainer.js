import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { toggleTask } from "../utils/tasksSlice";

const TaskContainer = ({
  task,
  subject,
  instructions,
  setSubject,
  setInstructions,
  setFetch,
}) => {
  const [edit, setEdit] = useState(false);
  const userObject = useSelector((store) => store.user.user);
  const [user] = userObject;
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);
  const allTasks = useSelector((store) => store.tasks.tasks);
  const handleCheckboxChange = () => {
    console.log(allTasks);
    allTasks.find((t) => {
      console.log(t.id);
      if (t.id === task.id) {
        dispatch(toggleTask(t.id));
        return true;
      }
    });
    setIsChecked(!isChecked);
  };

  const editTask = async () => {
    if (!subject || !instructions) {
      setEdit(!edit);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.put(
        `http://localhost:3001/tasks/${task.id}`,
        {
          subject: subject,
          instructions: instructions,
        },
        config
      );
      setInstructions("");
      setSubject("");
      setEdit(!edit);
      setFetch(!fetch);
      toast.success("Task is edited", {
        autoClose: true,
        duration: 3000,
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error in editing the task", {
        autoClose: true,
        duration: 3000,
        position: "top-center",
      });
      setInstructions("");
      setSubject("");
    }
  };

  const deleteTask = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3001/tasks/${task.id}`
      );
      toast.success("Successfully deleted", {
        duration: 3000,
        autoClose: true,
        position: "top-center",
      });
      setFetch(!fetch);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete the task", {
        duration: 3000,
        autoClose: true,
        position: "top-center",
      });
    }
  };

  return (
    <div className="px-3 py-1 rounded-lg w-full mt-5 font-bold bg-slate-200 mb-8">
      <div className="flex justify-between items-center">
        {edit ? (
          <input
            className="text-red-500 mt-2 w-10/12 p-2"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
        ) : (
          <p className="w-10/12 text-4xl"> {task.subject} </p>
        )}

        <div className="flex space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          {edit ? (
            <button
              onClick={() => editTask()}
              type="button"
              className="transition-transform transform hover:scale-105 active:scale-95 rounded-md border border-green-600 px-3 py-2 text-sm font-semibold text-green-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Save
            </button>
          ) : user?.userRole === "Admin" ||
            user?.userRole === "Head Coach" ||
            user?.userRole === "Controller" ? (
            <button
              onClick={() => setEdit(!edit)}
              type="button"
              className="transition-transform transform hover:scale-105 active:scale-95 rounded-md border border-green-600 px-3 py-2 text-sm font-semibold text-green-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Edit
            </button>
          ) : null}
          {user?.userRole === "Admin" || user?.userRole === "Controller" ? (
            <button
              onClick={() => deleteTask()}
              type="button"
              className="transition-transform transform hover:scale-105 active:scale-95 rounded-md border border-red-600 px-3 py-2 text-sm font-semibold text-red-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Delete
            </button>
          ) : null}
        </div>
      </div>

      {edit ? (
        <input
          className="text-red-500 mt-2 w-10/12 p-2"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      ) : (
        <div>
          <p className="text-red-500 mt-2">{task.instructions}</p>
          <div className="flex gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </label>
            <p className={`${isChecked ? "text-green-500" : "text-blue-500"}`}>
              {isChecked ? "completed" : "active"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskContainer;
