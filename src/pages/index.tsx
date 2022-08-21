import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import { useUserCtx } from "../context/user.context";
import styles from "../styles/Home.module.css";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const user = useUserCtx();

  if (!user) {
    // return <LoginForm />;
  }

  return (
    <div>Main content</div>
  );
};

export default Home;
