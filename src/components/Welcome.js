import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskContainer from "./TaskContainer";
import { AddIcon } from "@chakra-ui/icons";
import ModalWindow from "./ModalWindow";
import { useDispatch, useSelector } from "react-redux";
import store from "../utils/store";
import { removeUser } from "../utils/userSlice";
import axios from "axios";

const Welcome = () => {
  const [subject, setSubject] = useState("");
  const [instructions, setInstructions] = useState("");
  const [fetch, setFetch] = useState(true);
  const dispatch = useDispatch();
  const [liveTask, setLiveTask] = useState("");
  const userObject = useSelector((store) => store.user.user);
  const [user] = userObject;
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("credentials");
    if (!token) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    fetchTasks();
  }, [fetch]);
  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/tasks");
      setLiveTask(data);
    } catch (error) {
      toast.error("Error in getting tasks", {
        duration: 3000,
        autoClose: 3000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="mx-auto w-8/12 mt-20">
      <div className="flex justify-between w-full text-3xl bg-slate-200 font-bold p-4 rounded-lg">
        <p>
          {" "}
          Hii Welcome {user?.userRole}, {user?.name}{" "}
        </p>
        <div className="flex justify-around gap-4">
          <button
            onClick={() => navigate("/allUsers")}
            className="bg-green-400 text-lg font-bold rounded-lg p-1 cursor-pointer text-center transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#2B292E] hover:text-white"
          >
            All Users
          </button>
          <button
            className="bg-green-400 text-lg font-bold rounded-lg p-1 cursor-pointer text-center transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#2B292E] hover:text-white"
            onClick={() => {
              localStorage.removeItem("credentials");
              dispatch(removeUser());
              navigate("/");
            }}
          >
            {" "}
            Logout{" "}
          </button>
        </div>
      </div>
      {liveTask.length
        ? liveTask.map((task) => (
            <TaskContainer
              key={task.id}
              task={task}
              subject={subject}
              instructions={instructions}
              setSubject={setSubject}
              setInstructions={setInstructions}
              setModalVisible={setModalVisible}
              setFetch={setFetch}
            />
          ))
        : null}
      <div className="flex justify-end w-full">
        {user?.userRole === "Admin" || user?.userRole === "Controller" ? (
          <div className="bg-slate-200 flex justify-center items-center p-3 w-10 h-10 mt-4 rounded-full cursor-pointer transition-transform transform hover:scale-105 active:scale-95">
            <AddIcon
              onClick={() => {
                setModalVisible(!modalVisible);
              }}
              w={30}
              h={30}
            />
          </div>
        ) : null}
      </div>
      {modalVisible ? (
        <ModalWindow
          setInstructions={setInstructions}
          instructions={instructions}
          setSubject={setSubject}
          subject={subject}
          setModalVisible={setModalVisible}
          setFetch={setFetch}
        />
      ) : null}
    </div>
  );
};

export default Welcome;
