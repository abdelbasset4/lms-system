"use client";
import { useGetCourseDetailsQuery } from "@/Redux/Features/Courses/CoursesApi";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublisherKeysQuery,
} from "@/Redux/Features/Order/orderApi";
import { Heading } from "@/app/utils/Heading";
import CourseDetails from "@/components/Courses/CourseDetails";
import Footer from "@/components/Home/Footer";
import Header from "@/components/Home/Header";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const CourseDetailsPage = ({ params }: any) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data } = useGetCourseDetailsQuery(params.id);
  const { data: config } = useGetStripePublisherKeysQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation({});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState<any>("");

  console.log(config);
  

  useEffect(() => {
    if (config) {
      setStripePromise(loadStripe(config?.stripeApiKey));
    }
    if (data) {
      const amount = Math.round(data?.course.price - data?.course.discount);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  console.log(clientSecret);
  console.log(stripePromise);
  
  

  return (
    <div>
      <Heading
        title={`Course | ${data?.course.title}`}
        description="The LMS Elearning is a platform that contains many professional courses to develop your skills and direct you to the labor market"
        keywords={data?.course.tags}
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={1}
        route={route}
        setRoute={setRoute}
      />
      {stripePromise && (
        <CourseDetails
          data={data?.course}
          stripePromise={stripePromise}
          clientSecret={clientSecret}
        />
      )}
      <Footer />
    </div>
  );
};

export default CourseDetailsPage;
