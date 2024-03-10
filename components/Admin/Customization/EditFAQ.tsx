import { useState, useEffect } from "react";
import DashboardHeader from "../DashboardHeader";
import { useGetLayoutQuery, useUpdateLayoutMutation } from "@/Redux/Features/Layout/layoutApi";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { MdAddCircle, MdOutlineDelete } from "react-icons/md";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import toast from "react-hot-toast";
import Loader from "@/components/Loader/Loader";

type Props = {};

const EditFAQ = (props: Props) => {
  const { data, refetch } = useGetLayoutQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [question, setQuestion] = useState<any[]>([]);
  const [updateLayout, { isSuccess, error, isLoading }] = useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setQuestion(data.layout.faqs);
    }
    if (isSuccess) {
      refetch();
      toast.success(`FAQ updated successfully`);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "FAQ update field");
        console.log(errorData);
      } else {
        console.log(error);
      }
    }
  }, [data, isSuccess, error, refetch]);

  //   handel question to change input question
  const handelQuestion = (id: any, value: string) => {
    setQuestion((prev) =>
      prev.map((question) => (question._id === id ? { ...question, question: value } : question))
    );
  };
  //   handel question to change input answer
  const handelAnswer = (id: any, value: string) => {
    setQuestion((prev) =>
      prev.map((question) => (question._id === id ? { ...question, answer: value } : question))
    );
  };

  const addNewFAQ = () => {
    const newFAQ = {
      question: "",
      answer: "",
    };
    setQuestion([...question, newFAQ]);
  };

  //   function to check if question array chenged or not
  const areQuestionsChenged = (original: any[], newArray: any[]) => {
    return JSON.stringify(original) === JSON.stringify(newArray);
  };
  const isFAQEmpty = (original: any[]) => {
    return original.some((item: any) => item.question === "" || item.answer === "");
  };

  const hundelUpdate = async () => {
    await updateLayout({
      type: "FAQ",
      faq: question,
    });
  };
  return (
    <div>
      <DashboardHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full h-[calc(100vh-100px)] bg-white dark:bg-primary relative p-10">
          {
            // @ts-ignore
            question.map((item, index: number) => (
              <Accordion
                key={index}
                sx={{
                  color: "white",
                  backgroundColor: "transparent",
                  border: "1px solid #fff",
                  marginBottom: "20px",
                }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header">
                  <input
                    onChange={(e: any) => handelQuestion(item._id, e.target.value)}
                    className="text-xl font-semibold text-primary dark:text-white bg-transparent outline-none w-full"
                    value={item.question}
                  />
                </AccordionSummary>
                <AccordionDetails sx={{ position: "relative", marginTop: "10px" }}>
                  <MdOutlineDelete
                    size={30}
                    className="text-red-700 absolute top-0 right-2 cursor-pointer"
                    onClick={() => {
                      setQuestion((prev) => {
                        return prev.filter((i) => i._id !== item._id);
                      });
                    }}
                  />

                  <input
                    onChange={(e: any) => handelAnswer(item._id, e.target.value)}
                    className="ms-3 text-lg text-primary dark:text-white bg-transparent outline-none w-full"
                    type="text"
                    name=""
                    id=""
                    value={item.answer}
                  />
                </AccordionDetails>
              </Accordion>
            ))
          }
          <button
            className="flex items-center justify-center text-white my-5 py-3  font-Poppins  text-lg hover:text-yellow duration-300"
            onClick={addNewFAQ}>
            <MdAddCircle size={30} className="text-primary dark:text-white mr-2" />
            <span>Add new FAQ</span>
          </button>
          <button
            className={`flex items-center  justify-center bg-yellow text-primary w-36 my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300 ${
              areQuestionsChenged(data?.layout?.faqs, question) || isFAQEmpty(question)
                ? "opacity-50 cursor-not-allowed"
                : "opacity-100"
            }`}
            onClick={() => {
              if (!areQuestionsChenged(data?.layout?.faqs, question) || !isFAQEmpty(question)) {
                hundelUpdate();
              }
            }}>
            <span>Save</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EditFAQ;
