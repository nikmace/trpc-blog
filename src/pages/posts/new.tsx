import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreatePostInput } from "../../schema/post.schema";
import { trpc } from "../../utils/trpc";

function CreatePostPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const { mutate, error } = trpc.useMutation(["posts.create-post"], {
    onSuccess({ id }) {
      router.push(`/posts/${id}`);
    },
  });

  const onSubmit = (values: CreatePostInput) => {
    mutate(values);
  };

  return (
    <div className="new-post h-[100vh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Create Posts</h1>
        <input type="text" placeholder="Post title" {...register("title")} />
        <br />
        <textarea placeholder="Post body" {...register("body")} />

        <button>Create post</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
