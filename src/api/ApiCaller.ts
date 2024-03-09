import Api from "./Api";

export type ApiObjType = Record<string, string | undefined | number | string[] | number[]>;
interface GetFuncProp<T extends ApiObjType> {
  url: string;
  params: T | undefined;
}
export const getRequestParams = async <T extends ApiObjType, R>({ url, params }: GetFuncProp<T>) => {
  const response = await Api.get<R>(url, { params });

  const { data: availData } = response;

  return availData;
};
