import { BaseApiParams, BaseResponseDataDto, IBaseQueryPArams, Prettify } from "@/@types/baseInterface";

export type GetCurrencyParamsData = Prettify<
  {
    currencies?: string;
  } & IBaseQueryPArams
>;

export type GetExchangeRateParamsData = Prettify<
  {
    base_currency: string;
    currencies?: string;
    change?: string;
  } & IBaseQueryPArams
>;

export type GetCurrencyParams = BaseApiParams<GetCurrencyParamsData>;

export type GetExchangeRateParams = BaseApiParams<GetExchangeRateParamsData>;

export type GetExchangeRateResponseData = Record<string, number>;

export type GetExchangeRateResponse = BaseResponseDataDto<GetExchangeRateResponseData>;

export type GetCurrencyItemResponseData = {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
};

export type GetCurrencyResponseData = Record<string, GetCurrencyItemResponseData>;

export type GetCurrencyResponse = BaseResponseDataDto<GetCurrencyResponseData>;
