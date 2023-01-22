import { SyntheticEvent, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ShippingInfo from "../../components/pay/shippingInfo";
import WillPay from "../../components/pay/willPay";
import { RootState } from "../../redux";

export interface payUserInfoType {
  recipient: string;
  address: string;
  detailedAddress: string;
}

const PaymentPage = () => {
  const payItems = useSelector(
    (state: RootState) => state.stateReducer.payItems,
  );

  const { email, nickName, userId } = useSelector(
    (state: RootState) => state.userReducer,
  );

  const [payUserInfo, setPayUserInfo] = useState<payUserInfoType>({
    address: "",
    detailedAddress: "",
    recipient: "",
  });

  // const handlePayUserInfo = useCallback((e: SyntheticEvent) => {
  //   const target = e.target as HTMLInputElement;
  // }, []);

  return (
    <LayOut>
      <ShippingInfo
        payUserInfo={payUserInfo}
        setPayUserInfo={setPayUserInfo}
        nickName={nickName}
      />
      <WillPay payItems={payItems} />
    </LayOut>
  );
};

const LayOut = styled.section`
  max-width: 1080px;
  padding: 1.5rem;
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 0 2rem;
  @media screen and (max-width: 550px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export default PaymentPage;
