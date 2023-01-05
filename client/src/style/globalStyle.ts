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
  .toast{
    position:fixed ;
    left:50% ;
    bottom:0 ;
    transform:translate(-50%,-50%) ;
    width: fit-content ;
    /* max-width:350px ; */
    opacity:0.85 ;
    /* padding:1rem */
    & div{  
      display:flex ;
      align-items:center ;
      justify-content:center ;
      font-size:0.9rem ;
      text-align:center !important ;
      /* padding: 0.5rem; */
    }
    .Toastify__toast-body > div:last-child{
      flex: none ;
    }
  }

 /* 반응형 */
   /* @media only screen and (max-width: 844px) {
     html {
       font-size: 13px;
     }
   } */
`;

export default GlobalStyle;
