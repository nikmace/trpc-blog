import { useEffect } from "react";
import { hasCookie } from "cookies-next";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/slice";
import Image from "next/image";

import IcelandRiver from "../public/images/iceland-river.jpeg";
import { Popover } from "@headlessui/react";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      /**
       * Check if the token is expired & logging out the user
       */
      if (!hasCookie("token")) {
        dispatch(logoutUser());
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);
  return (
    <>
      <div className="">
        <div className="relative bg-white overflow-hidden home-height mt-24">
          <div className="max-w-7xl mx-auto ">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg
                className="hidden lg:block absolute right-0 inset-y-0 lg:h-[700px] w-48 text-white transform translate-x-1/2"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <Popover>
                <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>
              </Popover>

              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl sm:tracking-tight md:text-6xl md:tracking-tight">
                    <span className="block xl:inline">
                      We Help Writers Succeed in the{" "}
                    </span>{" "}
                    <span className="block text-indigo-600 xl:inline">
                      Creator Economy
                    </span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                    qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                    occaecat fugiat aliqua.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                      >
                        Get started
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                      >
                        Live demo
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <Image
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src={IcelandRiver}
              alt=""
              width={1080}
              height={700}
            />
          </div>
        </div>
        <div className="h-[100vh]">s</div>
      </div>
    </>
  );
};

export default Home;
