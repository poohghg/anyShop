import { SyntheticEvent, useCallback, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import BaseSingUp from "../../components/singUp/baseSingUp";
import SingUpProcess from "../../components/singUp/singUpProcess";
import { CHECK_EMAIL } from "../../graphql/gqlUser";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const reg_email =
  /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
const reg_passWord = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
const reg_nickName = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,10}$/;

export interface UserInfoProps {
  email: string;
  passWord: string;
  confirmPassword: string;
  nickName: string;
}

const SingUp = () => {
  const [order, setOrder] = useState<number>(1);
  const [userState, loginUserState] = useState<UserInfoProps>({
    email: "",
    passWord: "",
    confirmPassword: "",
    nickName: "",
  });

  const handelSetState = useCallback((e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    loginUserState((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSetOrder = useCallback(() => {
    setOrder((prev) => ++prev);
  }, []);

  const { data, status } = useQuery<{ checkEmail: boolean }>(
    [QueryKeys.USER, { email: userState.email }],
    () => graphqlFetcher(CHECK_EMAIL, { email: userState.email }),
    {
      enabled: reg_email.test(userState.email),
    },
  );

  return (
    <Main>
      <Header>회원가입</Header>
      <Box>
        {order === 1 ? (
          <BaseSingUp
            type="email"
            name="email"
            value={userState.email}
            placeHolder="로그인에 사용할 아이디를 입력해주세요."
            warning={
              data?.checkEmail === false
                ? "중복된 이메일이 있습니다"
                : "로그인에 사용할 아이디를 입력해주세요."
            }
            isTest={
              reg_email.test(userState.email) &&
              data?.checkEmail === true &&
              status === "success"
            }
            handelSetState={handelSetState}
            handleSetOrder={handleSetOrder}
          />
        ) : order === 2 ? (
          <BaseSingUp
            type="passWord"
            name="passWord"
            value={userState.passWord}
            subValue={userState.confirmPassword}
            placeHolder="로그인에 사용할 비밀번호를 입력해주세요."
            warning="최소8자,숫자,문자,특수문자를 사용해주세요."
            subWarning="비밀번호 일치"
            isTest={reg_passWord.test(userState.passWord)}
            isSubTest={
              !!userState.passWord &&
              userState.passWord === userState.confirmPassword
            }
            subName="confirmPassword"
            handelSetState={handelSetState}
            handleSetOrder={handleSetOrder}
          />
        ) : order === 3 ? (
          <BaseSingUp
            type="text"
            name="nickName"
            value={userState.nickName}
            placeHolder="사용하실 닉네임을 설정해주세요."
            warning="최소2자이상 최대10자이하"
            isTest={reg_nickName.test(userState.nickName)}
            handelSetState={handelSetState}
            handleSetOrder={handleSetOrder}
            maxLen={10}
          />
        ) : (
          <SingUpProcess {...userState} />
        )}
      </Box>
    </Main>
  );
};
export default SingUp;

const Main = styled.section`
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding-bottom: 5rem;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
  padding-top: 2rem;
  > h4 {
    font-size: 1.2rem;
  }
`;

const Header = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  /* padding-bottom: ; */
`;
