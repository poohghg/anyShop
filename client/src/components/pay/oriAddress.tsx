import styled, { keyframes } from "styled-components";
import { FadeIn } from "../../style/animataion";
import { ShippingInfoProps } from "./shippingInfo";

type OriAddressProps = Pick<ShippingInfoProps, "payUserInfo">;

const OriAddress = ({
  payUserInfo: { address, recipient, detailedAddress },
}: OriAddressProps) => {
  const [mainAddress, noAddress] = address.split("/");
  if (!address) return <div>현재 저장된 주소가 없습니다.</div>;
  return (
    <Main>
      <FlexBox>
        <h5>수령인</h5>
        <Content>{recipient}</Content>
      </FlexBox>
      <FlexBox>
        <h5>우편번호</h5>
        <Content>{noAddress}</Content>
      </FlexBox>
      <FlexBox>
        <h5>주소</h5>
        <Content>{mainAddress}</Content>
      </FlexBox>
      <FlexBox>
        <h5>상세주소</h5>
        <Content>{detailedAddress}</Content>
      </FlexBox>
    </Main>
  );
};

export default OriAddress;

const Main = styled.div`
  animation: ${FadeIn} 0.1s ease-in-out 0s forwards;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  > h5 {
    font-size: 1.1rem;
    font-weight: 400;
    width: 25%;
  }
`;

const Content = styled.div`
  width: 75%;
  padding: 0.5rem;
  border: 1px solid #bcbcbc;
  font-size: 0.9rem;
  font-weight: 400;
`;
