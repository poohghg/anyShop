import { useEffect } from "react";
import { singUpMutation } from "../../graphql/gqlUser";
import { UserInfoProps } from "../../pages/singUp";

interface SingUpProcessProps extends Omit<UserInfoProps, "confirmPassword"> {}

const SingUpProcess = ({ email, nickName, passWord, userTy }: SingUpProcessProps) => {
  const { mutate: singUp } = singUpMutation();
  useEffect(() => {
    singUp({ email, nickName, passWord, userTy });
  }, []);

  return <div>회원가입 처리중입니다.</div>;
};
export default SingUpProcess;
