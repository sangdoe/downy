import { NextPage } from "next";
import { UserLogin } from "../../shared/types";
import ProfilePlain from "./ProfilePlain";

const Profile: NextPage<{ user: UserLogin | undefined }> = ({ user }) => {
  return (
    <div className="relative">
      <ProfilePlain user={user} />
    </div>
  );
};

export default Profile;
