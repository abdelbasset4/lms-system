"use client";
import Link from "next/link";
import DashboardHeader from "../DashboardHeader";
import { useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Box, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useDeleteCourseMutation, useGetAdminCoursesQuery } from "@/Redux/Features/Courses/CoursesApi";
import Loader from "@/components/Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";

const AllCourses = () => {
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");

  const { theme, setTheme } = useTheme();
  const { isLoading, data, refetch } = useGetAdminCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.7 },
    {
      field: "coursetitle",
      headerName: "Course title",
      //   width: 450,
      flex: 1,
      editable: false,
    },
    {
      field: "rating",
      headerName: "Rating",
      flex: 0.4,
      //   width: 200,
      editable: false,
    },
    {
      field: "purchased",
      headerName: "Purshased",
      flex: 0.4,
      //   width: 260,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "created At",
      flex: 0.4,
      //   width: 260,
      editable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      //   width: 160,
      renderCell: (params) => (
        <Link href={`/dashboard/edit-course/${params.row.id}`}>
          <MdOutlineEdit size={25} className={`text-white`} />
        </Link>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      //   width: 160,
      renderCell: (params) => (
        <Button
          onClick={(e) => {
            setOpen(!open);
            setCourseId(params.row.id);
          }}>
          <MdOutlineDelete size={25} className={`text-white`} />
        </Button>
      ),
    },
  ];
  let rows: any = [];

  data &&
    data.courses.forEach((element: any) => {
      rows.push({
        id: element._id,
        coursetitle: element.title,
        rating: element.rating,
        purchased: element.purshased,
        createdAt: format(element.createdAt),
      });
    });

  const handelDelete = async () => {
    await deleteCourse(courseId);
  };
  useEffect(() => {
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message || "deleted failed");
      } else {
        console.log(error);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("Course deleted successfully");
      setOpen(!open);
    }
  }, [isSuccess, error, refetch, open]);
  return (
    <div>
      <DashboardHeader />
      <div className="mt-1 min-h-sidbar relative right-0 py-7 px-7 lg:px-11 w-full  bg-white dark:bg-primary text-primary dark:text-white flex items-center flex-col z-30">
        {isLoading ? (
          <Loader />
        ) : (
          <Box
            sx={{
              height: 400,
              width: "100%",
              "& .MuiDataGrid-root": {
                backgroundColor: theme === "dark" ? "#1C1E53" : "#fff",
                color: theme === "dark" ? "#fff" : "#1C1E53",
                border: "none",
                outline: "none",
              },
              "& css-pqjvzy-MuiSvgIcon-root-MuiSelect-Icon": {
                color: theme === "dark" ? "#fff" : "#1C1E53",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#1C1E53",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#1C1E53",
                borderButtom: theme === "dark" ? "1px solid #fff !important" : "1px solid #ccc !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#1C1E53",
              },
              "& .MuiDataGrid-cell": {
                borderButtom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#1C1E53",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#282938" : "#282938",
                borderButtom: "none",
                color: theme === "dark" ? "#fff" : "#fff",
              },
              "& .MuiDataGrid-virualScroller": {
                backgroundColor: theme === "dark" ? "#2405F2" : "#2405F2",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#282938" : "#282938",
                color: theme === "dark" ? "#fff" : "#fff",
                borderTop: "none",
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" ? "#fff" : "#fff",
              },
              // class for toolbar container
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: "#fff !important",
              },
            }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        )}
      </div>
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="Delete User"
          aria-describedby="Delete User">
          <div className="w-96 max-h-max bg-white dark:bg-primary rounded-lg outline-none focus:outline-none flex flex-col p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-2xl font-bold mb-4 text-center">Are you sure delete this course ?</h1>
            <div className="flex space-x-3 justify-end">
              <button
                className="bg-transparent text-white border border-white w-28 mt-5 mb-3 py-2 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300"
                onClick={() => setOpen(!open)}>
                Cancel
              </button>
              <button
                className="bg-red-500 text-white w-28 mt-5 mb-3 py-2 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-red-500 hover:bg-transparent hover:text-red-500 duration-300"
                onClick={handelDelete}>
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AllCourses;
