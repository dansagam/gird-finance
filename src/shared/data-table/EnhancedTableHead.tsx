import React from "react";
import Table from "./Table";
import { EnhancedTableHeadProps, RecursiveDataType } from "@/@types/tableInterface";
import { twMerge } from "tailwind-merge";
import { FaArrowUp } from "react-icons/fa";

function EnhancedTableHead<TField extends RecursiveDataType>(props: EnhancedTableHeadProps<TField>) {
  const { columns, onSort, stickyHead, checkValue, count } = props;
  const [sortIcon, setSortIcon] = React.useState(false);

  const handleSort = (property: string) => {
    const capitalizeKey = `${property.charAt(0).toUpperCase()}${property.slice(1)}`;
    return (event: React.MouseEvent<unknown>) => {
      if (onSort) {
        onSort(event, capitalizeKey);
      }
    };
  };

  // const handleFilter = (property: string) => {
  //   return (event: React.MouseEvent<unknown>) => {
  //     if (onFilter) {
  //       onFilter(event, property);
  //     }
  //   };
  // };

  // const handleCheckChange = (evt: React.ChangeEvent<HTMLInputElement>, values: string | number) => {
  //   if (Array.isArray(checkValue)) {
  //     if (values === "all") {
  //       if (checkValue.length === dataLength) {
  //         return [];
  //       }

  //       return allValues;
  //     }
  //   }
  //   return [];
  // };

  return (
    <Table.TableHead className={`${stickyHead && "sticky top-0"}`}>
      <Table.TableRow className=" bg-grey-50">
        {checkValue && (
          <Table.TableHeadCell key={`check-box-row-index`} className="whitespace-nowrap">
            {/* <Checkbox
              checked={allValues.length > 0 && allValues.length === checkValue.length}
              value="all"
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onCheckedChange) {
                  onCheckedChange(handleCheckChange(e, "all"));
                }
              }}
            /> */}
          </Table.TableHeadCell>
        )}
        {count && (
          <Table.TableHeadCell scope="col" key={`check-box-row-index`} className="whitespace-nowrap">
            #
          </Table.TableHeadCell>
        )}
        {columns.map((column, columnIndex) => {
          const { dataIndex, title, filter, sorter, renderFilter, className, headerClassName } = column;

          return (
            <Table.TableHeadCell
              key={`${dataIndex || columnIndex}-table-head-cell-${columnIndex}`}
              // width={column?.width}
              className={twMerge(` whitespace-nowrap font-bold`, className)}
              scope="col"
              onClick={(e) => {
                e.stopPropagation();
                if (sorter) {
                  handleSort(dataIndex)(e);
                  setSortIcon((prev) => !prev);
                }
              }}
            >
              <div className={twMerge("flex items-center", headerClassName)}>
                {title}
                {sorter && (
                  <FaArrowUp className={twMerge(" scale-75 text-neutral-border", sortIcon ? " rotate-180" : "")} />
                )}
                {filter && renderFilter}
              </div>
            </Table.TableHeadCell>
          );
        })}
      </Table.TableRow>
    </Table.TableHead>
  );
}

export default EnhancedTableHead;
