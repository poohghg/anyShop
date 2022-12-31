import { createGlobalStyle } from "styled-components";
import NotoSansKRThin from "../assets/fonts/NotoSans/NotoSansKR-Thin.woff2";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {margin: 0;font-family: 'Noto Sans KR';}
  /* #root{overflow:hidden} */
  a {color: #fff; text-decoration: none; outline: none}
  a:hover, a:active {text-decoration: none; color:#fff; }
  ul {
    list-style:none ;
  }
  p {
    font-size:1rem ;
    color:#1B1D2A;
  }
  span {
    font-size:0.8rem ;
    color:#1B1D2A;
  }
  button {
    border-style: none;
    border: none;
    background: none;
  }

  h1{}
  h2{font-size:2.2rem;font-weight:700}
  h4{color:#000}

 /* 반응형 */
   /* @media only screen and (max-width: 844px) {
     html {
       font-size: 13px;
     }
   } */
`;

export default GlobalStyle;
