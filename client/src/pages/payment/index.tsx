import styled from "styled-components";
import ShippingInfo from "../../components/pay/ShippingInfo";
import WillPay from "../../components/pay/willPay";

const PaymentPage = () => {
  return (
    <LayOut>
      <ShippingInfo />
      <WillPay />
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
