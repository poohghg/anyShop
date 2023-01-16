import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../redux";

const MainPage: FC = () => {
  const user = useSelector((root: RootState) => root.userReducer);

  return (
    <>
      <div> 메인페이지입니다. </div>
      {user.nickName && <div>{user.nickName}</div>}
    </>
  );
};
export default MainPage;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 각 로우당 높이 */
  /* grid-template-rows: 1fr 2fr; */
  grid-auto-rows: 10vh;
  /* 최소최대로 높이조절 */
  grid-auto-rows: minmax(10vh, auto);
  gap: 5px 10px;
  grid-template-areas: "a a a" "a a a" "a a a";
`;

const Content = styled.div`
  /* height: 5vh; */
  display: flex;
  background-color: red;
  border: 1px solid black;
  /* 일정영역을 차지 */
  /* grid-column: ;
    grid-row: ; */
  /* grid-area: ; */
`;
