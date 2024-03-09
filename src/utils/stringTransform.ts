export const underscoreRemove = (str: string): string => {
  return str?.replace(/_/g, " ");
};

export const capitalizeFirstChar = (str: string): string => {
  if (str) {
    const arr = [...str];
    arr[0] = arr[0].toUpperCase();
    return arr.join("");
  }
  return "";
};
