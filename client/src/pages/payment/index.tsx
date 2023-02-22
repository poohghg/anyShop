import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import WillPay from "../../components/pay/willPay";
import { CartType } from "../../graphql/gqlCart";
import { useExecutePay } from "../../graphql/gqlPayMent";
import { RootState } from "../../redux";

export interface PayUserInfoType {
  recipient: string;
  address: string;
  detailedAddress: string;
  checkAddress: boolean;
}

interface PayItemType extends CartType {
  isInstant: boolean;
}

const initPayUserInfo = {
  address: "",
  detailedAddress: "",
  recipient: "",
  checkAddress: true,
};

const PaymentPage = () => {
  const location = useLocation();
  const itemFromRedux = useSelector(
    (state: RootState) => state.stateReducer.payItems,
  );

  const { nickName, addresses } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const [payUserInfo, setPayUserInfo] =
    useState<PayUserInfoType>(initPayUserInfo);
  const [deliveryInfo, setDeliveryInfo] = useState<"ori" | "new">("ori");

  const payItems: PayItemType[] = useMemo(() => {
    if (location.state?.payItem) return location.state?.payItem;
    return itemFromRedux;
  }, [location.state, itemFromRedux]);

  const { mutate: executePay } = useExecutePay();

  const handlePay = () => {
    if (!payUserInfo.address) return alert("주소를 입력해주세요!");
    if (!payUserInfo.recipient) return alert("수령인을 입력해주세요!");
    if (!payUserInfo.detailedAddress) return alert("상세주소를 입력해주세요!");
    const ids = payItems.map(({ id }) => id);
    executePay({ ids, ...payUserInfo, isInstant: payItems[0]?.isInstant });
  };

  useEffect(() => {
    if (deliveryInfo === "ori" && addresses?.length) {
      const recentAds = addresses[0];
      setPayUserInfo(() => ({ checkAddress: false, ...recentAds }));
    } else {
      setPayUserInfo(() => initPayUserInfo);
    }
  }, [deliveryInfo, addresses]);

  return (
    <LayOut>
      <ShippingInfo
        nickName={nickName}
        addresses={addresses}
        deliveryInfo={deliveryInfo}
        payUserInfo={payUserInfo}
        setDeliveryInfo={setDeliveryInfo}
        setPayUserInfo={setPayUserInfo}
      />
      <WillPay payItems={payItems} handlePay={handlePay} />
    </LayOut>
  );
};

const LayOut = styled.section`
  padding: 1.5rem;
  max-width: 1080px;
  height: auto;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  grid-template-rows: fit-content(100%);
  gap: 0 2rem;
  @media screen and (max-width: 550px) {
    > div:nth-child(1) {
      position: static;
      margin-bottom: 2vh;
    }
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export default PaymentPage;
