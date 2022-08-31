import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    html {
        font-size: 16px;
    }
    body {
        font-family: 'Open Sans', sans-serif;
        line-height: 1.5;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default GlobalStyle;
