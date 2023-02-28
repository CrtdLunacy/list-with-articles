export const convertDate = (data: string): string => {
  return data.slice(0, 10).split('-').reverse().join('.');
}
