/* This example requires Tailwind CSS v2.0+ */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Link from "next/link";

import Logo from "../public/images/talkey3.png";
import { selectAuthenticated, selectAuthUser } from "../redux/auth/selectors";
import ProfileAvatar from "./profile/ProfileAvatar";
import { trpc } from "../utils/trpc";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { id } = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectAuthenticated);

  const { data } = trpc.useQuery(["users.me", { userId: id }]);

  let navigation = useMemo(
    () => [
      { name: "Team", href: "#", current: false },
      { name: "Posts", href: "/posts", current: false },
    ],
    []
  );

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }: any) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <Link href="/">
                  <div className="flex-shrink-0 flex items-center">
                    <Image
                      className="block lg:hidden h-8 w-auto"
                      src={Logo}
                      alt="Workflow"
                      height={32}
                      width={40}
                    />
                  </div>
                </Link>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <p
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "font-medium text-gray-500 hover:text-gray-900",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </p>
                      </Link>
                    ))}
                    {isAuthenticated && (
                      <Link href={"/dashboard"} key={"dashboard"}>
                        <p
                          className={classNames(
                            false
                              ? "bg-gray-900 text-white"
                              : "font-medium text-gray-500 hover:text-gray-900",
                            "px-3 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={false ? "page" : undefined}
                        >
                          Dashboard
                        </p>
                      </Link>
                    )}
                    {!isAuthenticated && (
                      <>
                        <Link href={"/login"} key={"login"}>
                          <p
                            className={classNames(
                              false
                                ? "bg-gray-900 text-white"
                                : "font-medium text-gray-500 hover:text-gray-900",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={false ? "page" : undefined}
                          >
                            Login
                          </p>
                        </Link>
                        <Link href={"/register"} key={"register"}>
                          <p
                            className={classNames(
                              false
                                ? "bg-gray-900 text-white"
                                : "font-medium text-gray-500 hover:text-gray-900",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={false ? "page" : undefined}
                          >
                            Register
                          </p>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <ProfileAvatar
                imageUrl={data?.imageUrl || ""}
                classNames={classNames}
              />
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "font-medium text-gray-500 hover:text-gray-900",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
