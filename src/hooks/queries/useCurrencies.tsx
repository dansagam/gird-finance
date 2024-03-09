import { getRequestParams } from "@/api/ApiCaller";
import {
  GetCurrencyParams,
  GetCurrencyResponse,
  GetExchangeRateParams,
  GetExchangeRateResponse,
} from "@/api/dto/currencies/currencies.dto";
import { BASE_ENV } from "@/api/envFile";
import { ParseQueryParams, parseQueryParams } from "@/utils/parseQueryParam";
import { useQuery } from "@tanstack/react-query";

type UseGetExchangeRateProps = {} & GetExchangeRateParams;

export const useGetExchangeRate = (props: UseGetExchangeRateProps) => {
  const { params } = props;
  params.apikey = BASE_ENV.apiKey;
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["useGetExchangeRate", { params: params.change }],
    queryFn: () =>
      getRequestParams<GetExchangeRateParams["params"], GetExchangeRateResponse>({
        params: parseQueryParams({
          ...params,
          apikey: BASE_ENV.apiKey,
        } as unknown as ParseQueryParams) as unknown as GetExchangeRateParams["params"],
        url: "latest",
      }),
  });

  return {
    exchangeRate: data?.data,
    fetchingRate: isLoading,
    isSuccess,
  };
};

type UseGetCurrenciesProps = {} & GetCurrencyParams;

export const useGetCurrencies = (props: UseGetCurrenciesProps) => {
  const { params } = props;
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["useGetCurrencies", { params }],
    queryFn: () =>
      getRequestParams<GetCurrencyParams["params"], GetCurrencyResponse>({
        params: parseQueryParams({
          ...params,
          apikey: BASE_ENV.apiKey,
        } as unknown as ParseQueryParams) as unknown as GetCurrencyParams["params"],
        url: "currencies",
      }),
  });
  const currency = Object.entries(data?.data || {}).map((el) => el[1]) || [];

  return {
    currencies: currency,
    fetchingCurrencies: isLoading,
    isSuccess,
  };
};
