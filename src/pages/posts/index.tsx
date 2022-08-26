import Link from "next/link";
import React from "react";
import Loader from "../../components/Loader";
import SinglePost from "../../components/singlepost";
import { trpc } from "../../utils/trpc";

const PostListingPage: React.FC = () => {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="my-16 mx-12">
      <div className="flex flex-row justify-between items-center w-[100%] pb-8">
        <h3 className="text-3xl font-nunito font-light dark:text-gray-500">
          Fresh posts
        </h3>
        <Link href="/posts/new">
          <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-600 focus:ring-indigo-500">
            Create new Post
          </button>
        </Link>
      </div>
      <div className="py-6 border-gray-300 border-t-[0.5px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {data?.map((post) => {
          return <SinglePost key={post.id} {...post} />;
        })}
      </div>
    </div>
  );
};

export default PostListingPage;
