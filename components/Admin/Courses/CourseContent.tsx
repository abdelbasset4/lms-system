"use client";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { FC, useState } from "react";
import { BsArrowLeftShort, BsArrowRightShort, BsPencil } from "react-icons/bs";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MdAddCircle, MdOutlineDelete } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";
import toast from "react-hot-toast";

type Props = {
  courseContent: any;
  setCourseContent: (courseContent: any) => void;
  active: number;
  setActive: (active: number) => void;
  hundelSubmit: () => void;
};

const CourseContent: FC<Props> = ({
  courseContent,
  setCourseContent,
  active,
  setActive,
  hundelSubmit: hundelCourseSubmit,
}) => {
  const [activeSection, setActiveSection] = useState(1);
  const handleRemoveLink = (index: number, linkIndex: number) => {
    if (linkIndex > 0) {
      const updatedData = [...courseContent];
      updatedData[index].links.splice(linkIndex, 1);
      setCourseContent(updatedData);
    }
  };
  const handleAddLink = (index: number) => {
    const updatedData = [...courseContent];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContent(updatedData);
  };
  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVideoSection = "";
      if (courseContent.length > 0) {
        const lastVideoSection =
          courseContent[courseContent.length - 1].videoSection;
        // use the last videoSection if available, else user user input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContent([...courseContent, newContent]);
    }
  };
  const addNewSection = () => {
    if (
      courseContent[courseContent.length - 1].title === "" ||
      courseContent[courseContent.length - 1].description === "" ||
      courseContent[courseContent.length - 1].videoUrl === "" ||
      courseContent[courseContent.length - 1].links[0].title === "" ||
      courseContent[courseContent.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContent([...courseContent, newContent]);
    }
  };
  const hundelSubmit = (e: any) => {
    e.preventDefault();
  };
  const handelOptions = ()=>{
    if(courseContent[courseContent.length - 1].title === "" ||
    courseContent[courseContent.length - 1].description === "" ||
    courseContent[courseContent.length - 1].videoUrl === "" ||
    courseContent[courseContent.length - 1].links[0].title === "" ||
    courseContent[courseContent.length - 1].links[0].url === ""){
      toast.error("Please fill all the fields first alt all sections!");
    }else{
      setActive(active + 1);
      hundelCourseSubmit()
    }
  }
  return (
    <div className="font-Poppins w-full mt-7 min-h-sidbar">
      <form onSubmit={hundelSubmit}>
        {courseContent.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContent[index - 1].videoSection;
          return (
            <div key={index} >
              <div
                className={`w-full bg-secondary rounded-md p-4 shadow-xl font-Poppins ${
                  showSectionInput ? "mt-10" : "mt-0"
                }`}>
                {showSectionInput && (
                  <div className="flex w-full items-center gap-3">
                    <input
                      type="text"
                      className={`${
                        item.videoSection === "Untitled section"
                          ? "w-[300px]"
                          : "w-min"
                      } ps-8 py-5 text-white font-Poppins rounded-lg outline-none bg-transparent w-full`}
                      placeholder="Enter Section name"
                      value={item.videoSection}
                      onChange={(e) => {
                        const updatedCourseContent = JSON.parse(JSON.stringify(courseContent));
                        // const updatedCourseContent = [...courseContent];
                        updatedCourseContent[index].videoSection =
                          e.target.value;
                        setCourseContent(updatedCourseContent);
                      }}
                    />
                    <BsPencil size={20} className="text-white" />
                  </div>
                )}
                <div className="w-full my-2">
                  <Accordion
                    sx={{
                      color: "white",
                      backgroundColor: "transparent",
                      border: "1px solid #fff",
                    }}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header">
                      <p>
                        {index + 1} - {item.title}
                      </p>
                    </AccordionSummary>
                    <AccordionDetails sx={{ position: "relative" }}>
                      <MdOutlineDelete
                        size={30}
                        className="text-red-700 absolute top-0 right-2 cursor-pointer"
                        onClick={() => {
                          if (index > 0) {
                            const updatedCourseContent = JSON.parse(JSON.stringify(courseContent));
                            // const updatedCourseContent = [...courseContent];
                            updatedCourseContent.splice(index, 1);
                            setCourseContent(updatedCourseContent);
                          }
                        }}
                      />
                      <div className="my-3">
                        <label className="text-lg font-semibold font-Poppins block mb-4">
                          Video Title
                        </label>
                        <input
                          type="text"
                          className="ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full"
                          placeholder="Enter video title"
                          value={item.title}
                          onChange={(e) => {
                            const updatedCourseContent = JSON.parse(JSON.stringify(courseContent));
                            // const updatedCourseContent = [...courseContent];
                            updatedCourseContent[index].title = e.target.value;
                            setCourseContent(updatedCourseContent);
                          }}
                        />
                      </div>
                      <div className="my-3">
                        <label className="text-lg font-semibold font-Poppins block mb-4">
                          Video Url
                        </label>
                        <input
                          type="text"
                          className="ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full"
                          placeholder="Enter video Url"
                          value={item.videoUrl}
                          onChange={(e) => {
                            const updatedCourseContent = JSON.parse(JSON.stringify(courseContent));
                            // const updatedCourseContent = [...courseContent];
                            updatedCourseContent[index].videoUrl =
                              e.target.value;
                            setCourseContent(updatedCourseContent);
                          }}
                        />
                      </div>
                      <div className="my-3">
                        <label className="text-lg font-semibold font-Poppins block mb-4">
                          Video Duration
                        </label>
                        <input
                          type="number"
                          className="ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full"
                          placeholder="Enter video Duration"
                          value={item.videoDuration}
                          onChange={(e) => {
                            const updatedCourseContent = JSON.parse(JSON.stringify(courseContent));
                            // const updatedCourseContent = [...courseContent];
                            updatedCourseContent[index].videoDuration =
                              e.target.value;
                            setCourseContent(updatedCourseContent);
                          }}
                        />
                      </div>
                      <div className="my-3">
                        <label className="text-lg font-semibold font-Poppins block mb-4">
                          Video Description
                        </label>
                        <textarea
                          rows={8}
                          cols={30}
                          className="ps-8 py-5 !h-min text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full"
                          placeholder="Enter video Description"
                          value={item.description}
                          onChange={(e) => {
                            const updatedCourseContent = JSON.parse(JSON.stringify(courseContent));
                            // const updatedCourseContent = [...courseContent];
                            updatedCourseContent[index].description =
                              e.target.value;
                            setCourseContent(updatedCourseContent);
                          }}></textarea>
                      </div>
                      <br />
                      {item?.links.map((link: any, linkIndex: number) => (
                        <div className="mt-3">
                          <div className="flex justify-between">
                            <label className="text-lg font-semibold font-Poppins block mb-4">
                              Link {linkIndex + 1}
                            </label>
                            <MdOutlineDelete
                              size={30}
                              className="text-red-700 cursor-pointer"
                              onClick={() => handleRemoveLink(index, linkIndex)}
                            />
                          </div>
                          <div className="my-3">
                            <input
                              type="text"
                              className="ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full"
                              placeholder="Enter Link title"
                              value={link.title}
                              onChange={(e) => {
                                const updatedCourseContent = JSON.parse(JSON.stringify(courseContent));
                                // const updatedCourseContent = [...courseContent];
                                updatedCourseContent[index].links[
                                  linkIndex
                                ].title = e.target.value;
                                setCourseContent(updatedCourseContent);
                              }}
                            />
                          </div>
                          <div className="my-3">
                            <input
                              type="text"
                              className="ps-8 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full"
                              placeholder="Enter Link Url"
                              value={link.url}
                              onChange={(e) => {
                                const updatedCourseContent = JSON.parse(JSON.stringify(courseContent));
                                // const updatedCourseContent = [...courseContent];
                                updatedCourseContent[index].links[
                                  linkIndex
                                ].url = e.target.value;
                                setCourseContent(updatedCourseContent);
                              }}
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        className="text-white flex gap-2 items-center mt-3"
                        onClick={() => handleAddLink(index)}>
                        <AiOutlineLink size={30} className="text-white" />
                        <span>Add Link</span>
                      </button>
                    </AccordionDetails>
                  </Accordion>
                </div>
                {index === courseContent.length - 1 && (
                  <button
                    className="text-white flex gap-2 items-center mt-4 hover:text-yellow duration-300 cursor-pointer"
                    onClick={() => newContentHandler(item)}>
                    <MdAddCircle
                      size={30}
                      className="text-white hover:text-yellow duration-300"
                    />

                    <span>Add new content</span>
                  </button>
                )}
              </div>
            </div >
          );
        })}
        <button
          className="flex items-center justify-center  text-white  my-5 py-3  font-Poppins  text-lg hover:text-yellow duration-300"
          onClick={addNewSection}>
          <MdAddCircle size={30} className="text-primary dark:text-white" />
          <span>Add new section</span>
        </button>

      </form>
      <div className="flex justify-between">
        <button
          className="flex items-center  justify-center bg-yellow text-primary w-36 my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300"
          onClick={() => setActive(active - 1)}>
          <span><BsArrowLeftShort size={30}/></span>
          <span>Back</span>
        </button>
        <button
          className="flex items-center  justify-center bg-yellow text-primary w-36 my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300"
          onClick={handelOptions}>
          <span>Next</span>
          <span><BsArrowRightShort size={30}/></span>
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
