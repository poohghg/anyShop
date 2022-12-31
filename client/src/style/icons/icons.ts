import styled, { css } from "styled-components";

interface CssProps {
  width?: number;
  height?: number;
  withStyle?: { [key: string]: string };
}

type CssStyleProps = Omit<CssProps, "withStyle">;

const BaseIcon = styled.i`
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  vertical-align: middle;
  opacity: 1;
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
