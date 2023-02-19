import { SyntheticEvent, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MutableProduct, useAddProduct } from "../../graphql/gqlProduct";
import { RootState } from "../../redux";

const AddProduct = () => {
  const { userId, userTy } = useSelector(
    (state: RootState) => state.userReducer,
  );
  const form = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();
  const { mutate: addProduct, status } = useAddProduct();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const data = [...new FormData(e.target as HTMLFormElement)].reduce<{
      [key: string]: any;
    }>((prev, [k, v]) => {
      prev[k] = v;
      return prev;
    }, {});
    data.price = +data.price;
    addProduct(data as MutableProduct);
  };

  useEffect(() => {
    if (!userId || userTy === 1) {
      alert("접근 권한이 없습니다");
      navigate("/");
    }
  }, [userId]);

  useEffect(() => {
    if (form.current && status === "success") form.current.reset();
  }, [form.current, status]);

  if (!userId || userTy === 1) return null;
  return (
    <>
      <h2>상품등록</h2>
      <Form ref={form} onSubmit={handleSubmit}>
        <FlexBox>
          <label htmlFor="category">카테고리</label>
          <Select id="category" name="category">
            <option value="furniture">가구</option>
            <option value="clothes">의류</option>
            <option value="normal">일반</option>
            <option value="food">식품</option>
          </Select>
        </FlexBox>
        <FlexBox>
          <label htmlFor="title">상품명</label>
          <Input id="title" name="title" type="text" required />
        </FlexBox>
        <FlexBox>
          <label htmlFor="imageUrl">이미지URL</label>
          <Input id="imageUrl" name="imageUrl" type="text" required />
        </FlexBox>
        <FlexBox>
          <label htmlFor="number">상품가격</label>
          <Input id="price" name="price" type="number" required min="1" />
        </FlexBox>
        <FlexBox>
          <label htmlFor="description">상세</label>
          <Textarea id="description" name="description" required />
        </FlexBox>
        <Button type="submit">등록</Button>
      </Form>
    </>
  );
};
export default AddProduct;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  border: 1px solid #bbb;
  border-radius: 12px;
  margin-top: 1rem;
`;

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 0;
  & + & {
    /* margin-top: 1rem; */
    border-top: 1px dotted #666;
  }
  > label {
    width: 15%;
    /* flex-grow: 0.1; */
  }
  input:nth-child(2) {
    flex-grow: 1;
  }
`;

const Select = styled.select`
  outline: none;
  border: none;
  border-bottom: 1px solid #666;
  padding-bottom: 0.3rem;
  flex-grow: 1;
`;

const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid #666;
  padding-bottom: 0.3rem;
`;

const Textarea = styled.textarea`
  flex-grow: 1;
  height: 180px;
  padding: 0.5rem;
  outline: none;
`;

const Button = styled.button`
  width: 100%;
  text-align: center;
  padding: 1rem;
  height: 4.5vh;
  background-color: rgb(74, 85, 97);
  color: #fff;
`;
