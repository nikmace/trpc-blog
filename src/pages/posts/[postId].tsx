import Error from "next/error";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { HeartIcon as HeartOutline } from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";

import Loader from "../../components/Loader";
import SinglePostHeading from "../../components/singlepost/SinglePostHeading";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  selectAuthenticated,
  selectAuthUser,
} from "../../redux/auth/selectors";

function SinglePostPage() {
  const router = useRouter();
  const postId = router.query.postId as string;

  const { id: userId } = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectAuthenticated);

  const [likesCount, setLikesCount] = useState(0);

  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }], {
    onSuccess(data) {
      setLikesCount(data?.likes.length || 0);
    },
  });
  const { mutate: likePost } = trpc.useMutation(["likes.like"], {
    onError(e) {
      toast.error(e.message);
    },
    onSuccess(data) {
      toast.success("Liked post!");
      setLikesCount((prev) => prev + 1);
    },
  });
  const { mutate: dislikePost } = trpc.useMutation(["likes.dislike"], {
    onError(e) {
      toast.error(e.message);
    },
    onSuccess(data) {
      toast.success("Disliked post!");
      setLikesCount((prev) => prev - 1);
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  const handleLike = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to like this post");
    } else {
      likePost({ postId, userId });
    }
  };

  const handleDislike = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to like this post");
    } else {
      dislikePost({ postId, userId });
    }
  };

  return (
    <div className="container mx-auto my-8 px-8">
      <SinglePostHeading
        title={data.title}
        createdAt={data.createdAt}
        userId={data.userId}
        id={data.id}
        userName={data.user.name}
      />
      <div className="whitespace-pre-wrap">{data.body}</div>
      <div className="flex justify-between">
        <div>
          <Link href="/posts">
            <p className="mt-8 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Back to Posts
            </p>
          </Link>
        </div>

        <div className="mt-2 flex items-center text-md text-gray-500">
          {data.likes.some((l) => l.userId === userId) ? (
            <HeartSolid
              className="flex-shrink-0 mr-1.5 h-7 w-7 text-gray-400 fill-red-500"
              aria-hidden="true"
              onClick={handleDislike}
            />
          ) : (
            <HeartOutline
              className="flex-shrink-0 mr-1.5 h-7 w-7 text-gray-400"
              aria-hidden="true"
              onClick={handleLike}
            />
          )}
          {likesCount}
        </div>
      </div>
    </div>
  );
}

export default SinglePostPage;
