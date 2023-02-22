import { log } from "console";
import React, {
  createRef,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Carts,
  CartType,
  useDeleteMutation,
  useUpdateMutation,
} from "../../graphql/gqlCart";
import { RootState } from "../../redux";
import { setPayItems } from "../../redux/stateReducer";
import { CheckBoxInput, CheckBoxLabel } from "../../style/styledComponents";
import NoData from "../singUp/noData";
import CartItem from "./cartItem";
import TotalPayInfo from "./TotalPayInfo";

// interface CartProps extends CartType {}
const CartList = ({ cart }: Carts) => {
  // 사용변수
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>();
  const payItems = useSelector(
    (state: RootState) => state.stateReducer.payItems,
  );
  const checkboxRefs = useMemo(
    () => cart.map(() => createRef<HTMLInputElement>()),
    [cart],
  );

  //  뮤테이션
  const { mutate: updateCart } = useUpdateMutation();
  const { mutate: deleteCart } = useDeleteMutation();

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

  const handleUpdateAmount = useCallback((amount: number, id?: string) => {
    if (id) updateCart({ id, amount });
  }, []);

  const handleDeleteCart = useCallback((e: React.MouseEvent, id: string) => {
    const isDelete = confirm("해당 상품을 삭제하시겠습니끼?");
    if (isDelete) deleteCart({ id });
  }, []);

  const toPayPage = useCallback(() => navigate("/payment"), []);

  useEffect(() => {
    const newPayItems = checkboxRefs.reduce<CartType[]>((acc, cur, i) => {
      if (cur.current!.checked) acc.push(cart[i]);
      return acc;
    }, []);
    dispatch(setPayItems(newPayItems));
  }, [checkboxRefs, formData]);

  if (!cart.length) return <NoData label="장바구니가 비었습니다." />;
  return (
    <Main>
      <Label>결제 상품정보</Label>
      <form ref={formRef} onChange={handleCheckBoxChange}>
        <ul>
          <TotalCheckBox>
            <CheckBoxInput
              id="allCheckBox"
              name="all"
              type="checkbox"
              defaultChecked={true}
            />
            <CheckBoxLabel
              htmlFor="allCheckBox"
              style={{ paddingLeft: "28px" }}
            >
              전체선택
            </CheckBoxLabel>
          </TotalCheckBox>
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
      <TotalPayInfo payItems={payItems} buttonListener={toPayPage} />
    </Main>
  );
};

const Main = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding: 1rem 0;
  /* border: 1px solid black; */
  border-radius: 12px;
  margin-top: 1rem;
`;

const Label = styled.h4`
  padding-bottom: 0.5rem;
  border-bottom: 2px solid black;
  font-size: 1.5rem;
  font-weight: 600;
`;

const TotalCheckBox = styled.div`
  padding: 0.5rem;
`;

export default CartList;
