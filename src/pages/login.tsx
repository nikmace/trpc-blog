import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("../components/LoginForm"), {
  ssr: false,
});

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
