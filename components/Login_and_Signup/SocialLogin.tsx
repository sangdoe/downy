import { NextPage } from "next";
import Image from "next/image";
import useIsMobile from "../hooks/useIsMobile";
import Link from "next/link";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import { useState } from "react";
import useUser from "../../lib/useUser";
import fetchJson from "../../lib/fetchJson";
import { GoogleUser } from "../../shared/types";
import router from "next/router";

const clientId =
  "696815860492-5i92uj7859f3vtmtl96paho39buro7kf.apps.googleusercontent.com";

interface SocialLoginP {
  type: string;
}

const GoogleImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  return src; //`https://lh3.googleusercontent.com/${src}?w=${width}&q=${
  //quality || 75
  //}`;
};

const SocialLoginDesktop: NextPage<SocialLoginP> = ({ type }) => {
  const isMobile = useIsMobile();
  const { mutateUser } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [loading, setLoading] = useState("Loading...");
  const [user, setUser] = useState<GoogleUser | null>(null);

  const submitUser = async (usr: GoogleUser) => {
    const res = await fetch("/api/users/google", {
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      method: "POST",
      body: JSON.stringify({ user: usr }),
    });

    const json = await res.json();
    //console.log(json)

    if (res.status === 200) {
      router.push("/");
    } else {
      alert(json.message);
    }
  };

  const handleLoginSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    //    console.log("Login Success ", response);
    const tempUser = response as GoogleLoginResponse;
    //setUser(tempUser.profileObj);
    submitUser(tempUser.profileObj);
    setLoading("");
  };

  const handleLoginFailure = (error: any) => {
    console.log("Login Failure ", error);
    setLoading("");
  };

  const handleLogoutSuccess = () => /*(
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  )*/ {
    console.log("Logout Success ");
    setUser(null);
  };

  const handleLogoutFailure = (/*error: any */) => {
    console.log("Logout Failure ");
  };

  const handleRequest = () => {
    setLoading("Loading...");
  };

  const handleAutoLoadFinished = () => {
    setLoading("");
  };

  return (
    <div className="space-y-6">
      {!isMobile && (
        <h6 className="text-center text-white font-semibold">
          {type === "login" ? "Login with" : "Signup with"}
        </h6>
      )}
      <ul className="flex space-x-12 justify-center">
        <li className="cursor-pointer w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 28 27.311"
            viewBox="0 0 28 27.311"
          >
            <path d="M28,14c0-7.732-6.268-14-14-14S0,6.268,0,14c0,6.221,4.061,11.488,9.674,13.311c0.767-0.235,0.803-0.702,0.803-0.702s0-1.383,0-2.661c-0.843,0.155-1.89,0.157-2.271,0.157c-0.464,0-2.009-0.386-2.689-2.132c-0.68-1.746-1.947-1.916-1.947-2.225s0.278-0.371,0.278-0.371s0.17,0,0.927,0c0.757,0,1.514,1.267,2.04,2.04s1.792,0.927,2.411,0.927c0.347,0,0.885-0.175,1.294-0.329c0.167-1.082,0.792-1.896,0.792-1.896c-6.243-0.556-6.397-5.223-6.397-7.046c0-1.823,1.484-3.616,1.484-3.616s-0.719-2.04,0.185-3.709c1.947,0.015,3.894,1.483,3.894,1.483S12.238,6.676,14,6.676s3.523,0.556,3.523,0.556s1.947-1.468,3.894-1.483c0.904,1.669,0.185,3.709,0.185,3.709s1.484,1.792,1.484,3.616c0,1.823-0.155,6.49-6.397,7.046c0,0,0.834,1.082,0.834,2.411s0,4.08,0,4.08s0.035,0.466,0.803,0.702C23.939,25.488,28,20.221,28,14z" />
          </svg>
        </li>
        <li className="cursor-pointer w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="Ebene 1"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="#1877f2"
              d="M1024,512C1024,229.23016,794.76978,0,512,0S0,229.23016,0,512c0,255.554,187.231,467.37012,432,505.77777V660H302V512H432V399.2C432,270.87982,508.43854,200,625.38922,200,681.40765,200,740,210,740,210V336H675.43713C611.83508,336,592,375.46667,592,415.95728V512H734L711.3,660H592v357.77777C836.769,979.37012,1024,767.554,1024,512Z"
            />
            <path
              fill="#fff"
              d="M711.3,660,734,512H592V415.95728C592,375.46667,611.83508,336,675.43713,336H740V210s-58.59235-10-114.61078-10C508.43854,200,432,270.87982,432,399.2V512H302V660H432v357.77777a517.39619,517.39619,0,0,0,160,0V660Z"
            />
          </svg>
        </li>
        <li className="cursor-pointer w-10">
          {user ? (
            <div>
              <div className="name">Welcome {user.name}!</div>
              <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={handleLogoutSuccess}
                onFailure={handleLogoutFailure}
              />
              <Image
                loader={GoogleImageLoader}
                width={64}
                height={64}
                src={user.imageUrl}
                title={user.name}
                alt={user.familyName}
              />
              <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          ) : (
            <GoogleLogin
              clientId={clientId}
              buttonText={loading}
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
              onRequest={handleRequest}
              onAutoLoadFinished={handleAutoLoadFinished}
              isSignedIn={true}
            />
          )}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 256 262"
          >
            <path
              fill="#4285F4"
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
            />
            <path
              fill="#34A853"
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
            />
            <path
              fill="#FBBC05"
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
            />
            <path
              fill="#EB4335"
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
            />
          </svg> */}
        </li>
      </ul>
      {isMobile && (
        <p className="text-center">
          {type === "login"
            ? "Don;t have a account? "
            : "Already have a account? "}
          {type === "login" ? (
            <Link href="/signup">Signup</Link>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </p>
      )}
    </div>
  );
};

export default SocialLoginDesktop;
