"use client";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useLoginMutation } from "@/Redux/Features/Auth/authApi";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalide email").required("please enter your email"),
  password: Yup.string()
    .required("please enter your password")
    .min(8, "password must be at least 8 characters"),
});

const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error, data }] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });
  const { handleChange, handleSubmit, values, errors, touched } = formik;
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully");
      setOpen(false);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "Login failed");
      } else {
        console.log(error);
      }
    }
  }, [isSuccess, error, setOpen]);

  return (
    <div>
      <Grid container component="main" sx={{ height: "50vh", position: "relative" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={6}
          sx={{
            backgroundImage: `url(/assets/Login.png)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            zIndex: -20,
          }}>
          <Box className="w-full h-full bg-primary absolute top-0 left-0 opacity-60 -z-10"></Box>
          <Box className="mt-6 hidden md:block p-6">
            <h3 className="text-white font-semibold text-[28px] font-Poppins">
              {" "}
              One Step Closer To <br />
              Your dream
            </h3>
            <p className="mt-4 text-white text-base font-Poppins leading-8">
              An E-Learning service that is ready to help you become an expert
            </p>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          sx={{
            backgroundColor: "#1C1E53 ",
            color: "#fff",
          }}
          component={Paper}
          elevation={6}
          square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
            }}>
            <h2 className="text-white font-Poppins text-2xl mb-4">Login</h2>
            <h5 className="text-white font-Poppins mb-4">Login to your account</h5>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={values.email}
                  className={`${
                    errors.email && touched.email ? "border-red-500" : ""
                  } ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full`}
                  placeholder="Email"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500 w-full mt-1 font-Poppins ">{errors.email}</div>
                ) : null}
              </div>
              <div className="mt-4 relative">
                <input
                  type={!show ? "password" : "text"}
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={values.password}
                  className={`${
                    errors.password && touched.password ? "border-red-500" : ""
                  } ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full`}
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <div className="text-red-500 w-full mt-1 font-Poppins ">{errors.password}</div>
                ) : null}
                <span
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow(!show)}>
                  {!show ? (
                    <AiOutlineEyeInvisible className="text-white" size={20} />
                  ) : (
                    <AiOutlineEye className="text-white" size={20} />
                  )}
                </span>
              </div>
              <button
                type="submit"
                className="bg-yellow text-primary w-full my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300">
                Login
              </button>
              <Box className="flex justify-center flex-col items-center">
                <span className="text-white font-Poppins block">Or Login With</span>
              </Box>
              <div className="flex justify-center items-center mt-3">
                <FcGoogle className="cursor-pointer" size={30} onClick={() => signIn("google")} />
                <AiFillGithub className="ms-2 cursor-pointer" size={30} onClick={() => signIn("github")} />
              </div>
              <h5 className="mt-4 font-Poppins">
                Don&apos;t have an account ?{" "}
                <span
                  onClick={() => setRoute("Register")}
                  className="text-yellow font-Poppins cursor-pointer underline">
                  Register
                </span>
              </h5>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
