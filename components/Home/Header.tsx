"use client";
import { useEffect } from "react";
import Link from "next/link";
import { FC, useState } from "react";
import Navbar from "./Navbar";
import Switcher from "../Switcher";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import CustomModal from "@/app/utils/CustomModal";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import VervificationOTP from "../Auth/VervificationOTP";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatar.svg";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/Redux/Features/Auth/authApi";
import toast from "react-hot-toast";
type HeaderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};
const Header: FC<HeaderProps> = ({
  activeItem,
  setOpen,
  open,
  route,
  setRoute,
}) => {
  const [active, setActive] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);

  const { user } = useSelector((state: any) => state.auth);

  const handelClose = (e: any) => {
    if (e.target.id === "screen") setOpenSidebar(false);
  };
  const { data } = useSession();

  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, { skip: logout ? false : true });
  useEffect(() => {
    if (!user) {
      if (data) {
        socialAuth({
          email: data.user?.email,
          name: data.user?.name,
          avatar: data.user?.image,
        });
      }
    }
    if (data === null) {
      if (isSuccess) {
        toast.success("Login Successfully");
      }
    }
    // if(data ===null){
    //   setLogout(true)
    // }
    if (error) {
      console.log(error);
    }
  }, [data, user, isSuccess, error]);

  return (
    <>
      {/* Header */}
      <div
        className={`dark:bg-primary shadow-lg z-50 flex items-center justify-between h-[90px] px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 transition-all duration-500 ease-in-out`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo">
            <Link
              href={"/"}
              className="text-xl font-bold font-Poppins text-primary dark:text-white">
              LMS Elearning
            </Link>
          </div>
          <div>
            <Navbar activeItem={activeItem} isMobile={false} />
          </div>
          <div className="flex gap-3 items-center">
            <Switcher />
            {/* Menu Hamburger */}
            <div className="md:hidden">
              <HiOutlineMenuAlt2
                size={30}
                className="cursor-pointer text-primary dark:text-white"
                onClick={() => setOpenSidebar(true)}
              />
            </div>
            <div>
              {user ? (
                <Link href="/profile">
                  <Image
                    src={user.avatar ? user.avatar.url : avatar}
                    alt="User Avatar"
                    width={48}
                    height={48}
                    className="cursor-pointer rounded-full h-[48px] w-[48px]"
                  />
                </Link>
              ) : (
                <button
                  className="bg-primary dark:border dark:border-white hover:bg-white hover:text-primary hover:border hover:border-primary duration-300 cursor-pointer text-white px-8 py-3 rounded-md font-normal text-base font-Poppins"
                  onClick={() => setOpen(true)}>
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar im mobile */}
      {openSidebar && (
        <div
          className="fixed w-full h-screen top-0 left-0 right-0 z-[9000] bg-[#00000025] dark:bg-unset "
          onClick={handelClose}
          id="screen">
          <div className="w-[70%] h-screen bg-white dark:bg-primary text-primary dark:text-white fixed right-0 top-[90px] z-[999999] ">
            <Navbar activeItem={activeItem} isMobile={true} />
          </div>
        </div>
      )}
      {route === "Login" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          component={Login}
        />
      )}
      {route === "Register" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          component={Register}
        />
      )}
      {route === "VerificationOTP" && (
        <CustomModal
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          component={VervificationOTP}
        />
      )}
    </>
  );
};

export default Header;
