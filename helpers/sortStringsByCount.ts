export const sortStringsByCount = (array: string[]): string[] => {
    let obj = new Map();
    array.forEach((item) => obj.get(item) ? obj.set(item, obj.get(item) + 1) : obj.set(item, 1))
    return [...obj].sort((a, b) => b[1] - a[1]).map((item) => item[0]);
}
