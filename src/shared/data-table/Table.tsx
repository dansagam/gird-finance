import { RefType } from "@/@types/baseInterface";
import { classVariable } from "@/utils/classUtils";
import React from "react";

type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
type TableBodyProps = React.TableHTMLAttributes<HTMLTableSectionElement>;
type TableHeadProps = React.TableHTMLAttributes<HTMLTableSectionElement>;
type TableHeadCellProps = React.ThHTMLAttributes<HTMLTableCellElement>;
type TableRowProps = React.TableHTMLAttributes<HTMLTableRowElement>;
type TableFooterProps = React.TableHTMLAttributes<HTMLTableSectionElement>;
type TableContainerProps = React.HTMLAttributes<HTMLDivElement>;

type ComposeTableProps = RefType<HTMLTableElement, TableProps> & {
  TableRow: RefType<HTMLTableRowElement, TableRowProps>;
  TableCell: RefType<HTMLTableCellElement, TableCellProps>;
  TableBody: RefType<HTMLTableSectionElement, TableBodyProps>;
  TableHead: RefType<HTMLTableSectionElement, TableHeadProps>;
  TableHeadCell: RefType<HTMLTableCellElement, TableHeadCellProps>;
  TableFooter: RefType<HTMLTableSectionElement, TableFooterProps>;
  Container: RefType<HTMLDivElement, TableContainerProps>;
};
// @ts-ignore
const Table: ComposeTableProps = React.forwardRef<HTMLTableElement, TableProps>(function (
  { children, className, ...rest },
  ref
) {
  return (
    <table
      ref={ref}
      className={classVariable(
        " bg-white text-black relative dark:text-slate-900 min-w-full table-border-spacing ",
        className
      )}
      {...rest}
    >
      {children}
    </table>
  );
});
Table.TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(function (
  { children, className, ...rest },
  ref
) {
  return (
    <tbody
      ref={ref}
      className={classVariable("text-text-main text-base font-medium, dark:text-slate-900", className)}
      {...rest}
    >
      {children}
    </tbody>
  );
});
Table.TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(function (
  { children, className, ...rest },
  ref
) {
  return (
    <td
      ref={ref}
      className={classVariable(
        " bg-transparent text-black dark:text-slate-900 py-3 px-2 first:px-3 last:px-3",
        className
      )}
      {...rest}
    >
      {children}
    </td>
  );
});
Table.TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(function (
  { children, className, ...rest },
  ref
) {
  return (
    <tfoot
      ref={ref}
      className={classVariable("bg-white text-black dark:text-slate-900 hover:bg-slate-700 ", className)}
      {...rest}
    >
      {children}
    </tfoot>
  );
});
Table.TableHead = React.forwardRef<HTMLTableSectionElement, TableHeadProps>(function (
  { children, className, ...rest },
  ref
) {
  return (
    <thead
      ref={ref}
      className={classVariable(
        "bg-white text-grey-50 dark:text-slate-900 hover:bg-slate-700 font-medium capitalize",
        className
      )}
      {...rest}
    >
      {children}
    </thead>
  );
});

Table.TableHeadCell = React.forwardRef<HTMLTableCellElement, TableHeadCellProps>(function (
  { children, className, ...rest },
  ref
) {
  return (
    <th
      ref={ref}
      className={classVariable("bg-white py-3 px-2 text-sm !text-grey-500 dark:text-slate-900", className)}
      {...rest}
    >
      {children}
    </th>
  );
});

Table.TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(function ({ children, className, ...rest }, ref) {
  return (
    <tr
      ref={ref}
      className={classVariable(
        "bg-white dark:text-slate-900 py-3 text-base hover:bg-grey-50 hover:bg-opacity-40 cursor-pointer mb-1 border-b  ",
        className
      )}
      {...rest}
    >
      {children}
    </tr>
  );
});
Table.Container = React.forwardRef<HTMLDivElement, TableContainerProps>(function (
  { children, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={classVariable(
        "grid bg-white relative  py-2 px-2 rounded dark:text-slate-900  min-w-full overflow-y-auto ",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Table.displayName = "Table";

export default Table;
