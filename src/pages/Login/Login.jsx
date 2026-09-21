import React, { useState } from "react";
import herosignup from "../../assets/hero.jpg";
import { useFormik } from "formik";
import { toast } from "sonner";
import axios from "axios";
import * as yup from "yup";
import { LoaderCircle } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../context/user.context";

export default function Login() {
  const { setToken } = useContext(UserContext);

  const [hasWrongCredentials, setHasWrongCredentials] = useState(false);

  const navigate = useNavigate();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+={[\]}|\\:;"'<>,.?/~`]).{8,}$/;

  function HandleEmailChange(e) {
    setFieldValue("email", e.target.value);
  }
  function HandleUsernameChange(e) {
    setFieldValue("username", e.target.value);
    setUserNameExist(false);
  }

  const schema = yup.object({
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
  });

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    isValid,
    dirty,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: schema,

    onSubmit: async (values) => {
      try {
        const options = {
          method: "POST",
          url: "https://route-posts.routemisr.com/users/signin",
          headers: { "Content-Type": "application/json" },
          data: values,
        };

        const { data } = await axios.request(options);
        console.log(data);
        if (data.success) {
          toast.success("Login successful");
          const token = data.data.token;
          setToken(token);

          localStorage.setItem("token", token);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error) {
        console.log({ error });
        if (error.response.data.message === "incorrect email or password") {
          setHasWrongCredentials(true);
        }
      }
    },
  });

  return (
    <>
      <div className="grid grid-cols-2 items-center min-h-screen ">
        <div className="signup-form flex flex-col justify-center items-center gap-4 ">
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <form
            action=""
            className="min-w-1/2 space-y-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={values.email}
                onChange={(e) => {
                  HandleEmailChange(e);
                  setHasWrongCredentials(false);
                }}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  {errors.email}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={values.password}
                onChange={(e) => {
                  handleChange(e);
                  setHasWrongCredentials(false);
                }}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded whitespace-pre-line">
                  {errors.password}
                </p>
              ) : (
                ""
              )}

              {hasWrongCredentials && (
                <p className="bg-red-200 text-red-800 px-3 py-1 text-sm font-medium rounded">
                  incorrect email or password
                </p>
              )}
            </div>

            <button
              className="btn-primary text-center mt-4 w-full disabled:cursor-not-allowed disabled:bg-black/70"
              disabled={!(dirty && isValid)}
            >
              {isSubmitting ? (
                <LoaderCircle className="animate-spin text-center mx-auto block" />
              ) : (
                "Login"
              )}
            </button>
            <Link to="/Signup" className="text-blue-500 hover:underline">
              {"Don't have an account? Sign up"}
            </Link>
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
