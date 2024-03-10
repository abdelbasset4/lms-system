import { FC, useState, useRef, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { useActivateMutation } from "@/Redux/Features/Auth/authApi";
import toast from "react-hot-toast";
type Props = {
  setRoute: (route: string) => void;
};
type VerifyOTP = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
};

const VervificationOTP: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);

  const [invalidError, setInvalidError] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState<VerifyOTP>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
    "4": "",
    "5": "",
  });
  const [activate, { isError, isSuccess, error, data }] = useActivateMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Account activated successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "Register failed");
        setInvalidError(true);
      } else {
        console.log(error);
      }
    }
  }, [isSuccess, error, data, setRoute]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const verificationHandler = async (e: any) => {
    const verificationNumber = Object.values(verifyOTP).join("");
    if (verificationNumber.length !== 6) {
      setInvalidError(true);
      return;
    }
    await activate({ activate_token: token, activate_code: verificationNumber });
  };

  const handelInputChanger = (index: number, value: string) => {
    setInvalidError(false);
    setVerifyOTP({ ...verifyOTP, [index]: value });
    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };
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
            <h2 className="text-white font-Poppins text-2xl mb-4">Verify OTP</h2>
            <h5 className="text-white font-Poppins mb-4">Verify number sent to your email</h5>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <div className="flex justify-around items-center mx-auto">
                {Object.keys(verifyOTP).map((key, index) => (
                  <input
                    className="w-12 h-14 text-center border border-primary rounded-lg font-Poppins font-bold text-lg"
                    key={key}
                    value={verifyOTP[key as keyof VerifyOTP]}
                    ref={inputRefs[index]}
                    onChange={(e) => handelInputChanger(index, e.target.value)}
                    onKeyUp={(e) => verificationHandler(e)}
                    maxLength={1}
                    type="number"
                  />
                ))}
              </div>
              <button
                type="submit"
                className="bg-yellow text-primary w-full my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300">
                Verify OTP
              </button>

              <h5 className="mt-4 font-Poppins">
                Or go back to{" "}
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

export default VervificationOTP;
