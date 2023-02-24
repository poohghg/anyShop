import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useToLogin = () => {
  const navigate = useNavigate();
  const isToLoginPage = useCallback((isBack: boolean = false) => {
    const isAgree = confirm("로그인이 필요힙나디. 로그인 하시겠습니까?");
    if (isAgree) return navigate("/login");
    if (isBack) return navigate(-1);
  }, []);

  return isToLoginPage;
};
export default useToLogin;
