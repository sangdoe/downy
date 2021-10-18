import { NextPage } from "next";
import useUser from "../../lib/useUser";
import WaitMe from "../WaitMe";
import SubCategoryList from "./SubCategoryList";
import SubProductList from "./SubProductList";

const FarmComponent: NextPage = () => {
  const { user } = useUser();

  if (!user) return <WaitMe />;

  return (
    <div className="relative">
      {(user.role === 'Admin' || user.role === 'Owner') ?
        <SubCategoryList user={user} />
        :
        <SubProductList user={user} />
      }
    </div>
  );
};

export default FarmComponent;
