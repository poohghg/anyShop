import styled, { css } from "styled-components";

interface CssProps {
  width?: number;
  height?: number;
  withStyle?: { [key: string]: string | number };
}

// type CssStyleProps = Omit<CssProps, "withStyle">;

const BaseIcon = styled.i`
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  vertical-align: middle;
  opacity: 1;
  background-size: contain;
`;

export const PlusIcon = styled(BaseIcon)<CssProps>`
  background-image: url(/images/plus.svg);
  ${(props) => css`
    width: ${props.width ?? 12}px;
    height: ${props.height ?? 12}px;
  `}
`;

export const MinusIcon = styled(BaseIcon)<CssProps>`
  background-image: url(/images/minus.svg);
  ${(props) => css`
    width: ${props.width ?? "12px"};
    height: ${props.height ?? "12px"};
  `}
`;

export const CloseIcon = styled(BaseIcon)<CssProps>`
  background-image: url(/images/close.svg);
  ${(props) => css`
    width: ${props.width ?? "12px"};
    height: ${props.height ?? "12px"};
  `}
`;

export const CartIcon = styled(BaseIcon)<CssProps>`
  background-image: url(/images/cart.png);
  ${(props) => css`
    width: ${props.width ?? "24px"};
    height: ${props.height ?? "24px"};
  `}
`;

export const HeartIcon = styled(BaseIcon)<CssProps>`
  background-image: url(/images/active_heart.png);
  ${(props) => css`
    width: ${props.width ?? "24px"};
    height: ${props.height ?? "24px"};
    ${props.withStyle};
  `}
`;

export const NotHeartIcon = styled(BaseIcon)<CssProps>`
  background-image: url(/images/unactive_heart.png);
  ${(props) => css`
    width: ${props.width ?? "24px"};
    height: ${props.height ?? "24px"};
  `}
`;

export const RightMark = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  background-color: #fff;
  border: 2px solid rgba(28, 39, 51, 255);
  border-radius: 50%;
  padding: 0.3rem;
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 11px;
    height: 11px;
    border-top: 1.5px solid rgba(28, 39, 51, 255);
    border-right: 1.5px solid rgba(28, 39, 51, 255);
    transform: translate(-65%, -50%) rotate(45deg);
  }
`;

export const LeftMark = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  background-color: #fff;
  border: 2px solid rgba(28, 39, 51, 255);
  border-radius: 50%;
  padding: 0.3rem;
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 11px;
    height: 11px;
    border-top: 1.5px solid rgba(28, 39, 51, 255);
    border-left: 1.5px solid rgba(28, 39, 51, 255);
    transform: translate(-35%, -50%) rotate(315deg);
  }
`;
