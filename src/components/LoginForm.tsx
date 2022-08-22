import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAuthUserFromCookies, setAuth } from "../redux/auth/slice";

import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";
import Loader from "./Loader";

function VerifyToken({ hash }: { hash: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, isLoading, error } = trpc.useQuery([
    "users.verify-otp",
    { hash },
  ]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) toast.error(error.message);

  if (data?.user) {
    const { id, isAuthenticated, email } = getAuthUserFromCookies();
    dispatch(setAuth({ id, email, isAuthenticated }));
  }

  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>Redirecting...</p>;
}

const LoginForm = () => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const { handleSubmit, register } = useForm<CreateUserInput>();
  const { mutate, error } = trpc.useMutation(["users.request-otp"], {
    onError: (e) => {},
    onSuccess: () => {
      setSuccess(true);
      toast.success("Check your email to authenticate!");
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    mutate({ ...values, redirect: router.asPath });
  };

  const hash = router.asPath.split("#token=")[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <div className="h-[80vh]">
      <div className="min-h-full flex content-center items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            {/** PLACE FOR IMAGE */}
            <h2 className="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">
              Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register("email")}
                />
              </div>
            </div>

            <div className="flex items-center">
              <p className="text-red-500 text-sm font-light">
                {error && error.message}
              </p>
            </div>

            <div className="flex items-center justify-center">
              <p className="text-indigo-600 text-sm font-light">
                {success && "Check your email to login!"}
              </p>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
