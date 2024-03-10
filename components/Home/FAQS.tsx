import { useGetLayoutQuery } from "@/Redux/Features/Layout/layoutApi";
import FaqsCard from "./FaqsCard";

const FAQS = () => {
  const { data } = useGetLayoutQuery("FAQ", {});
  
  return (
    <section className='py-28 bg-white dark:bg-gray-900 relative'>
    <div className="max-w-screen-2xl mx-auto px-4 gap-8 md:flex md:px-8 font-Poppins">
        <div className='flex-1'>
            <div className="max-w-lg">
                <h3 className='font-semibold text-cyan-400'>
                    Frequently asked questions
                </h3>
                <p className='mt-3 text-primary dark:text-white text-3xl font-semibold sm:text-4xl'>
                    All information you need to know
                </p>
            </div>
        </div>
        <div className='flex-1 mt-12 md:mt-0'>
            <ul className='space-y-4 divide-y divide-gray-700'>
                {data?.layout?.faqs?.map((item:any, idx:number) => (
                        <FaqsCard
                            idx={idx}
                            faqsList={item}
                            key={idx}
                        />
                  
                ))}
            </ul>
        </div>
    </div>
    <div className="absolute inset-10 max-w-md mx-auto h-72 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
</section>
  );
};

export default FAQS;
