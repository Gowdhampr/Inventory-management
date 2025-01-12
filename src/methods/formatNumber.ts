export function formatNumber(number) {
    return new Intl.NumberFormat("en-IN").format(number);
}
