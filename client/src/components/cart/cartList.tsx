import React, {
  createRef,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  Carts,
  CartType,
  deleteMutation,
  updateMutation,
} from "../../graphql/gqlCart";
import { setPayItems } from "../../redux/stateReducer";
import { CheckBoxInput, CheckBoxLabel } from "../../style/styledComponents";
import WillPay from "../pay/willPay";
import CartItem from "./cartItem";

// interface CartProps extends CartType {}

const CartList = ({ cart }: Carts) => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>();
  // 사용변수
  const checkboxRefs = useMemo(
    () => cart.map(() => createRef<HTMLInputElement>()),
    [cart],
  );
  //  뮤테이션
  const { mutate: updateCart } = updateMutation();
  const { mutate: deleteCart } = deleteMutation();

  const handleCheckBoxChange = (e: SyntheticEvent) => {
    if (!formRef.current) return;
    const target = e?.target as HTMLInputElement;

    if (target.name === "all") {
      const isChecked = target.checked;
      checkboxRefs.forEach((ele) => (ele.current!.checked = isChecked));
    } else {
      //  전체 체크박스를 체크해주는 단순한 용도
      const data = new FormData(formRef.current);
      const selectedCount = data.getAll("select-item").length;
      const isAllChecked = selectedCount === cart.length;
      formRef.current.querySelector<HTMLInputElement>("#allCheckBox")!.checked =
        isAllChecked;
    }
    setFormData(new FormData(formRef.current));
  };

  const handleUpdateAmount = useCallback(
    (e: React.MouseEvent, amount: number, id: string) => {
      if (amount) updateCart({ id, amount });
    },
    [],
  );

  const handleDeleteCart = useCallback((e: React.MouseEvent, id: string) => {
    const isDelete = confirm("해당 제품을 삭제하시겠습니끼?");
    if (isDelete) deleteCart({ id });
  }, []);

  useEffect(() => {
    const newPayItems = checkboxRefs.reduce<CartType[]>((acc, cur, i) => {
      if (cur.current!.checked) acc.push(cart[i]);
      return acc;
    }, []);
    dispatch(setPayItems(newPayItems));
  }, [checkboxRefs, formData]);

  return cart.length !== 0 ? (
    <>
      <form ref={formRef} onChange={handleCheckBoxChange}>
        <ul>
          <CheckBoxInput
            id="allCheckBox"
            name="all"
            type="checkbox"
            defaultChecked={true}
          />
          <CheckBoxLabel htmlFor="allCheckBox" />
          {cart?.map((item, idx) => (
            <CartItem
              key={item.id}
              ref={checkboxRefs[idx]}
              handleUpdateAmount={handleUpdateAmount}
              handleDeleteCart={handleDeleteCart}
              {...item}
            />
          ))}
        </ul>
      </form>
      <WillPay />
    </>
  ) : null;
};

const List = styled.ul`
  margin: 0 auto;
`;

export default CartList;
