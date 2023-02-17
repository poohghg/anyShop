import { log } from "console";
import { FC } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MainSwiper from "../components/main/mainSwiprer";
import PageTitle from "../components/pageTitle";
import { GET_PRODUCT_ORDER } from "../graphql/gqlProduct";
import { authFetcher, QueryKeys } from "../queryClient";
import { RootState } from "../redux";

const MainPage: FC = () => {
  const user = useSelector((root: RootState) => root.userReducer);
  const { data, status } = useQuery(
    QueryKeys.PRODUCTS_MAINDATA,
    () => authFetcher(GET_PRODUCT_ORDER, {}),
    {
      refetchOnMount: true,
      staleTime: 1000 * 60 * 10,
    },
  );
  console.log("data", data);
  if (status !== "success") return null;
  return (
    <>
      <PageTitle label="메인" />
      <Wrap>
        {/* {user.nickName && <div>{user.nickName}</div>} */}
        <MainSwiper label="좋아요를 많이 받은 상품" data={data?.orderLikes} />
      </Wrap>
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

const Wrap = styled.div`
  /* padding: 0 1.5rem; */
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
`;
