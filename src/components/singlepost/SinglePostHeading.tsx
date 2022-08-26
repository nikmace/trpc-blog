/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
  BookmarkIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/auth/selectors";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import DialogPrompt from "../dialog";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  userName: string;
}

export default function SinglePostHeading({
  title,
  createdAt,
  userId,
  id,
  userName,
}: Props) {
  const router = useRouter();
  const authUser = useSelector(selectAuthUser);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { mutate } = trpc.useMutation(["posts.delete-post"], {
    onError() {
      toast.error("Could not delete the post. Try again later!");
    },
    onSuccess({ title }) {
      toast.success(`Post with title "${title}" deleted successfully!`);
    },
  });

  const openDialogHandler = () => {
    setOpenDialog(!openDialog);
  };

  const deletePostHandler = async () => {
    setOpenDialog(false);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // TODO: Add Dialog to ask wether user wants to delete the post
        mutate({ postId: id });
        router.push("/posts");
        resolve(undefined);
      }, 1000);
    });
  };

  async function copyTextToClipboard(url: string) {
    return await navigator.clipboard.writeText(url);
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    const url = router.basePath.toString();
    copyTextToClipboard(url)
      .then(() => {
        // If successful, update the isCopied state value
        toast.success("Copied post URL to clipboard");
      })
      .catch((err) => {
        toast.error("Could not copy post URL :(");
      });
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-between my-16">
      <DialogPrompt
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        deletePost={deletePostHandler}
      />
      <div className="flex-1 min-w-0">
        <h2 className="font-nunito text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate">
          {title}
        </h2>
        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <PencilAltIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Story by {userName}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BookmarkIcon
              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            6 min read
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <>
              <CalendarIcon
                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Created on {createdAt.toLocaleString().slice(0, 10)}
            </>
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:mt-0 lg:ml-4">
        {authUser.id === userId && (
          <>
            <span className="hidden sm:block pr-3">
              <Link href={`/posts/update/${id}`}>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <PencilIcon
                    className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  Edit
                </button>
              </Link>
            </span>
            <span className="hidden sm:block">
              <button
                type="button"
                onClick={openDialogHandler}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <TrashIcon
                  className="-ml-1 mr-2 h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
                Delete
              </button>
            </span>
          </>
        )}

        <span className="hidden sm:block ml-3">
          <button
            type="button"
            onClick={handleCopyClick}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LinkIcon
              className="-ml-1 mr-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
            Share
          </button>
        </span>

        <span className="sm:ml-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <CheckIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Publish
          </button>
        </span>

        {/* Dropdown */}
        <Menu as="div" className="ml-3 relative sm:hidden">
          <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            More
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-gray-500"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {authUser.id === userId && (
                <>
                  <Link href={`/posts/update/${id}`}>
                    <Menu.Item>
                      {({ active }) => (
                        <p
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          Edit
                        </p>
                      )}
                    </Menu.Item>
                  </Link>
                  <Menu.Item>
                    {({ active }) => (
                      <p
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Delete
                      </p>
                    )}
                  </Menu.Item>
                </>
              )}
              <Menu.Item>
                {({ active }) => (
                  <p
                    onClick={handleCopyClick}
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Share
                  </p>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
