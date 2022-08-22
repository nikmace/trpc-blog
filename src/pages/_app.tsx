import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import superjson from "superjson";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

import "../styles/globals.css";
import { AppRouter } from "../server/route/app.router";
import { URL } from "../constants";
import Navbar from "../components/Navbar";
import { store } from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  // const { data, error, isLoading } = trpc.useQuery(["users.me"]);

  // if (isLoading) {
  //   return <>Loading user...</>;
  // }

  // if (error) {
  //   toast.error(error.message);
  // }

  return (
    <Provider store={store}>
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
    </Provider>
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
})(
  dynamic(() => Promise.resolve(MyApp), {
    ssr: false,
  })
);
