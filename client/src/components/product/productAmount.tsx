import styled from "styled-components";
import { MinusIcon, PlusIcon } from "../../style/icons/icons";

interface ProductAmountProps {
  amount: number;
  id?: string;
  handleAmount: (amount: number, id?: string) => void;
  // plusFunction: (amount: number, id?: string) => void;
}

const ProductAmount = ({ amount, id, handleAmount }: ProductAmountProps) => {
  return (
    <ControlAmount>
      <button
        type="button"
        onClick={() => handleAmount(amount > 1 ? amount - 1 : 1, id)}
      >
        <MinusIcon />
      </button>
      <div>{amount}</div>
      <button type="button" onClick={() => handleAmount(amount + 1, id)}>
        <PlusIcon />
      </button>
    </ControlAmount>
  );
};
export default ProductAmount;

const ControlAmount = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid #bcbcbc;
  border-radius: 8px;
  > div {
    text-align: center;
    height: 100%;
    width: 36px;
    border-left: 1px solid #bcbcbc;
    border-right: 1px solid #bcbcbc;
    font-size: 1.2rem;
  }
  > button {
    padding: 0 0.5rem;
  }
`;
