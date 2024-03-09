import { capitalizeFirstChar } from "./stringTransform";

export type ParseQueryParams = Record<string | symbol | number, string | string[] | boolean>;
export type ParseQueryParamsOptions = {
  capitalizeKeysFirstChar?: boolean;
};

export const parseQueryParams = (
  queryParams: ParseQueryParams,
  options?: ParseQueryParamsOptions
) => {
  const params = new URLSearchParams();
  Object.keys(queryParams).forEach((key) => {
    const queryParamsKeyValue = queryParams[key];
    const paramKey = options?.capitalizeKeysFirstChar ? capitalizeFirstChar(key) : key;
    if (queryParamsKeyValue instanceof Array) {
      queryParamsKeyValue.forEach((item: any) => {
        params.append(`${paramKey}`, item);
      });
    } else {
      if (typeof queryParamsKeyValue === "boolean") {
        params.set(paramKey, `${queryParamsKeyValue}`);
      } else if (queryParamsKeyValue) {
        params.set(paramKey, queryParamsKeyValue);
      }
    }
  });
  return params;
};
