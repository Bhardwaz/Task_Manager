import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import bcrypt from "bcryptjs";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = ({ visible, setVisible }) => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userRole: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),

      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Confirm password is required"),

      userRole: Yup.string().required("Please select a role"),
    }),
    onSubmit: async (values) => {
      const { name, email, password, confirmPassword, userRole } = values;
      if (!name || !email || !password || !confirmPassword || !userRole) return;
      const encryptedPass = await bcrypt.hash(password, 10);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:3001/allUsers",
          {
            name,
            email,
            encryptedPass,
            userRole,
          },
          config
        );
        toast.success(`${name} Registered Successfully`, {
          position: "bottom-center",
        });
        console.log(data);
        setVisible(!visible);
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong", {
          position: "bottom-center",
        });
      }
    },
  });
  return (
    <form className="flex flex-col" onSubmit={formik.handleSubmit}>
      <label className="pl-10 text-xl" htmlFor="firstName">
        Name*
      </label>
      <div className="flex justify-center">
        <input
          className={` ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : "border-gray-300"
          } p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-11/12`}
          id="firstName"
          type="text"
          {...formik.getFieldProps("name")}
        />
      </div>
      <div className="h-6">
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm pl-10 mt-1">
            {formik.errors.name}
          </div>
        ) : null}
      </div>

      <label className="pl-10 text-xl" htmlFor="email">
        Email Address*
      </label>
      <div className="flex justify-center">
        <input
          className={`${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-gray-300"
          } p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-11/12`}
          id="email"
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
        Password*{" "}
        <span
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className={`${
            showPassword ? "bg-gray-50" : "bg-gray-300"
          } px-1 cursor-pointer hover:opacity-70`}
        >
          {showPassword ? "Hide" : "Show"}
        </span>
      </label>
      <div className="flex justify-center">
        <input
          className={`${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : "border-gray-300"
          } p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-11/12`}
          id="password"
          type={showPassword ? "text" : "password"}
          {...formik.getFieldProps("password")}
        />
      </div>
      <div className="h-6 w-11/12">
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm pl-10 mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="flex justify-center">
        <input
          className={`${
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "border-red-500"
              : "border-gray-300"
          } p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-11/12 mt-5`}
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          {...formik.getFieldProps("confirmPassword")}
        />
      </div>
      <div className="h-6">
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-500 text-sm pl-10 mt-1">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      <label className="pl-10 pt-5 text-xl" htmlFor="userRole">
        Select a Role:
      </label>
      <div className="flex justify-center">
        <select
          className={`p-1 ${
            formik.touched.userRole && formik.errors.userRole
              ? "border-red-500"
              : "border-gray-300"
          } border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-11/12`}
          id="userRole"
          name="userRole"
          {...formik.getFieldProps("userRole")}
        >
          <option value="">Select a Role:</option>
          <option value="Admin"> Admin </option>
          <option value="Controller"> Controller </option>
          <option value="Head Coach"> Head Coach </option>
          <option value="Coach"> Coach </option>
        </select>
      </div>
      <div className="h-6">
        {formik.touched.userRole && formik.errors.userRole ? (
          <div className="text-red-500 text-sm pl-10 mt-1">
            {formik.errors.userRole}
          </div>
        ) : null}
      </div>

      <div className="flex justify-center p-2">
        <button
          className="bg-green-400 w-11/12 rounded-lg p-1 cursor-pointe text-center transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#2B292E] hover:text-white"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignUp;
