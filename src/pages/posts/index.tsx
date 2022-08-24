import Link from "next/link";
import { trpc } from "../../utils/trpc";

function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-16 mx-12">
      <div className="flex flex-row justify-between items-center w-[100%] pb-8">
        <h3 className="text-3xl font-nunito font-light">Fresh posts</h3>
        <Link href="/posts/new">
          <button className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-600 focus:ring-indigo-500">
            Create new Post
          </button>
        </Link>
      </div>
      <div className="py-6 border-gray-300 border-t-[0.5px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {data?.map((post) => {
          return (
            <div
              key={post.id}
              className="p-6 h-min max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {post.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {post.body.slice(0, 180)}..
              </p>
              <Link href={`/posts/${post.id}`}>
                <a
                  href="#"
                  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PostListingPage;
