export const convertData = (data: string): string => {
  return data.slice(0, 10).split('-').reverse().join('.');
}
