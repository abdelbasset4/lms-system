"use client";
import { useGetLayoutQuery, useUpdateLayoutMutation } from "@/Redux/Features/Layout/layoutApi";
import { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import { MdOutlineCameraswitch } from "react-icons/md";
import Image from "next/image";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetLayoutQuery("banner", {
    refetchOnMountOrArgChange: true,
  });
  const [updateLayout, { isSuccess, error, isLoading }] = useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setImage(data.layout.banner?.image.url);
      setTitle(data.layout.banner?.title);
      setSubTitle(data.layout.banner?.subtitle);
    }
    if (isSuccess) {
      refetch();
      toast.success(`Hero Section updated successfully`);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "Layout update field");
      } else {
        console.log(error);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const hundelUpdateBanner = async () => {
    console.log(image);

    await updateLayout({
      type: "banner",
      title,
      subtitle: subTitle,
      image,
    });
  };
  const handelUpdateImage = async (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <DashboardHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-[calc(100vh-100px)] bg-white dark:bg-primary relative">
          <div className="container mx-auto w-full flex justify-between items-center h-full">
            <div className="context ps-4 md:ps-0 md:pe-5">
              <textarea
                className="text-primary dark:text-white font-semibold text-[30px] md:text-[42px] font-Poppins resize-none bg-transparent border-none w-full outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                cols={10}
                rows={5}
                placeholder="Title to put in Hero Section"
              />

              <textarea
                className="text-primary dark:text-white font-normal text-base font-Poppins resize-none bg-transparent border-none w-full outline-none mt-10"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                cols={10}
                rows={5}
                placeholder="Sub Title to put in Hero Section"
              />

              <button
                className={`flex items-center  justify-center bg-yellow text-primary w-36 my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300 ${
                  data?.layout.banner?.title !== title ||
                  data?.layout.banner?.subtitle !== subTitle ||
                  data.layout.banner?.image.url !== image
                    ? "opacity-100"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={() => {
                  if (
                    data.layout.banner?.title !== title ||
                    data.layout.banner?.subtitle !== subTitle ||
                    data.layout.banner?.image.url !== image
                  ) {
                    hundelUpdateBanner();
                  }
                }}>
                <span>Save</span>
              </button>
            </div>
            <div className="hero-image relative hidden md:block w-[50%]">
              <Image
                src={image}
                alt="image"
                width={750}
                height={450}
                className=" h-[450px] w-[750px] bg-contain bg-center"
              />
              <input type="file" id="user-image" className="hidden" onChange={handelUpdateImage} />
              <label
                htmlFor="user-image"
                className="bg-primary text-white p-1 rounded-full w-7 h-7 flex justify-center items-center border border-white absolute right-2 bottom-7 cursor-pointer">
                <MdOutlineCameraswitch size={40} />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditHero;
