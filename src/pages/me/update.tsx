import { PencilIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";

import Loader from "../../components/Loader";
import {
  selectAuthenticated,
  selectAuthUser,
} from "../../redux/auth/selectors";
import { trpc } from "../../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserInput, updateUserSchema } from "../../schema/user.schema";

const UpdateProfile = () => {
  const router = useRouter();
  const { id } = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectAuthenticated);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({ resolver: zodResolver(updateUserSchema) });

  if (!isAuthenticated) {
    toast.error("You need to login to access this page");
    router.push("/login");
  }

  const { data, isLoading } = trpc.useQuery(["users.me", { userId: id }]);
  const { mutate } = trpc.useMutation(["users.update-user"], {
    onError(e) {
      toast.error(e.message);
    },
    onSuccess() {
      toast.success("User updated successfully");
      router.push("/me").then(() => window.location.reload());
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  const onSubmit: SubmitHandler<UpdateUserInput> = async (values) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        mutate({ ...values, id });
        resolve(undefined);
      }, 1000);
    });
  };

  return (
    <div className="m-8 sm:m-20">
      <div className="mb-4">
        <h2 className="text-2xl text-gray-600">
          Profile <span className="text-gray-400">/</span> Update
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
          </div>
        </div>
        {/** Profile User Data here */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full h-full sm:w-[70%] p-4"
        >
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
                {...register("name")}
                defaultValue={data?.name}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
              {errors.name && (
                <p className="text-red-500 text-sm font-light pt-2">
                  {errors.name.message}
                </p>
              )}
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
                {...register("email")}
                defaultValue={data?.email}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm font-light pt-2">
                  {errors.email.message}
                </p>
              )}
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
                {...register("phoneNumber")}
                defaultValue={data?.phoneNumber || ""}
                className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm font-light pt-2">
                  {errors.phoneNumber.message}
                </p>
              )}
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
                {...register("birthday")}
                defaultValue={data?.birthday || ""}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
              {errors.birthday && (
                <p className="text-red-500 text-sm font-light pt-2">
                  {errors.birthday.message}
                </p>
              )}
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
                {...register("organization")}
                defaultValue={data?.organization || ""}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
              {errors.organization && (
                <p className="text-red-500 text-sm font-light pt-2">
                  {errors.organization.message}
                </p>
              )}
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
                {...register("imageUrl")}
                defaultValue={data?.imageUrl || ""}
                className="text-gray-500 p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm font-light pt-2">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-row justify-between max-w-[300px] w-full">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mr-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  ${
                isSubmitting
                  ? "bg-slate-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              Update
            </button>
            <Link href="/me">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Go back
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
