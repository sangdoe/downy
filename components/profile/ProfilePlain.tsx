import { NextPage } from "next";
import { UserLogin } from "../../shared/types";
import ProfileForm from "./ProfileForm";

const ProfilePlain: NextPage<{ user: UserLogin | undefined }> = ({ user }) => {
  return (
    <div className="bg-main relative pb-32">
      <div className="text-center py-4 ipad:py-6 desktop:py-8">
        <h1 className="text-background">User Profile</h1>
      </div>
      {user && <ProfileForm user={user} />}
    </div>
  );
};

export default ProfilePlain;
