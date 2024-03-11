import React from "react";
import Table from "./Table";
import {
  DataSourceObjType,
  DataTableColumnType,
  DataTableProps,
  OrderType,
  RecursiveDataType,
} from "@/@types/tableInterface";
import { isString } from "lodash";
import CircularProgress from "../CircularProgress";
import EnhancedTableHead from "./EnhancedTableHead";
// import { isNumber } from "@/helpers/typeGuard";
import { format, isValid } from "date-fns";
import TablePagination from "./TablePagination";

export type SortOrderType = {
  ASC: "asc";
  DESC: "desc";
  DEFAULT: boolean;
};

export const SortOrder: SortOrderType = {
  ASC: "asc",
  DESC: "desc",
  DEFAULT: false,
};
function DataTable<TField extends RecursiveDataType>(props: DataTableProps<TField>) {
  const {
    dataSource,
    columns,
    setTableParams,
    tableParams,
    onRowClick,
    stickyFooter,
    stickyHeader,
    loading,
    emptyState,
    handleFilter,
    title,
    count,
  } = props;

  const allValues = dataSource.map((option, idx) => {
    if (isString(option?.id)) {
      return option?.id;
    } else {
      return idx;
    }
  });
  const [order, setOrder] = React.useState<OrderType>(() => {
    if (tableParams.sort?.startsWith("+")) {
      return SortOrder.ASC;
    }
    if (tableParams.sort?.startsWith("-")) {
      return SortOrder.DESC;
    }
    return SortOrder.DESC;
  });

  const [orderBy, setOrderBy] = React.useState<string>(tableParams.sort?.slice(1) || "");
  type SortMapper = {
    asc: "+";
    desc: "-";
  };
  const sortMapping: SortMapper = {
    asc: "+",
    desc: "-",
  };

  const renderCellData = (
    column: DataTableColumnType<TField>,
    row: DataSourceObjType<TField>,
    index: number,
    _onClick?: (_row: RecursiveDataType, _col: DataSourceObjType<TField>) => void
  ): React.ReactNode => {
    const dataValue = row[column?.dataIndex];
    // type ff = keyof DataSourceObjType
    if (column.dataIndex === "date") return isValid(row?.updatedAt) ? "" : format(new Date(), "Pp"); // Pp
    if (column.render) return column.render(dataValue, row, index);
    if (typeof dataValue === "string" || typeof dataValue === "number") {
      return <div>{`${dataValue}`}</div>;
    }
    if (dataValue instanceof Date) {
      return <div className="m-o">{`${format(dataValue ? new Date(dataValue) : new Date(), "dd/MMM/yyyy")}`}</div>;
    }
    return "-";
  };

  const handleSort = (_e: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === SortOrder.ASC;
    const changeOrder = isAsc ? SortOrder.DESC : SortOrder.ASC;
    setOrder(changeOrder);
    setOrderBy(property);
    setTableParams({
      ...tableParams,
      sort: changeOrder ? `${sortMapping[changeOrder]}${property}` : "",
    });
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    tableParams?.pagination?.pageNumber > 0
      ? Math.max(
          0,
          (1 + tableParams.pagination.pageNumber) * tableParams.pagination.pageSize - tableParams.pagination.total
        )
      : 0;

  const renderDataItems = () => {
    return dataSource?.map((row, rowIndex) => {
      // const key = dataKeys()[rowIndex];
      // const rowId = isString(row?.id) || isNumber(row?.id) ? row.id : rowIndex;
      if (row) {
        return (
          <Table.TableRow
            key={`${row?.id}-${rowIndex}-table-body`}
            onClick={(e) => {
              e.stopPropagation();
              if (onRowClick) {
                onRowClick(row);
              }
            }}
          >
            {/* {memorisedCheckedValue && (
              <Table.TableCell
                key={`${rowId}-${rowIndex}`}
                className="whitespace-nowrap"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <Checkbox
                  checked={memorisedCheckedValue.includes(rowId)}
                  value={rowId}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setMemorisedCheckedValue(handleCheckChange(e, rowId));
                    // if (onCheckedChange) {
                    //   onCheckedChange(handleCheckChange(e, rowId));
                    // }
                  }}
                />
              </Table.TableCell>
            )} */}
            {count && <Table.TableCell className="whitespace-nowrap">{rowIndex + 1}</Table.TableCell>}
            {columns?.map((column, columnIndex) => (
              <Table.TableCell
                width={column?.width}
                key={`${column.dataIndex}-${columnIndex}`}
                className="whitespace-nowrap"
              >
                {renderCellData(column, row, rowIndex, column?.onMenuClick)}
              </Table.TableCell>
            ))}
          </Table.TableRow>
        );
      }
    });
  };

  const handleRowPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageSize: +event.target.value,
        pageNumber: 0,
      },
    }));
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageNumber: newPage,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-3">
      {title && <h3 className=" text-[#A4A7B7] text-base font-normal">{title}</h3>}
      <div className="border border-[#A4A7B7]/40 border-opacity-40 shadow-lg rounded">
        <div className="inline-block min-w-full py-1">
          <div className="">
            <Table.Container>
              <Table className=" relative">
                <EnhancedTableHead
                  columns={columns}
                  order={order}
                  orderBy={orderBy}
                  stickyHead={stickyHeader}
                  allValues={allValues}
                  dataLength={dataSource.length}
                  onSort={handleSort}
                  onFilter={handleFilter}
                  count={count}
                />
                {dataSource.length > 0 ? (
                  <>
                    <Table.TableBody>
                      {loading ? (
                        <>
                          <Table.TableRow>
                            <Table.TableCell colSpan={columns?.length || 1}>
                              <div className="grid items-center place-items-center p-4">
                                <CircularProgress />
                              </div>
                            </Table.TableCell>
                          </Table.TableRow>
                        </>
                      ) : (
                        <>
                          {renderDataItems()}
                          {emptyRows > 0 && (
                            <Table.TableRow style={{ height: 53 * emptyRows }}>
                              <Table.TableCell colSpan={columns?.length || 1} />
                            </Table.TableRow>
                          )}
                        </>
                      )}
                    </Table.TableBody>
                  </>
                ) : (
                  <>
                    <Table.TableBody>
                      {loading ? (
                        <>
                          <Table.TableRow style={{ height: 53 * emptyRows }}>
                            <Table.TableCell colSpan={columns?.length || 1}>
                              <div className="grid items-center place-items-center p-4">
                                <CircularProgress size={60} />
                              </div>
                            </Table.TableCell>
                          </Table.TableRow>
                        </>
                      ) : (
                        <Table.TableRow style={{ height: 53 * emptyRows }}>
                          <Table.TableCell colSpan={columns?.length || 1}>
                            <div className="m-0 flex justify-center">{emptyState}</div>
                          </Table.TableCell>
                        </Table.TableRow>
                      )}
                    </Table.TableBody>
                  </>
                )}
              </Table>
            </Table.Container>

            <TablePagination
              count={tableParams?.pagination.total || dataSource?.length || 0}
              // rowsPerPageOptions={[5, 10, { label: "all", value: "All" }]}
              rowsPerPageOptions={[5, 10, 20, 40]}
              rowsPerPage={tableParams.pagination.pageSize}
              page={tableParams.pagination.pageNumber}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowPerPageChange}
              colSpan={columns?.length}
              stickyFooter={stickyFooter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
