import Link from "next/link";
import React from "react";

interface PostProps {
  id: string;
  title: string;
  body: string;
}

const SinglePost: React.FC<PostProps> = ({ id, title, body }) => {
  return (
    <div className="p-6 h-min max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-indigo-200 dark:border-indigo-300">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-1 text-gray-500">by Joe</p>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {body.slice(0, 180)}..
      </p>
      <Link href={`/posts/${id}`}>
        <a
          href="#"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[18px] h-[18px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </a>
      </Link>
    </div>
  );
};

export default SinglePost;
