"use client";
import DashboardHeader from "../DashboardHeader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Box, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import { MdOutlineDelete } from "react-icons/md";
import Loader from "@/components/Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAdminAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/Redux/Features/User/userApi";
import { FC, useState, useEffect } from "react";
import { HiUserAdd } from "react-icons/hi";
import toast from "react-hot-toast";
type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");
  const { isLoading, data, error,refetch } = useGetAdminAllUsersQuery({},{refetchOnMountOrArgChange: true});
  const [updateUserRole, { error: roleError, isSuccess }] =
    useUpdateUserRoleMutation({});
  const [deleteUser,{isSuccess:succesDelete,error:deleteError}]= useDeleteUserMutation({})  
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.7 },
    {
      field: "name",
      headerName: "Name",
      //   width: 450,
      flex: 1,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      //   width: 200,
      editable: false,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.4,
      //   width: 260,
      editable: false,
    },
    {
      field: "courses",
      headerName: "Purchase Courses",
      flex: 0.4,
      //   width: 260,
      editable: false,
    },
    {
      field: "createdAt",
      headerName: "Joined At",
      flex: 0.4,
      //   width: 260,
      editable: false,
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
            setUserId(params.row.id);
          }}>
          <MdOutlineDelete size={25} className={`text-white`} />
        </Button>
      ),
    },
  ];
  let rows: any = [];

  if (isTeam) {
    const newData = data?.users.filter((user: any) => user.role === "admin");
    newData &&
      newData.forEach((element: any) => {
        rows.push({
          id: element._id,
          name: element.name,
          email: element.email,
          role: element.role,
          courses: element.courses.length,
          createdAt: format(element.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((element: any) => {
        rows.push({
          id: element._id,
          name: element.name,
          email: element.email,
          role: element.role,
          courses: element.courses.length,
          createdAt: format(element.createdAt),
        });
      });
  }
  const handelSubmit = async () => {
    await updateUserRole({ role, email });
  };
  const handelDelete = async () => {
    const id = userId;
    await deleteUser(id)   
  }
  useEffect(() => {
    if (roleError) {
      if ("data" in roleError) {
        const errorData = roleError as any;
        toast.error(errorData.data.message || "Update failed");
      } else {
        console.log(error);
      }
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorData = deleteError as any;
        toast.error(errorData.data.message || "Delete failed");
      } else {
        console.log(error);
      }
    }
    if (isSuccess) {
      refetch()
      toast.success("Role updated successfully");
      setActive(!active);
    }
    if (succesDelete) {
      refetch()
      toast.success("Delete user successfully");
      setOpen(!open);
    }
  }, [isSuccess, roleError,succesDelete,deleteError,active,open,refetch,error]);

  
  return (
    <div>
      <DashboardHeader />
      <div className="mt-1 min-h-sidbar relative right-0 py-7 px-7 lg:px-11 w-full  bg-white dark:bg-primary text-primary dark:text-white flex items-center flex-col z-30">
        {isLoading ? (
          <Loader />
        ) : (
          // button for add new user
          <>
            {isTeam && (
              <div className="flex justify-end w-full my-4">
                <button
                  className="flex items-center  justify-center bg-yellow text-primary w-48 py-2 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300"
                  onClick={() => setActive(!active)}>
                  <span className="font-normal">Add new user</span>
                  <span>
                    <HiUserAdd size={30} />
                  </span>
                </button>
              </div>
            )}
            <Box
              sx={{
                height: 600,
                width: "100%",
                "& .MuiDataGrid-root": {
                  backgroundColor: theme === "dark" ? "#282938" : "#282938",
                  color: theme === "dark" ? "#fff" : "#fff",
                  border: "none",
                  outline: "none",
                },
                "& css-pqjvzy-MuiSvgIcon-root-MuiSelect-Icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#fff",
                  borderButtom:
                    theme === "dark"
                      ? "1px solid #fff !important"
                      : "1px solid #ccc !important",
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
          </>
        )}
      </div>
      {active && (
        <Modal
          open={active}
          onClose={() => setActive(!active)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <div className="w-96 h-96 bg-white dark:bg-primary rounded-lg outline-none focus:outline-none flex flex-col p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl font-bold">Add New User</h1>
            <div className="flex flex-col mt-4">
              <label htmlFor="email" className="text-lg font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className=" ps-8 py-5 mt-4 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label htmlFor="role" className="text-lg font-semibold">
                Role
              </label>
              <select
                name="role"
                id="role"
                className="px-4 mt-4 py-5 text-white font-Poppins rounded-lg border border-white border-opacity-10 bg-transparent w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value="admin" className="text-black">
                  Admin
                </option>
                <option value="user" className="text-black">
                  User
                </option>
              </select>
            </div>
            <button
              type="submit"
              onClick={handelSubmit}
              className="bg-yellow text-primary w-full my-5 py-3 rounded-lg font-Poppins font-bold text-lg hover:border hover:border-yellow hover:bg-primary hover:text-yellow duration-300">
              Add member
            </button>
          </div>
        </Modal>
      )}
      {open && (
        <Modal
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="Delete User"
          aria-describedby="Delete User">
          <div className="w-96 max-h-max bg-white dark:bg-primary rounded-lg outline-none focus:outline-none flex flex-col p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-2xl font-bold mb-4">
              Are you sure delete this user ?
            </h1>
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

export default AllUsers;
