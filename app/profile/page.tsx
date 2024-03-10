"use client";
import { Protected } from "@/hooks/useProtected";
import { useState } from "react";
import { Heading } from "../utils/Heading";
import Header from "@/components/Home/Header";
import Profile from "@/components/Profile/Profile";
import { useSelector } from "react-redux";
const ProfilePage = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <Protected>
      <Heading
        title={`Profile | ${user?.name}`}
        description="The LMS Elearning is a platform that contains many professional courses to develop your skills and direct you to the labor market"
        keywords="Programming,courses,design"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={active}
        route={route}
        setRoute={setRoute}
      />

      <Profile user={user} />
    </Protected>
  );
};

export default ProfilePage;
