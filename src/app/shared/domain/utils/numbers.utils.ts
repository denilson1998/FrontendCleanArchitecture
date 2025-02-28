export function roundToTwoDecimals(value: number) {
    if (typeof value !== 'number') {
        value = Number(value)
    }
    return Math.round((value + Number.EPSILON) * 100) / 100;
}
