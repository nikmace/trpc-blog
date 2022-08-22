import { useEffect } from "react";
import { hasCookie } from "cookies-next";
import type { NextPage } from "next";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/auth/slice";

const Home: NextPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      /**
       * Check if the token is expired & logging out the user
       */
      if (!hasCookie("token")) {
        dispatch(logoutUser());
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);
  return <div>Main content</div>;
};

export default Home;
