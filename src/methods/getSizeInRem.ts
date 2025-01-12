export const getSizeInRem = (size?: string | number) => {
    // 1/16=0.0625, $sizeInPx/16=$sizeInPx*0.0625

    return typeof size === "number" ? `${size * 0.0625}rem` : size;
};
