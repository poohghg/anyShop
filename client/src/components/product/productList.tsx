import { Fragment } from "react";
import { InfiniteData } from "react-query";
import styled from "styled-components";
import { Products } from "../../graphql/gqlProduct";
import ProductItem from "./productItem";
import SkleProductItem from "./skleProductItem";

interface ProductListProps {
  data: InfiniteData<Products> | undefined;
  isSuccess: boolean;
}

const ProductList = ({ data, isSuccess }: ProductListProps) => {
  return (
    <List>
      {isSuccess
        ? data?.pages.map((page, idx) => (
            <Fragment key={idx}>
              {page.products.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
            </Fragment>
          ))
        : Array.from({ length: 9 }).map((_, idx) => (
            <SkleProductItem key={idx} />
          ))}
    </List>
  );
};

export default ProductList;

export const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7vh 2.5vw;
  @media ${(props) => props.theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
