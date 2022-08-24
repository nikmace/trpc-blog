import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreatePostInput, createPostSchema } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";
import { useSelector } from "react-redux";
import { selectAuthenticated } from "../../redux/auth/selectors";
import DisclosureNewPost from "../../components/disclosure/DisclosureNewPost";

function CreatePostPage() {
  const router = useRouter();
  const isAuthenticated = useSelector(selectAuthenticated);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreatePostInput>({ resolver: zodResolver(createPostSchema) });

  const { mutate } = trpc.useMutation(["posts.create-post"], {
    onSuccess({ id }) {
      toast.success(`Post was created successfully!`);
      router.push(`/posts/${id}`);
    },
    onError(e) {},
  });

  const onSubmit: SubmitHandler<CreatePostInput> = async (values) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        mutate(values);
        console.log(values);
        reset();
        resolve(undefined);
      }, 2000);
    });
  };

  if (!isAuthenticated) {
    router.push("/login");
    toast.error("Cannot create a new post. Authenticate first!");
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
                        autoComplete=""
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
                        defaultValue={""}
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

                <DisclosureNewPost />
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
                    Create a post
                  </button>
                  <Link href="/posts">
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

export default CreatePostPage;
