import { NextPage } from "next";
import { ProfileLoginOptions, ProfileLogoutOptions } from "./data";
import Link from "next/link";
import useUser from "../../../lib/useUser";
import fetchJson from "../../../lib/fetchJson";
import router from "next/router";

type ProfileDropdown = {
  profileDropdownActive: boolean;
};

const ProfileDropDown: NextPage<ProfileDropdown> = ({
  profileDropdownActive,
}) => {
  const { user, mutateUser } = useUser();

  const renderLogout = ProfileLogoutOptions.map((x) => {
    return (
      <li
        key={x.value}
        className="flex items-center px-4 py-2 hover:bg-gray-200 space-x-3"
      >
        <Link href={x.to} passHref>
          <a className="flex flex-row">
            <i className={`${x.icon} text-main text-lg w-10`} />
            <span className="text-main text-lg flex whitespace-nowrap">
              {x.name}
            </span>
          </a>
        </Link>
      </li>
    );
  });

  const renderLogin = ProfileLoginOptions.map((x) => {
    return (
      <li
        key={x.value}
        className="flex items-center px-4 py-2 hover:bg-gray-200 space-x-3"
      >
        <Link href={x.to} passHref>
          {x.name === "Logout" ? (
            <a
              className="flex flex-row"
              onClick={async (e) => {
                e.preventDefault();
                if (mutateUser) {
                  await mutateUser(
                    fetchJson("/api/logout", { method: "POST" }),
                    false
                  );
                }
                router.push("/");
              }}
            >
              <i className={`${x.icon} text-main text-lg w-10`} />
              <span className="text-main text-lg flex whitespace-nowrap">
                {x.name} {user?.login}
              </span>
            </a>
          ) : (
            <a className="flex flex-row">
              <i className={`${x.icon} text-main text-lg w-10`} />
              <span className="text-main text-lg flex whitespace-nowrap">
                {x.name}
              </span>
            </a>
          )}
        </Link>
      </li>
    );
  });

  return (
    <ul
      className={`absolute bg-white shadow-drop-down rounded-sm top-10 right-0 z-40 ${
        profileDropdownActive ? "block" : "hidden"
      }`}
    >
      {user?.isLoggedIn ? renderLogin : renderLogout}
    </ul>
  );
};

export default ProfileDropDown;
