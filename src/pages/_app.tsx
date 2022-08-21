import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";

import "../styles/globals.css";
import { AppRouter } from "../server/route/app.router";
import { URL } from "../constants";
import { trpc } from "../utils/trpc";
import { UserCtxProvider } from "../context/user.context";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = trpc.useQuery(["users.me"]);

  if (isLoading) {
    return <>Loading user...</>;
  }

  if (error) {
    toast.error(error.message);
  }

  return (
    <UserCtxProvider value={data}>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "",
          duration: 4000,
          success: {
            style: {
              padding: "8px",
            },
          },
        }}
      />
      <Navbar />
      <Component {...pageProps} />
    </UserCtxProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url: URL,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
      links,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
