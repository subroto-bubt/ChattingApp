import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { signUp } from "../../validation/Validation";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { BeatLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

const RegFormCom = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      createNewUser();
    },
    validationSchema: signUp,
  });

  const createNewUser = () => {
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            toast.success("🦄Email send for verification", {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            const timeoutId = setTimeout(() => {
              navigate("/login");
            }, 2000);
            return () => clearTimeout(timeoutId);
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.message, {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("🦄Email is already used", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setLoading(false);
        }
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // ..
      });
  };

  //   console.log(formik);
  return (
    <>
      <div>
        <h1 className="font-fontBold text-xl mb-4">
          Ragistration for your new journey
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <input
            name="fullName"
            value={formik.values.fullName}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            onChange={formik.handleChange}
            type="text"
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <p className="font-fontRegular text-red-600 text-sm mb-5">
              &#9757; {formik.errors.fullName}
            </p>
          )}
          <input
            name="email"
            value={formik.values.email}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            onChange={formik.handleChange}
            type="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="font-fontRegular text-red-600 text-sm mb-5">
              &#9757; {formik.errors.email}
            </p>
          )}
          <input
            name="password"
            value={formik.values.password}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-slate-400 rounded-md outline-none mb-3"
            onChange={formik.handleChange}
            type="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="font-fontRegular text-red-600 text-sm mb-5">
              &#9757; {formik.errors.password}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white font-fontBold text-base rounded-md w-full py-2"
          >
            {loading ? <BeatLoader color="white" size={5} /> : "Sign Up"}
          </button>
        </form>
        <p className="font-fontRegular text-base text-gray-400 mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
};

export default RegFormCom;
