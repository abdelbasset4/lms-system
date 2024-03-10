import DashboardHeader from "./DashboardHeader";
import { SiCoursera } from "react-icons/si";
import { PiChartDonutBold, PiStudentFill } from "react-icons/pi";
import {
  LineChart,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  Line,
  YAxis,
} from "recharts";

import { useGetOrderAnalyticsQuery } from "@/Redux/Features/Analytics/AnalyticsApi";
import {
  useGetAdminCoursesQuery,
  useGetTopCoursesQuery,
} from "@/Redux/Features/Courses/CoursesApi";
import Image from "next/image";
import { useGetInvoicesQuery } from "@/Redux/Features/Invoices/InvoicesApi";
import { useGetAdminAllUsersQuery } from "@/Redux/Features/User/userApi";

const DashboardHero = () => {
  const { data: allCourses } = useGetAdminCoursesQuery({});
  const { data: allUsers } = useGetAdminAllUsersQuery({});
  const { data: allOrders } = useGetInvoicesQuery({});
  const { data: topCourses } = useGetTopCoursesQuery({});
  const { data } = useGetOrderAnalyticsQuery({});
  let ordersData: any[] = [];

  data &&
    data?.orders.Last12Month.forEach((order: any) => {
      ordersData.push({ name: order.month, count: order.count });
    });

  // filter users to return only users
  const Studens = allUsers?.users.filter((user: any) => user.role === "user");
  console.log(allOrders?.length);
  
  return (

    <div className="w-full">
      <DashboardHeader />
      <div className=" relative right-0 p-7 w-full h-sidbar bg-white dark:bg-primary text-primary dark:text-white flex  flex-col">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-primary dark:bg-white text-white dark:text-primary py-5 flex flex-col items-center justify-center p-4 rounded-md shadow-md">
            <div>
              <SiCoursera size={60} />
            </div>
            <div className="flex flex-col items-center ">
              <p className="text-4xl font-bold">{allCourses?.result}</p>
              <p className="text-lg font-semibold"> Courses</p>
            </div>
          </div>
          <div className="bg-primary dark:bg-white text-white dark:text-primary py-5 flex flex-col items-center justify-center p-4 rounded-md shadow-md">
            <div>
              <PiStudentFill size={60} />
            </div>
            <div className="flex flex-col items-center ">
              <p className="text-4xl font-bold">{Studens?.length}</p>
              <p className="text-lg font-semibold"> Studens</p>
            </div>
          </div>
          <div className="bg-primary dark:bg-white text-white dark:text-primary py-5 flex flex-col items-center justify-center p-4 rounded-md shadow-md">
            <div>
              <PiChartDonutBold size={60} />
            </div>
            <div className="flex flex-col items-center ">
              <p className="text-4xl font-bold">{allOrders?.result}</p>
              <p className="text-lg font-semibold"> Purshase</p>
            </div>
          </div>
          <div className="bg-primary dark:bg-white text-white dark:text-primary py-5 flex flex-col items-center justify-center p-4 rounded-md shadow-md">
            <div>
              <SiCoursera size={60} />
            </div>
            <div className="flex flex-col items-center ">
              <p className="text-4xl font-bold">10</p>
              <p className="text-lg font-semibold"> Courses</p>
            </div>
          </div>
        </div>
        <div className="h-96 flex gap-10 mt-8">
          <div className="h-full w-[60%] ">
            <h1 className="text-primary dark:text-white  font-semibold text-2xl">
              Orders Analytics
            </h1>
            <p className="text-primary dark:text-white font-semibold mb-5 text-lg">
              Last 12 month data
            </p>

            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={ordersData}
                margin={{
                  top: 5,
                  right: 0,
                  left: 0,
                  bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-[30%]">
            <h1 className="text-primary dark:text-white font-semibold text-2xl mb-12">
              Top 5 Courses
            </h1>
            {topCourses?.courses.map((course: any, index: number) => (
              <div key={index}  className="flex items-center gap-4 w-full p-4 rounded-md bg-primary opacity-80 text-white dark:bg-white dark:text-primary my-3">
                <p className=" text-center font-semibold text-lg">
                  {index + 1}
                </p>
                <Image
                  src={course.thumbnail.url}
                  alt={course.title}
                  width={50}
                  height={50}
                />
                <p className=" text-center font-semibold text-lg">
                  {course.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;
