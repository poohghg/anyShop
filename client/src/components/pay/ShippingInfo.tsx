import styled, { css } from "styled-components";
import { Addresses } from "../../graphql/gqlUser";
import { DeliveryInfoType, PayUserInfoType } from "../../pages/payment";
import NewAddress from "./newAddress";
import OriAddress from "./oriAddress";

export interface ShippingInfoProps {
  nickName: string;
  payUserInfo: {
    recipient: string;
    address: string;
    detailedAddress: string;
    checkAddress: boolean;
  };
  deliveryInfo: DeliveryInfoType;
  setPayUserInfo: React.Dispatch<React.SetStateAction<PayUserInfoType>>;
  setDeliveryInfo: React.Dispatch<React.SetStateAction<DeliveryInfoType>>;
  addresses?: Addresses[];
}

const ShippingInfo = ({
  nickName,
  payUserInfo,
  deliveryInfo,
  addresses,
  setDeliveryInfo,
  setPayUserInfo,
}: ShippingInfoProps) => {
  return (
    <Main>
      <h3>안녕하세요 </h3>
      <UserMsg>{nickName}님 배송정보를 입력해주세요.</UserMsg>
      <DeliveryInfo>
        <DeliveryBtn
          onClick={() => setDeliveryInfo("ori")}
          isSelected={deliveryInfo === "ori"}
        >
          기존 배송지
        </DeliveryBtn>
        <DeliveryBtn
          onClick={() => setDeliveryInfo("new")}
          isSelected={deliveryInfo === "new"}
        >
          신규 배송지
        </DeliveryBtn>
      </DeliveryInfo>
      {deliveryInfo === "ori" ? (
        <OriAddress payUserInfo={payUserInfo} />
      ) : (
        <NewAddress payUserInfo={payUserInfo} setPayUserInfo={setPayUserInfo} />
      )}
    </Main>
  );
};

const Main = styled.div`
  position: sticky;
  top: 9.5vh;
  height: max-content;
  border-top: 2px solid black;
  padding-top: 1rem;
`;

const UserMsg = styled.h4`
  font-size: 1rem;
  font-weight: 300;
`;

const DeliveryInfo = styled.div`
  margin-top: 1rem;
  border-bottom: 1px solid #bcbcbc;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  /* padding: 0.5rem; */
  width: 100%;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 1.5rem;
  button:nth-child(2) {
    border-right: 1px solid #bcbcbc;
  }
`;

const DeliveryBtn = styled.button<{ isSelected: boolean }>`
  padding: 0.5rem;
  width: 40%;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 400;
  color: #bcbcbc;
  border-top: 1px solid #bcbcbc;
  border-left: 1px solid #bcbcbc;
  ${({ isSelected }) =>
    isSelected &&
    css`
      color: black;
    `}
`;

export default ShippingInfo;
