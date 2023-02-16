import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { authFetcher, getClient, QueryKeys } from "../queryClient";

export const EXECUTE_PAY = `
  mutation EXECUTE_PAY(
    $ids: [ID!],    
    $checkAddress: Boolean!
    $address: String!
    $recipient: String!
    $detailedAddress: String!
    $isInstant: Boolean!
  ){
    executePay(
      ids: $ids,    
      checkAddress: $checkAddress
      address: $address
      recipient: $recipient
      detailedAddress: $detailedAddress
      isInstant: $isInstant
    )
  }
`;

interface payInfo {
  ids: String[];
  checkAddress: boolean;
  address: string;
  recipient: string;
  detailedAddress: string;
  isInstant?: boolean;
}

const client = getClient();

export const useExecutePay = () => {
  const navigate = useNavigate();
  return useMutation(
    ({
      ids,
      checkAddress,
      address,
      recipient,
      detailedAddress,
      isInstant = false,
    }: payInfo) =>
      authFetcher(EXECUTE_PAY, {
        ids,
        checkAddress,
        address,
        recipient,
        detailedAddress,
        isInstant,
      }),
    {
      onSuccess: () => {
        client.invalidateQueries(QueryKeys.CART);
        client.invalidateQueries(QueryKeys.PRODUCTS);
        navigate("/");
      },
      onError: (error, variables, context) => {},
    },
  );
};
