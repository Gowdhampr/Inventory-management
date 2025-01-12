import { css } from "styled-components";

export const flexCenter = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const cssReset = css`
    * {
        margin: 0;
        padding: 0;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
    }

    img,
    svg {
        display: block;
        max-width: 100%;
    }

    input,
    button,
    textarea,
    select {
        font: inherit;
    }
`;
