import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addUsers, removeUsers } from "../utils/usersSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addUsersToRedux = () => {
    dispatch(removeUsers());
    dispatch(addUsers(data));
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      if (!email || !password) return;

      try {
        const { data } = await axios.get("http://localhost:3001/allUsers");
        // addUsersToRedux();
        let foundUser = null;
        for (const user of data) {
          if (
            user.email === email &&
            (await bcrypt.compare(password, user.encryptedPass))
          ) {
            foundUser = user;
            break;
          }
        }

        if (foundUser) {
          dispatch(addUser(foundUser));
          const token = await bcrypt.hash(password, 10);
          localStorage.setItem("credentials", token);
          navigate("/home");
          toast.success(`Hi ${foundUser?.userRole}. Welcome`, {
            position: "bottom-center",
            autoClose: true,
          });
        } else {
          toast.error("Incorrect credentials", {
            position: "bottom-center",
            autoClose: true,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Error in login route", {
          position: "bottom-center",
          autoClose: true,
        });
      }
    },
  });
  return (
    <form className="flex flex-col" onSubmit={formik.handleSubmit}>
      <label className="pl-10 text-xl" htmlFor="firstName">
        {" "}
        Email*
      </label>
      <div className="flex justify-center">
        <input
          className={` ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          } p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-11/12`}
          id="firstName"
          type="email"
          {...formik.getFieldProps("email")}
        />
      </div>
      <div className="h-6">
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm pl-10 mt-1">
            {formik.errors.email}
          </div>
        ) : null}
      </div>

      <label className="pl-10 text-xl" htmlFor="email">
        Password*
      </label>
      <div className="flex justify-center">
        <input
          className={`${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : "border-gray-300"
          } p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-11/12`}
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
        />
      </div>
      <div className="h-6">
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm pl-10 mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="flex justify-center p-2 pt-5">
        <button
          className="bg-green-400 w-11/12 rounded-lg p-1 cursor-pointer text-center transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#2B292E] hover:text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignIn;
