import { log } from "console";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLikeProduct } from "../../graphql/gqlCart";
import { useToLogin } from "../../hoc";
import { RootState } from "../../redux";
import { HeartIcon } from "../../style/icons/icons";

const AddLike = ({ productId }: { productId: string }) => {
  const isToLoginPage = useToLogin();
  const { mutate: likeProduct } = useLikeProduct();
  const userId = useSelector((state: RootState) => state.userReducer.userId);
  const likProductListener = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!userId) return isToLoginPage();
      console.log("userId", userId);
      likeProduct(productId);
    },
    [userId, productId],
  );

  return (
    <button onClick={likProductListener}>
      <HeartIcon />
    </button>
  );
};

export default memo(AddLike);
