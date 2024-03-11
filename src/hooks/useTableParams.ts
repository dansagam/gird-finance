import React from "react";
import _isEmpty from "lodash/isEmpty";
import { ITableMeta, ITablePagination, ITablePaginationFunction } from "@/@types/tableInterface";
const useTableParams = () => {
  const [tableParams, setTableParams] = React.useState<ITablePagination>({
    search: "",
    sort: "-createdAt",
    pagination: {
      pageNumber: 0,
      pageSize: 10,
      total: 0,
      totalPage: 1,
    },
  });

  return {
    tableParams,
    setTableParams,
  };
};

// just to test the changes

export default useTableParams;

export const useHandleTableRemoteChange = ({
  setTableParams,
  isSuccess,
  meta,
}: {
  setTableParams?: ITablePaginationFunction;
  isSuccess?: boolean;
} & ITableMeta) => {
  React.useEffect(() => {
    if (isSuccess && meta) {
      if (setTableParams) {
        setTableParams((prev) => ({
          ...prev,
          pagination: {
            ...prev.pagination,
            total: meta?.count || 0,
            totalPage: meta?.count || 1,
          },
        }));
      }
    }
  }, [isSuccess]);

  const handleTableRemoteChange = React.useCallback(
    ({ meta }: ITableMeta) => {
      if (isSuccess) {
        if (setTableParams) {
          setTableParams((prev) => ({
            ...prev,
            pagination: {
              ...prev.pagination,
              total: meta?.count || 0,
              totalPage: meta?.count || 1,
            },
          }));
        }
      }
    },
    [isSuccess]
  );

  return {
    handleTableRemoteChange,
  };
};

export const useTableHeaderState = () => {
  const [checkedValue, setCheckedValue] = React.useState<(string | number)[]>([]);

  const handleTableCheckedChange = (values: (string | number)[]) => {
    setCheckedValue(values);
  };

  return {
    handleTableCheckedChange,
    checkedValue,
  };
};
