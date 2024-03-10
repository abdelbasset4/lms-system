import { useGetLayoutQuery, useUpdateLayoutMutation } from "@/Redux/Features/Layout/layoutApi";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import DashboardHeader from "../DashboardHeader";
import toast from "react-hot-toast";
import { MdAddCircle, MdOutlineDelete } from "react-icons/md";

const EditCategories = () => {
  const { data, refetch } = useGetLayoutQuery("category", {
    refetchOnMountOrArgChange: true,
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [updateLayout, { isSuccess, error, isLoading }] = useUpdateLayoutMutation();

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (isSuccess) {
      refetch();
      toast.success(`Categories updated successfully`);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "Categories update field");
        console.log(errorData);
      } else {
        console.log(error);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handelCategoires = (id: any, value: string) => {
    setCategories((prev) =>
      prev.map((category) => (category._id === id ? { ...category, title: value } : category))
    );
  };
  const addNewCategory = () => {
    if (categories.length > 0 && categories[categories.length - 1].title === "") {
      toast.error("Please fill the last category");
    } else {
      const newCategory = {
        title: "",
      };
      setCategories([...categories, newCategory]);
    }
  };
  const areCategoryChenged = (original: any[], newArray: any[]) => {
    return JSON.stringify(original) === JSON.stringify(newArray);
  };
  const isCategoryEmpty = (original: any[]) => {
    return original.some((item: any) => item.question === "" || item.answer === "");
  };
  const hundelUpdate = async () => {
    await updateLayout({
      type: "category",
      category: categories,
    });
  };
  return (
    <div>
      <DashboardHeader />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full h-[calc(100vh-100px)] bg-white dark:bg-primary relative p-10">
            <h1 className="text-primary dark:text-white text-center font-semibold text-2xl">
              All Categories
            </h1>
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between mt-5">
                <input
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-white"
                  placeholder="Category title"
                  value={category.title}
                  onChange={(e) => handelCategoires(category._id, e.target.value)}
                />
                <div>
                  <MdOutlineDelete
                    size={30}
                    className="text-red-700 cursor-pointer"
                    onClick={() => {
                      setCategories((prev) => {
                        return prev.filter((i) => i._id !== category._id);
                      });
                    }}
                  />
                </div>
              </div>
            ))}
            <button
              className="flex items-center justify-center text-white my-5 py-3  font-Poppins  text-lg hover:text-yellow duration-300"
              onClick={addNewCategory}>
              <MdAddCircle size={30} className="text-primary dark:text-white mr-2" />
              <span>Add new Category</span>
            </button>
            <button
              className={`flex items-center  justify-center bg-yellow text-primary w-36 my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300 ${
                areCategoryChenged(data?.layout?.faqs, categories) || isCategoryEmpty(categories)
                  ? "opacity-50 cursor-not-allowed"
                  : "opacity-100"
              }`}
              onClick={() => {
                if (!areCategoryChenged(data?.layout?.faqs, categories) || !isCategoryEmpty(categories)) {
                  hundelUpdate();
                }
              }}>
              <span>Save</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditCategories;
