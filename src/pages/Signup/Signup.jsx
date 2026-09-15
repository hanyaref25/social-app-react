import React, { useState } from "react";
import herosignup from "../../assets/hero.jpg";
import { useFormik } from "formik";
import { toast } from "sonner";
import axios from "axios";
import * as yup from "yup";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router";

export default function SignUpPage() {

const [isUserNameExist , setUserNameExist] = useState(false)
const [isEmailExist , setIsEmailExist] = useState(false)

const navigate = useNavigate()



  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+={[\]}|\\:;"'<>,.?/~`]).{8,}$/;


    function HandleEmailChange(e){
      setFieldValue('email' , e.target.value)
      setIsEmailExist(false)

    };
     function HandleUsernameChange(e){
      setFieldValue('username' , e.target.value)
      setUserNameExist(false)

    }

  const schema = yup.object({
    name: yup
      .string()
      .required("Name Is Required")
      .min(3, "Name must be at least 3 charcters")
      .max(25, "Name can not be more than 25 charcters"),

    username: yup
      .string()
      .required("username Is Required")
      .min(3, "username must be at least 3 charcters")
      .max(25, "username can not be more than 25 charcters"),

    email: yup
      .string()
      .required("Email is Required ")
      .email("Email is not valid"),

    password: yup
      .string()
      .required()
      .matches(
        passwordRegex,
        `Your password must be at least 8 characters long and include:
          • One uppercase letter (A-Z)
          • One lowercase letter (a-z)
          • One number (0-9)
          • One special character (e.g., !, @, #, $, %)`,
      ),
    rePassword: yup
      .string()
      .required("confirm password is required")
      .oneOf(
        [yup.ref("password")],
        "password and confirm password shoud be the same",
      ),

    gender: yup
      .string()
      .required("Gender is required")
      .oneOf(["male", "female"], "gender must be either male or female "),
    dateOfBirth: yup.string().required("date of birth is reqired"),
  });

  const { values, handleChange, handleBlur, handleSubmit, errors, touched , setFieldValue , isSubmitting , isValid , dirty} =
    useFormik({
      initialValues: {
        name: "",
        username: "",
        email: "",
        password: "",
        rePassword: "",
        gender: "",
        dateOfBirth: "",
      },

      validationSchema: schema,

      onSubmit: async (values) => {
        try {
          const options = {
            method: "POST",
            url: "https://route-posts.routemisr.com/users/signup",
            headers: { "Content-Type": "application/json" },
            data: values,
          };

          const { data } = await axios.request(options);
          console.log(data);
          if (data.success) {
            toast.success("account created");
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          }
        } catch (error) {
          if(error.response.data.message ==='user already exists.'){
            setIsEmailExist(true)
          }
          if(error.response.data.message ==='username already exists.'){
            setUserNameExist(true)
        }
        }
      },
    });

  return (
    <>
      <div className="grid grid-cols-2 items-center min-h-screen ">
        <div className="signup-form flex flex-col justify-center items-center gap-4 ">
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <form
            action=""
            className="min-w-1/2 space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errors.name && touched.name ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  {errors.name}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={values.username}
                onChange={HandleUsernameChange}
                onBlur={handleBlur}
              />
              {errors.username && touched.username ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  {errors.username}
                </p>
              ) : (
                ""
              )}

              {
                isUserNameExist && <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  Username Is Already Exist
                </p>
              }
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={values.email}
                onChange={HandleEmailChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  {errors.email}
                </p>
              ) : (
                ""
              )}

               {
                isEmailExist && <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  Email Is Already Exist
                </p>
              }
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded whitespace-pre-line">
                  {errors.password}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="rePassword">Confirm Password </label>
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                className="form-control"
                value={values.rePassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.rePassword && touched.rePassword ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  {errors.rePassword}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                className="form-control"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && touched.gender ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  {errors.gender}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="date">Date of Birth</label>
              <input
                type="date"
                id="date"
                name="dateOfBirth"
                className="form-control"
                value={values.dateOfBirth}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.dateOfBirth && touched.dateOfBirth ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  {errors.dateOfBirth}
                </p>
              ) : (
                ""
              )}
            </div>

            <button className="btn-primary text-center mt-4 w-full disabled:cursor-not-allowed disabled:bg-black/70" disabled={!(dirty && isValid)}>
              {isSubmitting ? <LoaderCircle className="animate-spin text-center mx-auto block" /> : "Create Account"}
            </button>
          </form>
        </div>
        <div className="form-hero hidden md:block">
          <img
            src={herosignup}
            className="w-full h-full object-contain object-center"
          />
        </div>
      </div>
    </>
  );
}
