import { useGetAllCoursesQuery } from "@/Redux/Features/Courses/CoursesApi";
import React from "react";
import CourseCard from "./CourseCard";

const courses = [
  {
    _id: "1",
    thumbnail: { url: "/assets/courses/webdev.png" },
    title: "Web development",
    rating: 4.5,
    price: 100,
    discount: 10,
    description:
      "web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.",
    categories: "Programming",
    level: "Beginner",
  },
  {
    _id: "2",
    thumbnail: { url: "/assets/courses/degital-marketing.png" },
    title: "Degital marketing",
    rating: 4.7,
    price: 200,
    discount: 20,
    description:
      "Digital marketing is the component of marketing that utilizes internet and online based digital technologies such as desktop computers, mobile phones and other digital media and platforms to promote products and services.",
    categories: "Marketing",
    level: "Intermediate",
  },
  {
    _id: "3",
    thumbnail: { url: "/assets/courses/Web-Development-Course-Thumbnail.jpg" },
    title: "Web development 2",
    rating: 4.9,
    price: 300,
    discount: 30,
    description:
      "web development is the work involved in developing a website for the Internet or an intranet. Web development can range from developing a simple single static page of plain text to complex web applications, electronic businesses, and social network services.",
    categories: "Programming",
    level: "Advanced",
  },
  {
    _id: "4",
    thumbnail: { url: "/assets/courses/data-science.jpg" },
    title: "Data Science",
    rating: 4.8,
    price: 150,
    discount: 15,
    description:
      "Data science is an interdisciplinary field that uses scientific methods, processes, algorithms and systems to extract knowledge and insights from structured and unstructured data, and apply knowledge and actionable insights from data across a broad range of application domains.",
    categories: "Data Science",
    level: "Beginner",
  },
  {
    _id: "5",
    thumbnail: { url: "/assets/courses/Ai-thumbnail.jpg" },
    title: "Machine Learning",
    rating: 4.6,
    price: 250,
    discount: 25,
    description:
      "Machine learning is the study of computer algorithms that improve automatically through experience and by the use of data. It is seen as a part of artificial intelligence.",
    categories: "Artificial Intelligence",
    level: "Intermediate",
  },
  {
    _id: "6",
    thumbnail: { url: "/assets/courses/english.png" },
    title: "English Learning",
    rating: 4.7,
    price: 350,
    discount: 35,
    description:
      "English is a West Germanic language first spoken in early medieval England, which has become the leading language of international discourse in the 21st century.",
    categories: "Language Learning",
    level: "Advanced",
  },
];

const Courses = () => {
  const { data } = useGetAllCoursesQuery({});

  return (
    <section className="py-28 bg-white dark:bg-gray-900 relative">
      <div className="max-w-screen-2xl mx-auto px-4 text-gray-600 md:px-8 font-Poppins">
        <div className="max-w-xl mx-auto space-y-3 sm:text-center">
          <h3 className="text-indigo-600 font-semibold dark:text-white">Courses</h3>
          <p className="text-gray-800 dark:text-slate-200 text-3xl font-semibold sm:text-4xl">
            Course Recommendations <br /> for You
          </p>
        </div>
        <hr className="mt-6" />
        <div className="mt-12">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((item: any, idx: number) => (
              <CourseCard key={idx} item={item} isProfile={false} />
            ))}
            {/* {data?.course.slice(0, 6).map((item:any, idx:number) => (
              <CourseCard key={idx} item={item} isProfile={false} />
            ))} */}
          </ul>
        </div>
      </div>
      <div
        className="absolute inset-0 max-w-md mx-auto h-72 blur-[118px]"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}></div>
    </section>
  );
};

export default Courses;
