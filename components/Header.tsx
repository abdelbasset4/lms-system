"use client";
import Link from "next/link";
import { FC, useState } from "react";
import Navbar from "./Navbar";
import Switcher from "./Switcher";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { PiUserCircle } from "react-icons/pi";
type HeaderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
};
const Header: FC<HeaderProps> = ({ activeItem,setOpen,open }) => {
  const [active, setActive] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
  }
  const handelClose = (e:any) => {
    if(e.target.id === "screen")
      setOpenSidebar(false);
  };
  return (
   <>
    <div
      className={`dark:bg-primary shadow-md fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[90px] px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64 transition-all duration-500 ease-in-out`}>
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
        <div className="flex gap-3">
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
            <PiUserCircle
                size={30}
                className="cursor-pointer text-primary dark:text-white"
                onClick={() => setOpen(true)}
            />
        </div>
        </div>
      </div>
    </div>
    {/* Sidebar im mobile */}
    {
     openSidebar && (
        <div className="fixed w-full h-screen top-0 left-0 right-0 z-[9000] bg-[#00000025] dark:bg-unset "
            onClick={handelClose}
            id="screen"
        >
            <div className="w-[70%] h-screen bg-white dark:bg-primary text-primary dark:text-white fixed right-0 top-[90px] z-[999999] ">
            <Navbar activeItem={activeItem} isMobile={true} />
            </div>
        </div>
     )   
    }
   </>
  );
};

export default Header;
