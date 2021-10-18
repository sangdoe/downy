import { NextPage } from "next";
import { FormEvent, useState } from "react";
import Input from "../common/inputs/Input";
import Password from "../common/inputs/Password";
import Button from "../common/buttons/MainButton";
import SecondaryButtonLink from "../common/buttons/SecondaryButtonLink";
import useIsMobile from "../hooks/useIsMobile";
import fetchJson from "../../lib/fetchJson";
import useUser from "../../lib/useUser";

const SignupForm: NextPage = () => {
  const isMobile = useIsMobile();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
      );
    } catch (error) {
      console.error("An unexpected error happened:", error);
      setErrorMsg("An unexpected error happened: " + error);
    }
  };

  const submitUser = async () => {
    const res = await fetch("/api/users/0", {
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({ user: user }),
    });

    const json = await res.json();
    //console.log(json)

    if (res.status === 200) {
      setUser((o) => ({ ...o, id: json }));
      login();
    } else {
      alert(json.message);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitUser();
  };

  return (
    <form className="space-y-4 px-3" onSubmit={handleSubmit}>
      <div className="space-y-8">
        <Input
          type="text"
          label="Username"
          onChange={(e) => setUser((o) => ({ ...o, name: e.target.value }))}
        />
        <Input
          type="text"
          label="Email"
          onChange={(e) => setUser((o) => ({ ...o, email: e.target.value }))}
        />
        <Password type="password" label="Password" />
        <Password
          type="password"
          label="Confirm Password"
          onChange={(e) => setUser((o) => ({ ...o, password: e.target.value }))}
        />
      </div>
      <div className="text-red py-2">{errorMsg}</div>
      <div className="flex space-x-6">
        <Button text="Signup" fullWidth={true} type="submit" />
        {!isMobile && (
          <SecondaryButtonLink text="Login" to="/login" fullWidth={true} />
        )}
      </div>
    </form>
  );
};

export default SignupForm;
