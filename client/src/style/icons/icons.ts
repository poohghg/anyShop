import styled, { css } from "styled-components";

interface CssProps {
  width?: number;
  height?: number;
  withStyle?: { [key: string]: string | number };
}

type CssStyleProps = Omit<CssProps, "withStyle">;

const BaseIcon = styled.i`
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  vertical-align: middle;
  opacity: 1;
  background-size: contain;
`;

export const PlusIcon = styled(BaseIcon)<CssStyleProps>`
  background-image: url(/images/plus.svg);
  ${(props) => css`
    width: ${props.width ?? 12}px;
    height: ${props.height ?? 12}px;
  `}
`;

export const MinusIcon = styled(BaseIcon)<CssStyleProps>`
  background-image: url(/images/minus.svg);
  ${(props) => css`
    width: ${props.width ?? "12px"};
    height: ${props.height ?? "12px"};
  `}
`;

export const CloseIcon = styled(BaseIcon)<CssStyleProps>`
  background-image: url(/images/close.svg);
  ${(props) => css`
    width: ${props.width ?? "12px"};
    height: ${props.height ?? "12px"};
  `}
`;

export const CartIcon = styled(BaseIcon)<CssStyleProps>`
  background-image: url(/images/cart.png);
  ${(props) => css`
    width: ${props.width ?? "24px"};
    height: ${props.height ?? "24px"};
  `}
`;

export const HeartIcon = styled(BaseIcon)<CssStyleProps>`
  background-image: url(/images/active_heart.png);
  ${(props) => css`
    width: ${props.width ?? "24px"};
    height: ${props.height ?? "24px"};
  `}
`;

export const NotHeartIcon = styled(BaseIcon)<CssStyleProps>`
  background-image: url(/images/unactive_heart.png);
  ${(props) => css`
    width: ${props.width ?? "24px"};
    height: ${props.height ?? "24px"};
  `}
`;
