import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import { SignIn } from "../../validation/Validation";
import { BeatLoader } from "react-spinners";

const LoginFormCom = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    onSubmit: () => {
      signInUser();
    },
    validationSchema: SignIn,
  });

  const signInUser = () => {
    setLoading(true);
    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        console.log(user);
        if (user.emailVerified == true) {
          console.log("true");
        } else {
          toast.error("Please varify your email", {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
      <div>
        <h1 className="font-fontBold text-xl mb-4">Login to your account</h1>
        <form onSubmit={formik.handleSubmit}>
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
            {loading ? <BeatLoader color="white" size={5} /> : "Sign In"}
          </button>
        </form>
        <p className="font-fontRegular text-base text-gray-400 mt-5">
          Don't have an account? Sign Up
        </p>
      </div>
    </>
  );
};

export default LoginFormCom;
