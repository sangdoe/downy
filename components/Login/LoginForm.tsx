import { NextPage } from "next";
import { FormEvent, useState } from "react";
import Input from "../common/inputs/Input";
import Password from "../common/inputs/Password";
import Button from "../common/buttons/MainButton";
import SecondaryButtonLink from "../common/buttons/SecondaryButtonLink";
import Link from "next/link";
import useIsMobile from "../hooks/useIsMobile";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";

const LoginForm: NextPage = () => {
  const isMobile = useIsMobile();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");

  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const login = async () => {
    const body = {
      email: user.email,
      password: user.password,
    };

    try {
      mutateUser(
        await fetchJson("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json; charset=utf-8" },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg("An unexpected error happened: " + error);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login();
  };
  return (
    <form className="space-y-4 px-3" onSubmit={handleSubmit}>
      <div className="space-y-8">
        <Input
          type="text"
          label="Username or Email"
          value={user.email}
          onChange={(e) => setUser((o) => ({ ...o, email: e.target.value }))}
        />
        <Password
          type="password"
          label="Password"
          onChange={(e) => setUser((o) => ({ ...o, password: e.target.value }))}
        />
      </div>
      <div className="text-lg ml-1 font-semibold">
        <Link href="/reset-password">Forgot password?</Link>
      </div>
      <div className="flex space-x-6">
        <Button text="Login" fullWidth={true} type="submit" />
        {!isMobile && (
          <SecondaryButtonLink text="Signup" to="/signup" fullWidth={true} />
        )}
      </div>
    </form>
  );
};

export default LoginForm;
