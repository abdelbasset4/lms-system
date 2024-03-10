"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { IoCloseCircleOutline } from "react-icons/io5";
import { PiClockLight, PiStarFill } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi";
import CourseTabs from "./CourseTabs/CourseTabs";
import { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutPayment from "../Payment/CheckOutPayment";
type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
};

const CourseDetails = ({ data, clientSecret, stripePromise }: Props) => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: any) => state.auth);
  const discountPercentage = Math.round(
    ((data?.price - data?.discount) / data?.price) * 100
  ).toFixed(0);

  //   check if user purchased this course
  const isPurchased = user?.courses?.find(
    (item: any) => item._id === data?._id
  );

  const handelOrder = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="py-28 bg-white dark:bg-gray-900 relative mt-2 dark:mt-0">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 font-Poppins">
          <div className="flex justify-between items-center flex-col lg:flex-row gap-6">
            <div className="content">
              <span className="px-4 py-2 rounded-full dark:bg-yellow/10 bg-primary text-yellow text-sm font-semibold">
                {data?.categories || "categories"}
              </span>
              <h1 className="text-4xl font-semibold mt-4">{data?.title}</h1>
              <p className="text-primary/75 dark:text-white/60 py-5">
                {data?.description}
              </p>
              <div className="flex gap-x-4 items-center mt-4">
                <div className="flex gap-x-2">
                  <HiOutlineUsers size={20} />
                  <span className="text-primary dark:text-neutral-200">
                    {data?.purshased || 0} students
                  </span>
                </div>
                <div className="flex gap-x-2">
                  <PiClockLight size={20} />
                  <span className="text-primary dark:text-neutral-200">
                    {data?.purshased || 0} hr
                  </span>
                </div>
                <div className="flex gap-x-2">
                  <PiStarFill size={20} />
                  <span className="text-primary dark:text-neutral-200">
                    {data?.rating} stars
                  </span>
                </div>
              </div>
              {isPurchased ? (
                <button className="bg-yellow px-6 md:px-24 py-3.5 my-6 rounded-md text-primary font-medium text-base duration-300 hover:text-yellow hover:border hover:border-yellow hover:bg-primary cursor-pointer">
                  Accsses course
                </button>
              ) : (
                <button
                  onClick={handelOrder}
                  className="bg-yellow px-6 md:px-24 py-3.5 my-6 rounded-md text-primary font-medium text-base duration-300 hover:text-yellow hover:border hover:border-yellow hover:bg-primary cursor-pointer">
                  ${data?.price} Enroll Now
                </button>
              )}
            </div>
            <div className="imageurl w-full  lg:w-[832px] h-[350px] relative">
              <Image
                src={data?.thumbnail?.url}
                alt={data?.description}
                fill
                objectFit="cover"
              />
            </div>
          </div>
          <CourseTabs data={data} />
        </div>
      </div>

      {open && (
        <div className="fixed w-full h-screen top-0 left-0 right-0 z-[9000] bg-[#00000025] dark:bg-unset flex justify-center items-center">
          <div className="w-[500px] h-[550px] bg-white dark:bg-primary text-primary dark:text-white  z-[999999] ">
            <div className="flex justify-end pe-2 pt-2">
              <IoCloseCircleOutline size={35} onClick={() => setOpen(false)} />
            </div>
            {stripePromise && clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{ clientSecret }}>
                  <CheckOutPayment data={data} setOpen={setOpen} />
                </Elements>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CourseDetails;
