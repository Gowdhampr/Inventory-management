import styled, { css } from "styled-components";
import { cssReset, flexCenter } from "../../mixins";
import { IconWrapperProps } from "./IconWrapper.types";
import { getSizeInRem } from "../../methods/getSizeInRem";

export const StyledIconWrapper = styled.div<Partial<IconWrapperProps>>`
    ${cssReset}
    ${flexCenter}
    display: inline-flex;
    min-width: fit-content;
    ${({ onClick }) =>
        onClick
            ? css`
                  cursor: pointer;
              `
            : ""}
    img,
    svg {
        ${({ height, width, onClick }) => {
            return css`
                height: ${getSizeInRem(height)};
                width: ${getSizeInRem(width)};
                cursor: ${!!onClick ? "pointer" : "inherit"};
            `;
        }}
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        object-position: center;
    }

    ${({ svgfillcolor }) =>
        svgfillcolor
            ? css`
                  svg,
                  svg path {
                      fill: ${svgfillcolor};
                  }
              `
            : ""}

    ${({ strokeColor }) =>
        strokeColor
            ? css`
                  svg,
                  svg path {
                      stroke: ${strokeColor};
                  }
              `
            : ""}
`;
