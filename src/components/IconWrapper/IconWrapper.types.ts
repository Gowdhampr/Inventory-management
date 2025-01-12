import { CSSObject, CSSProperties } from "styled-components";

export interface IconWrapperProps {
    id?: string;
    title?: string;
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
    onClick?: () => void;
    svgfillcolor?: CSSObject["color"];
    strokeColor?: CSSObject["color"];
    children?: React.ReactNode;
}
