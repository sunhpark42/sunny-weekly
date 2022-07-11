import { createGlobalStyle } from "styled-components";
import resetStyles from "./resetStyles";

export default createGlobalStyle`
    ${resetStyles}

    html, body {
        background-color: #f5f5f5;
    }

    body {
        padding-top: 48px;
    }

    * {
        box-sizing: border-box;
    }

    button {
        cursor: pointer;
    }
`;
