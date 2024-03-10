import VideoPlayer from "@/app/utils/VideoPlayer";
import { FC } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
type Props = {
  courseData: any;
  hundelCourseCreation: any;
  active: number;
  setActive: (e: any) => void;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  hundelCourseCreation,
  active,
  setActive,
  isEdit,
}) => {
  const createCourse = () => {
    hundelCourseCreation();
  };
  // course calculated discount percentage
  const discountPercentage = Math.round(
    ((courseData?.price - courseData?.discount) / courseData?.price) * 100
  ).toFixed(0);
  return (
    <>
      <div className="font-Poppins w-full mt-7 min-h-sidbar flex lg:justify-between items-start flex-col gap-5 lg:flex-row">
        <div className="mt-5 relative order-first md:order-last w-full lg:w-[30%]">
          {/* <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title} /> */}
          <VideoPlayer videoUrl={courseData?.demoUrl} />
        </div>
        <div className="w-full lg:w-[70%]">
          <label className="text-primary dark:text-white text-lg">Title:</label>
          <h1 className="text-primary dark:text-white text-[42px] font-semibold mb-3 ">
            {courseData.title}
          </h1>
          <label className="text-primary dark:text-white text-lg">
            Description:
          </label>
          <p className="text-lg mt-3">{courseData.description}</p>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p className="text-4xl font-bold mr-2">{courseData.price}$</p>
              <p className="text-xl line-through text-gray-500 dark:text-gray-300">
                {courseData.discount}$
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg text-primary dark:text-white ml-2">
                {discountPercentage}% off
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-primary dark:text-white text-lg">
              Level:
            </label>
            <p className="text-sm bg-green-700 rounded-2xl mr-2 py-1 px-2 mt-3 max-w-max mb-4">{courseData.level}</p>
            <label className="text-primary dark:text-white text-lg">
              Category:
            </label>
            <p className="text-sm bg-green-700 rounded-2xl mr-2 py-1 px-2 mt-3 max-w-max">{courseData.categories}</p>
            <div className="my-4 ">
              <label className="text-primary dark:text-white text-lg block mb-3">
                Tags:
              </label>
              {courseData.tags.map((tag: any,index:number) => (
                <span key={index} className="text-sm text-white bg-green-800 rounded-2xl mr-2 py-1 px-2">
                  {tag}
                </span>
              ))}
            </div>

            
          </div>
          <div className="my-4">
            <p className="text-primary dark:text-white text-2xl font-semibold mb-3">
              What you learn from this course:
            </p>
            {/* <p className="text-sm text-gray-500 dark:text-gray-300"> */}
            {courseData.benifits.map((benifit: any,index:number) => (
              <div key={index} className="flex gap-3 mb-2 ms-2">
                <span>
                  <GiCheckMark size={20} className={`text-green-700`} />
                </span>
                <span className="mr-2">{benifit.title}</span>
              </div>
            ))}
            {/* </p> */}
          </div>
          <div className="">
            <p className="text-primary dark:text-white text-2xl font-semibold mb-3">
              What are the requirements you have before start learn this course:
            </p>
            {courseData.requirements.map((requirement: any,index:number) => (
              <div key={index} className="flex gap-3 mb-2 ms-2">
                <span>
                  <GiCheckMark size={20} className={`text-green-700`} />
                </span>
                <span className="mr-2">{requirement.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <button
          className="flex items-center  justify-center bg-yellow text-primary w-36 my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300"
          onClick={() => setActive(active - 1)}>
          <span>
            <BsArrowLeftShort size={30} />
          </span>
          <span>Back</span>
        </button>
        <button
          className="flex items-center  justify-center bg-yellow text-primary w-36 my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300"
          onClick={createCourse}>
          <span>{isEdit ? "Update":"Create"}</span>
          <span>
            <BsArrowRightShort size={30} />
          </span>
        </button>
      </div>
    </>
  );
};

export default CoursePreview;
