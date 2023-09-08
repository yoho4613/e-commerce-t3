export const getAverage = (arr: number[]) => {
  const total = arr.reduce((acc, next) => acc += next, 0);
  const average = total / arr.length;
  return average
};
