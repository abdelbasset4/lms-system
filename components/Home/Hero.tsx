import { useGetLayoutQuery } from "@/Redux/Features/Layout/layoutApi";
import Image from "next/image";
import { BsArrowRightShort } from "react-icons/bs";
import HeroImage from "../../public/assets/Hero.png"
const Hero = () => {
  const { data, refetch } = useGetLayoutQuery("banner", {});
  return (
    <div className="w-full h-[calc(100vh-100px)] bg-primary relative">
      <div className="container mx-auto w-full flex justify-between items-center h-full">
        <div className="context ps-4 md:ps-0 md:pe-40">
          {/* <h1 className="text-white font-semibold text-[30px] md:text-[42px] font-Poppins">Build and Make Dreams Come True <br /> With ELearning</h1> */}
          <h1 className="text-white font-semibold text-[30px] md:text-[42px] font-Poppins">
            {data?.layout?.banner?.title}
          </h1>
          <p className="font-Poppins text-white text-base font-normal leading-7 my-8">
            {data?.layout?.banner?.subtitle}
          </p>
          {/* <p className="font-Poppins text-white text-base font-normal leading-7 my-8">The LMS Elearning is a platform that contains many professional courses to develop your skills and direct you to the labor market</p> */}
          <div className="flex gap-9 items-center">
            <button className="bg-yellow px-6 md:px-10 py-4 rounded-md text-primary font-medium text-base font-Poppins duration-300 hover:text-yellow hover:border hover:border-yellow hover:bg-primary cursor-pointer">
              View Courses
            </button>
            <button className="flex items-center gap-1 text-white">
              <span className="font-normal text-base">View Learning Flow</span>
              <span>
                <BsArrowRightShort className="text-white" size={35} />
              </span>
            </button>
          </div>
        </div>
        <div className="hero-image relative hidden md:block">
          <Image src={HeroImage} alt="Hero Image" width={650} height={400} />
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}></div>
    </div>
  );
};

export default Hero;
