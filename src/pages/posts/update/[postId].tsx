import Error from "next/error";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { createPostSchema, UpdatePostInput } from "../../../schema/post.schema";
import { trpc } from "../../../utils/trpc";

export default function UpdatePage() {
  const router = useRouter();

  const postId = router.query.postId as string;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdatePostInput>({ resolver: zodResolver(createPostSchema) });

  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }]);
  const { mutate } = trpc.useMutation(["posts.update-post"], {
    onError(e) {
      toast.error(e.message);
    },
    onSuccess(data) {
      console.log(data);
      // redirect to /posts/postId, refresh the page
    },
  });

  const onSubmit: SubmitHandler<UpdatePostInput> = async (values) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log(values);
        mutate({ postId, ...values });
        resolve(undefined);
      }, 2000);
    });
  };

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }
  return (
    <>
      <div className="h-[80vh]">
        <div className="min-h-full  flex content-center items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="mt-5 md:mt-0 max-w-[600px] w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-md font-medium text-gray-700"
                      >
                        Title of your post
                      </label>
                      <input
                        type="text"
                        id="title"
                        defaultValue={data.title}
                        {...register("title")}
                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        disabled={isSubmitting}
                      />
                      {errors.title && (
                        <p className="text-red-500 text-sm font-light pt-2">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="body"
                      className="block text-md font-medium text-gray-700"
                    >
                      Write some text here
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="body"
                        rows={12}
                        className="p-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder=""
                        defaultValue={data.body}
                        {...register("body")}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.body && (
                      <p className="text-red-500 text-sm font-light pt-2">
                        {errors.body.message}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-gray-500">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>
                </div>

                {/** More inputs here */}
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
                  <Link href={`/posts/${postId}`}>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md border-indigo-600 text-indigo-600 hover:text-white hover:bg-indigo-600 focus:ring-indigo-500"
                    >
                      Go back
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
