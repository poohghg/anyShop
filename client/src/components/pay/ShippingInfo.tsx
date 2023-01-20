import React, { useCallback, useState, SyntheticEvent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux";

const ShippingInfo = () => {
  const [deliveryInfo, setDeliveryInfo] = useState<string>("ori");
  const { email, nickName, userId } = useSelector(
    (state: RootState) => state.userReducer,
  );

  // const handelDeliveryInfo = useCallback((e: SyntheticEvent) => {
  //   const target = e!.target as HTMLInputElement;
  //   const { delivery } = target.dataset;
  //   setDeliveryInfo(deliveryInfo);
  // }, []);

  // user.
  return (
    <Main>
      <h3>안녕하세요 </h3>
      <UserMsg>{nickName}님 배송정보를 입력해주세요.</UserMsg>
      <DeliveryInfo>
        <button onClick={() => setDeliveryInfo("ori")} data-delivery={"ori"}>
          기존 배송지
        </button>
        <button onClick={() => setDeliveryInfo("new")} data-delivery={"new"}>
          신규 베송지
        </button>
      </DeliveryInfo>
      {deliveryInfo === "ori" ? <div>ori</div> : <div>new</div>}
    </Main>
  );
};

const Main = styled.div`
  border-top: 2px solid black;
  padding-top: 1rem;
`;

const UserMsg = styled.h4`
  font-size: 1.1rem;
  font-weight: 300;
`;

const DeliveryInfo = styled.div`
  /* width:  70; */
  margin-top: 1rem;
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0.5rem 0; */
  > button {
    padding: 0.5rem;
    width: 50%;
    text-align: center;
    font-size: 0.9rem;
    font-weight: 400;
  }

  button:nth-child(2) {
    border-left: 2px solid black;
  }
`;

export default ShippingInfo;
