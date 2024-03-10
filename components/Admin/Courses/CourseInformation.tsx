import { useGetLayoutQuery } from "@/Redux/Features/Layout/layoutApi";
import { useFormik } from "formik";
import { FC, useState } from "react";
import Select from "react-select";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsArrowRightShort } from "react-icons/bs";
import * as Yup from "yup";
import Image from "next/image";

type Props = {
  courseInfo: any;
  setCourseInfo: (e: any) => void;
  active: number;
  setActive: (e: any) => void;
  isEdit: boolean;
  setThumbnail: (e: any) => void;
};
const courseInformationSchema = Yup.object().shape({
  title: Yup.string().required("course name is required"),
  description: Yup.string().required("course description is required"),
  price: Yup.number().required("course price is required"),
  tags: Yup.string().required("course tags is required"),
  level: Yup.string().required("course level is required"),
  categories: Yup.string().required("course Category is required"),
  demoUrl: Yup.string().required("course demoUrl is required"),
});
const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
  isEdit,
  setThumbnail,
}) => {
  const [dragging, setDragging] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: courseInfo.title,
      description: courseInfo.description,
      price: courseInfo.price,
      discount: courseInfo.discount,
      thumbnail: courseInfo.thumbnail?.url,
      tags: courseInfo.tags,
      level: courseInfo.level,
      categories: courseInfo.categories,
      demoUrl: courseInfo.demoUrl,
    },
    enableReinitialize: isEdit,
    validationSchema: courseInformationSchema,
    onSubmit: async ({
      title,
      description,
      price,
      discount,
      thumbnail,
      tags,
      level,
      categories,
      demoUrl,
    }) => {
      setCourseInfo({
        title,
        description,
        price,
        discount,
        thumbnail,
        tags,
        level,
        categories,
        demoUrl,
      });

      setActive(active + 1);
    },
  });
  const { handleChange, handleSubmit, values, errors, touched } = formik;
  const { data, refetch } = useGetLayoutQuery("category", {
    refetchOnMountOrArgChange: true,
  });

  const options = data?.layout?.categories?.map((category: any) => {
    return {
      value: category.id,
      label: category.title,
    };
  });
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
          setThumbnail(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handelDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
          setThumbnail(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="font-Poppins w-full mt-7">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-lg font-semibold font-Poppins block mb-2">
            Course name
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={values.title}
            className={`${
              errors.title && touched.title ? "border-red-500" : ""
            } ps-8 py-5 text-primary dark:text-white font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent w-full`}
            placeholder="LMS Course Nextjs 14"
          />
          {errors.title && touched.title ? (
            <div className="text-red-500 w-full mt-1 font-Poppins ">
              {errors.title as React.ReactNode}
            </div>
          ) : null}
        </div>
        <div className="mt-4">
          <label className="text-lg font-semibold font-Poppins block mb-2">
            Course description
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={10}
            onChange={handleChange}
            value={values.description}
            className={`${
              errors.description && touched.description ? "border-red-500" : ""
            } ps-8 py-5 text-primary dark:text-white font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent w-full`}
            placeholder="LMS Course Nextjs 14 Description"></textarea>
          {errors.description && touched.description ? (
            <div className="text-red-500 w-full mt-1 font-Poppins ">
              {errors.description as React.ReactNode}
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex  flex-col lg:flex-row  justify-between gap-10">
          <div className="w-full lg:w-1/2">
            <label className="text-lg font-semibold font-Poppins block mb-2">
              Course price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              value={values.price}
              className={`${
                errors.price && touched.price ? "border-red-500" : ""
              } ps-8 py-5 text-primary dark:text-white font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent w-full`}
              placeholder="199.99$"
            />
            {errors.price && touched.price ? (
              <div className="text-red-500 w-full mt-1 font-Poppins ">
                {errors.price as React.ReactNode}
              </div>
            ) : null}
          </div>
          <div className="w-full lg:w-1/2">
            <label className="text-lg font-semibold font-Poppins block mb-2">
              Course discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              onChange={handleChange}
              value={values.discount}
              className={`${
                errors.discount && touched.discount ? "border-red-500" : ""
              } ps-8 py-5 text-primary dark:text-white font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent w-full`}
              placeholder="100$"
            />
            {errors.discount && touched.discount ? (
              <div className="text-red-500 w-full mt-1 font-Poppins ">
                {errors.discount as React.ReactNode}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          <label className="text-lg font-semibold font-Poppins block mb-2">
            Course tags
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            onChange={handleChange}
            value={values.tags}
            className={`${
              errors.tags && touched.tags ? "border-red-500" : ""
            } ps-8 py-5 text-primary dark:text-white font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent w-full`}
            placeholder="programming,web,frontend,backend,fullstack"
          />
          {errors.tags && touched.tags ? (
            <div className="text-red-500 w-full mt-1 font-Poppins ">
              {errors.tags as React.ReactNode}
            </div>
          ) : null}
        </div>
        <div className="mt-4 flex flex-col lg:flex-row justify-between gap-10">
          <div className="w-full lg:w-1/2">
            <label className="text-lg font-semibold font-Poppins block mb-2">
              Course level
            </label>
            {/* <input
              type="text"
              name="level"
              id="level"
              onChange={handleChange}
              value={values.level}
              className={`${
                errors.level && touched.level ? "border-red-500" : ""
              } ps-8 py-5 text-primary dark:text-white font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent w-full`}
              placeholder="Beginning,Intermediate,Advanced"
            /> */}
            <select
              name="level"
              id="level"
              className="w-full px-8 py-5  font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent"
              onChange={handleChange}>
              <option value="Beginning" className="text-white bg-primary">
                Beginning
              </option>
              <option value="Intermediate" className="text-white bg-primary">
                Intermediate
              </option>
              <option value="Advanced" className="text-white bg-primary">
                Advanced
              </option>
            </select>
            {errors.level && touched.level ? (
              <div className="text-red-500 w-full mt-1 font-Poppins ">
                {errors.level as React.ReactNode}
              </div>
            ) : null}
          </div>
          <div className="w-full lg:w-1/2">
            <label className="text-lg font-semibold font-Poppins block mb-2">
              Categories
            </label>
            <select
              name="categories"
              id="categories"
              className="w-full px-8 py-5  font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent"
              onChange={handleChange}>
              <option value="Beginning" className="text-white bg-primary">
                Select Caegories ...
              </option>
              {options?.map((option: any,index:number) => (
                <option key={index} value={option.value} className="text-white bg-primary">
                  {option.label}
                </option>
              ))}
            </select>
            {errors.demoUrl && touched.demoUrl ? (
              <div className="text-red-500 w-full mt-1 font-Poppins ">
                {errors.demoUrl as React.ReactNode}
              </div>
            ) : null}
          </div>
        </div>
        <div className="mt-4">
          <label className="text-lg font-semibold font-Poppins block mb-2">
            Demo Url
          </label>
          <input
            type="text"
            name="demoUrl"
            id="demoUrl"
            onChange={handleChange}
            value={values.demoUrl}
            className={`${
              errors.demoUrl && touched.demoUrl ? "border-red-500" : ""
            } ps-8 py-5 text-primary dark:text-white font-Poppins rounded-lg border border-primary dark:border-white border-opacity-10 bg-transparent w-full`}
            placeholder="https://www.example.com/example"
          />
          {errors.demoUrl && touched.demoUrl ? (
            <div className="text-red-500 w-full mt-1 font-Poppins ">
              {errors.demoUrl as React.ReactNode}
            </div>
          ) : null}
        </div>
        <div className="mt-4">
          <label className="text-lg font-semibold font-Poppins block mb-2">
            Course thumbnail
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              name="thumbnail"
              id="thumbnail"
              onChange={handleFileChange}
              value={values.thumbnail}
              className="hidden"
              placeholder="https://www.example.com/example"
            />
            <label
              htmlFor="thumbnail"
              className={`w-full min-h-[10vh] border border-primary dark:border-white rounded-lg p-3 flex justify-center items-center ${
                dragging ? "bg-secondary" : "bg-transparent"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handelDrop}>
              {courseInfo.thumbnail ? (
                <Image
                  src={courseInfo.thumbnail}
                  alt="course thumbnail"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center flex-col gap-4 py-5">
                  <AiOutlineCloudUpload size={80} />
                  <p className="text-primary dark:text-white font-Poppins">
                    Drag and drop or click to upload
                  </p>
                </div>
              )}
            </label>
            {errors.thumbnail && touched.thumbnail ? (
              <div className="text-red-500 w-full mt-1 font-Poppins ">
                {errors.thumbnail as React.ReactNode}
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center  justify-center bg-yellow text-primary w-36 my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300">
            <span>Next</span>
            <span>
              <BsArrowRightShort size={30} />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
