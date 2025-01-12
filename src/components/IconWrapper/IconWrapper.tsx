import React, { forwardRef } from "react";
import { IconWrapperProps } from "./IconWrapper.types";
import { StyledIconWrapper } from "./IconWrapper.styles";

const IconWrapper = forwardRef<HTMLDivElement, IconWrapperProps>(
    (props: IconWrapperProps, ref) => {
        const {
            children,
            id,
            title,
            height,
            width,
            onClick,
            svgfillcolor,
            strokeColor,
        } = props;

        return (
            <StyledIconWrapper
                title={title}
                id={id}
                height={height}
                width={width}
                onClick={onClick}
                svgfillcolor={svgfillcolor}
                strokeColor={strokeColor}
            >
                {children}
            </StyledIconWrapper>
        );
    }
);

export default IconWrapper;
