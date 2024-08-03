import { useFormik } from "formik";
import React from "react";
import { signUp } from "../../validation/Validation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegFormCom = ({ toast }) => {
  const auth = getAuth();
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
    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        if (error.message.includes("auth/email-already-in-use")) {
          toast.error("🦄 Email is already use", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
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
          <button className="bg-slate-900 text-white font-fontBold text-base rounded-md w-full py-2">
            Sign Up
          </button>
        </form>
        <p className="font-fontRegular text-base text-gray-400 mt-5">
          Already have an account? Sign In
        </p>
      </div>
    </>
  );
};

export default RegFormCom;
