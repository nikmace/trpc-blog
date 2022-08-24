import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import SinglePostHeading from "../../components/SinglePostHeading";
import { trpc } from "../../utils/trpc";

function SinglePostPage() {
  const router = useRouter();

  const postId = router.query.postId as string;

  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }]);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="container mx-auto my-8 px-8">
      <SinglePostHeading
        title={data.title}
        createdAt={data.createdAt}
        userId={data.userId}
        id={data.id}
      />
      <div className="whitespace-pre-wrap">{data.body}</div>
      <Link href="/posts">
        <a
          href="#"
          className="mt-8 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Back to Posts
        </a>
      </Link>
    </div>
  );
}

export default SinglePostPage;
