import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useLikeProduct } from "../../graphql/gqlProduct";
import { useToLogin } from "../../hoc";
import { RootState } from "../../redux";
import { HeartIcon, NotHeartIcon } from "../../style/icons/icons";

const AddLike = ({
  productId,
  isLike,
}: {
  productId: string;
  isLike?: boolean;
}) => {
  const userId = useSelector((state: RootState) => state.userReducer.userId);

  const isToLoginPage = useToLogin();
  const { mutate: likeProduct } = useLikeProduct();

  const likProductListener = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!userId) return isToLoginPage();
      likeProduct(productId);
    },
    [userId, productId],
  );

  return (
    <Button onClick={likProductListener}>
      {isLike ? <HeartIcon /> : <NotHeartIcon />}
      <Label isLike={isLike}>좋아요</Label>
    </Button>
  );
};

export default memo(AddLike);

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span<{ isLike?: boolean }>`
  margin-left: 4px;
  font-weight: 350;
  font-size: 0.8rem;
  transform: translateY(10%);
  color: ${({ isLike }) => isLike && "rgb(255, 72, 0)"};
`;
