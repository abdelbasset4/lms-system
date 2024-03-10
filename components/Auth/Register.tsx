"use client";
import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRegisterMutation } from "@/Redux/Features/Auth/authApi";
import toast from "react-hot-toast";
type Props = {
  setRoute: (route: string) => void;
};

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("please enter your name"),
  email: Yup.string().email("Invalide email").required("please enter your email"),
  password: Yup.string()
    .required("please enter your password")
    .min(8, "password must be at least 8 characters"),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("please enter your password")
    .min(8, "password must be at least 8 characters"),
});

const Register: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register, { isError, isSuccess, error, data }] = useRegisterMutation();
  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Register success";
      toast.success(message);
      setRoute("VerificationOTP");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.errors[0].msg || "Register failed");
      } else {
        console.log(error);
      }
    }
  }, [isSuccess, error, setRoute, data?.message]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async ({ name, email, password }) => {
      const data = { username: name, email, password };
      await register(data);
    },
  });
  const { handleChange, handleSubmit, values, errors, touched } = formik;
  return (
    <div className="box-border -mt-[250px]">
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
            <h2 className="text-white font-Poppins text-2xl mb-4">Register</h2>
            <h5 className="text-white font-Poppins mb-4">Register to enjoy with Elearning</h5>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  value={values.name}
                  className={`${
                    errors.name && touched.name ? "border-red-500" : ""
                  } ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full`}
                  placeholder="Name"
                />
                {errors.email && touched.email ? (
                  <div className="text-red-500 w-full mt-1 font-Poppins ">{errors.email}</div>
                ) : null}
              </div>
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
              <div className="mt-4 relative">
                <input
                  type={!show ? "password" : "text"}
                  name="confirmpassword"
                  id="confirmpassword"
                  onChange={handleChange}
                  value={values.confirmpassword}
                  className={`${
                    errors.confirmpassword && touched.confirmpassword ? "border-red-500" : ""
                  } ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full`}
                  placeholder="Confirm password"
                />
                {errors.confirmpassword && touched.confirmpassword ? (
                  <div className="text-red-500 w-full mt-1 font-Poppins ">{errors.confirmpassword}</div>
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
                Register
              </button>
              <Box className="flex justify-center flex-col items-center">
                <span className="text-white font-Poppins block">Or Register With</span>
                <div className="flex justify-center items-center mt-3">
                  <FcGoogle className="cursor-pointer" size={30} />
                  <AiFillGithub className="ms-2 cursor-pointer" size={30} />
                </div>
              </Box>
              <h5 className="mt-4 font-Poppins">
                Already have an account ?{" "}
                <span
                  onClick={() => setRoute("Login")}
                  className="text-yellow font-Poppins cursor-pointer underline">
                  Login
                </span>
              </h5>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
