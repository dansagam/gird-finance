import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { ITablePaginationProps } from "@/@types/tableInterface";

const TablePagination = (props: ITablePaginationProps) => {
  const { count, page, onPageChange, onRowsPerPageChange, rowsPerPageOptions, rowsPerPage, stickyFooter } = props;

  const handleNextClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(evt, page + 1);
  };

  const handlePrevClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(evt, page - 1);
  };

  const getTotalData = () => {
    if (count === 0) return 0;
    if (count - (page + 1) * rowsPerPage > 0 || count - (page + 1) * rowsPerPage === 0) {
      return (page + 1) * rowsPerPage;
    }
    return count;
    // return page * rowsPerPage + ((page + 1) * rowsPerPage - count);
  };
  return (
    <div
      data-testid="shared-table-pagination"
      className={twMerge(
        "bg-neutral-white px-2 first:px-3 last:px-3 py-3  w-screen sm:w-full",
        stickyFooter && " sticky bottom-0"
      )}
    >
      <div className="flex justify-end items-center gap-4 ">
        <div className="flex items-center justify-end">
          <div className=" whitespace-nowrap">Rows per page:</div>
          <div className="relative">
            <select
              onChange={(e) => {
                onRowsPerPageChange(e);
              }}
              value={rowsPerPage}
              className="border-0 p-0"
            >
              {rowsPerPageOptions.map((row, index) => (
                <option
                  key={`${index}-list-select`}
                  value={typeof row === "string" || typeof row === "number" ? `${row}` : row?.value}
                >
                  {typeof row === "string" || typeof row === "number" ? `${row}` : row?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <span>{`${count === 0 ? 0 : page * rowsPerPage + 1} - ${getTotalData()} of ${count}`}</span>
        </div>
        <div className=" grid grid-cols-2 gap-2">
          <button onClick={handlePrevClick} className="  disabled:hidden" disabled={page === 0} aria-label="back page">
            <IoIosArrowBack />
          </button>
          <button
            onClick={handleNextClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
            className="  disabled:hidden"
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
    </div>
  );
};

TablePagination.defaultProps = {};

export default TablePagination;
