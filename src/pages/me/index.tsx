import { useRouter } from "next/router";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Image from "next/image";

import Loader from "../../components/Loader";
import {
  selectAuthenticated,
  selectAuthUser,
} from "../../redux/auth/selectors";
import { trpc } from "../../utils/trpc";
import Link from "next/link";
import { PencilIcon, XCircleIcon } from "@heroicons/react/outline";
import DialogPrompt from "../../components/dialog";

const Profile = () => {
  const router = useRouter();
  const { id } = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectAuthenticated);

  const [openPrompt, setOpenPrompt] = useState(false);

  if (!isAuthenticated) {
    toast.error("You need to login to access this page");
    router.push("/login");
  }

  const { data, isLoading } = trpc.useQuery(["users.me", { userId: id }]);

  if (isLoading) {
    return <Loader />;
  }

  const handleAccountDelete = async () => {
    toast.success("Account deleted successfully");
  };

  return (
    <div className="m-8 sm:m-20">
      <DialogPrompt
        openDialog={openPrompt}
        setOpenDialog={setOpenPrompt}
        deletePost={handleAccountDelete}
      />
      <div className="mb-4">
        <h2 className="text-2xl text-gray-600">
          Profile <span className="text-gray-400">/</span> Me
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row justify-between">
        {/** Avatar with Picture here */}
        <div className="w-full sm:w-[30%] p-4">
          <div className="flex justify-center mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-[128px] w-[128px] rounded-full"
              src={
                data?.imageUrl
                  ? data.imageUrl
                  : "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt=""
              height={128}
              width={128}
            />
          </div>
          <div className="">
            <p className="text-xl text-gray-500 text-center pb-2">
              {data?.name}
            </p>
            <p className="text-gray-500 text-sm text-center">
              registered on <br />
              <span className="text-gray-600">
                {data?.createdAt.toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="">
            <p className="text-gray-500 text-sm text-center">
              posts written <br />
              <span className="text-gray-600">{data?.Post.length}</span>
            </p>
          </div>
        </div>
        {/** Profile User Data here */}
        <div className="w-full h-full sm:w-[70%] p-4">
          <h2 className="text-xl text-gray-600 mb-4">General Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="max-w-[300px] w-full">
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                disabled
                defaultValue={data?.name}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-[300px] w-full">
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                disabled
                defaultValue={data?.email}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-[300px] w-full">
              <label
                htmlFor="phone"
                className="block text-md font-medium text-gray-700"
              >
                Phone number
              </label>
              <input
                type="text"
                id="phone"
                disabled
                defaultValue={data?.phoneNumber || ""}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-[300px] w-full">
              <label
                htmlFor="birthday"
                className="block text-md font-medium text-gray-700"
              >
                Birthday
              </label>
              <input
                type="text"
                id="birthday"
                disabled
                defaultValue={data?.birthday || ""}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-[300px] w-full">
              <label
                htmlFor="role"
                className="block text-md font-medium text-gray-700"
              >
                Organization
              </label>
              <input
                type="text"
                id="role"
                disabled
                defaultValue={data?.organization || ""}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-[300px] w-full">
              <label
                htmlFor="role"
                className="block text-md font-medium text-gray-700"
              >
                Role
              </label>
              <input
                type="text"
                id="role"
                disabled
                defaultValue={data?.role || ""}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-[300px] w-full">
              <label
                htmlFor="role"
                className="block text-md font-medium text-gray-700"
              >
                Active
              </label>
              <input
                type="text"
                id="active"
                disabled
                defaultValue={
                  data?.active ? "User is active" : "User is not active"
                }
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-[300px] w-full">
              <label
                htmlFor="role"
                className="block text-md font-medium text-gray-700"
              >
                Verified
              </label>
              <input
                type="text"
                id="active"
                disabled
                defaultValue={
                  data?.verified ? "User is verified" : "User is not verified"
                }
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-[300px] w-full">
              <label
                htmlFor="role"
                className="block text-md font-medium text-gray-700"
              >
                Image URL
              </label>
              <input
                type="text"
                id="active"
                disabled
                defaultValue={data?.imageUrl || ""}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-row justify-between max-w-[300px] w-full">
            <div>
              <Link href="/me/update">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Update
                </button>
              </Link>
            </div>

            <div>
              <button
                onClick={() => setOpenPrompt(!openPrompt)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-red-400 hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <XCircleIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                Deactivate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
