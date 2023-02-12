import { Fragment, useCallback } from "react";
import { InfiniteData } from "react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useAddCart } from "../../graphql/gqlCart";
import { Products } from "../../graphql/gqlProduct";
import { useToLogin } from "../../hoc";
import { RootState } from "../../redux";
import ProductItem from "./productItem";

interface ProductListProps {
  data: InfiniteData<Products> | undefined;
}

const ProductList = ({ data }: ProductListProps) => {
  return (
    <List>
      {data?.pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.products.map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </Fragment>
      ))}
    </List>
  );
};

export default ProductList;

export const List = styled.ul`
  padding: 1rem 2rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5vh 1vw;

  @media ${(props) => props.theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
