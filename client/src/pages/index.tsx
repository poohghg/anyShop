import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";

const MainPage: FC = () => {
  const user = useSelector((root: RootState) => root.userReducer);
  console.log("user", user);
  return (
    <>
      <div> 메인페이지입니다. </div>
      {user.nickName && <div>{user.nickName}</div>}
    </>
  );
};
export default MainPage;
