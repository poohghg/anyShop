import axios from "axios";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "react-query";
import styled from "styled-components";
import { loginMutation } from "../../graphql/gqlUser";

const reg_email =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const reg_passWord = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

export const test = async () => {
  try {
    const data = await axios.post(
      "http://localhost:8000/graphql",
      {
        query: `
        mutation LOGIN($email: String!, $passWord: String!) {
        login(email: $email, passWord: $passWord) {
          email
          nickName
          token
        }
      }
      `,
        variables: { email: "poohghg@naver.com", passWord: "qwer1234!@" },
      },
      { withCredentials: true },
    );
    return data;
  } catch (error) {}
};

const LoginPage = () => {
  // const [cookies, setCookie] = useCookies(["test"]); // 쿠키 훅
  const form = useRef<HTMLFormElement>(null);
  const { mutate: login, data, error } = loginMutation();
  // const { mutate: login, data, error } = useMutation(() => test());

  const handelLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    const email = form.current!.querySelector<HTMLInputElement>("#email");
    const passWord = form.current!.querySelector<HTMLInputElement>("#passWord");

    if (!reg_email.test(email!.value)) return email!.focus();
    if (!reg_passWord.test(passWord!.value)) return passWord!.focus();
    // login({ email: email!.value, passWord: passWord!.value });
  };

  const { mutate: aa } = useMutation(() => test());

  useEffect(() => {}, []);

  return (
    <Main>
      <Button onClick={() => aa()} type="submit">
        axios
      </Button>
      <Button
        onClick={
          // () => login()
          () => login({ email: "poohghg@naver.com", passWord: "qwer1234!@" })
        }
        type="submit"
      >
        request
      </Button>
      <Title>안녕하세요</Title>
      <SubTitle>아이디와 비밀번호를 입력해주세요.</SubTitle>
      <form ref={form}>
        <Box>
          <Label htmlFor="email">이메일을 입력해주세요.</Label>
          <Input id="email" type="email" placeholder="이메일을 입력해주세요." />
          <Label htmlFor="passWord">비밀번호을 입력해주세요.</Label>
          <Input
            id="passWord"
            type="passWord"
            placeholder="비밀번호을 입력해주세요."
          />
        </Box>
        <Button onClick={handelLogin} type="submit">
          로그인 하기
        </Button>
      </form>
    </Main>
  );
};
export default LoginPage;

const Main = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  padding-top: 10rem;
`;
const Title = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;
const SubTitle = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightGray};
  padding-bottom: 0.2rem;
`;
const Box = styled.div`
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* align-items: ; */
`;
const Input = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.lightGray};
  box-shadow: 0px 3px 2px 1px ${({ theme }) => theme.colors.lightGray};
  border-radius: 8px;
  width: 100%;
  height: 4vh;
  margin: 0.5rem 0;
  padding: 0.5rem;
  font-size: 1rem;
  font-weight: 400;
  transition: all 0.15s ease 0s;

  :focus {
    outline: none;
    border: 2px solid ${({ theme }) => theme.colors.deepBlue};
    box-shadow: 0px 3px 2px 1px ${({ theme }) => theme.colors.deepBlue};
  }

  ::placeholder {
    font-size: 0.8rem;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.lightGray};
  }
`;
const Label = styled.label`
  font-size: 0.8rem;
  font-weight: 350;
  margin-top: 1rem;
`;
const Button = styled.button`
  cursor: pointer;
  width: 100%;
  height: 5vh;
  text-align: center;
  border: 1px solid black;
  border-radius: 6px;
  color: #fff;
  /* color: ; */
  background-color: ${({ theme }) => theme.colors.deepBlue};
`;
