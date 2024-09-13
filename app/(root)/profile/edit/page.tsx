import Profile from "@/components/forms/Profile";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const mongoUserId = await getUserById({ userId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>

      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUserId)} />
      </div>
    </>
  );
};

export default Page;
