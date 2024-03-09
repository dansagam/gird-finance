/// <reference types="vite-plugin-svgr/client" />
/* eslint-disable no-unused-vars */
import * as React from "react";
declare module "react" {
  // interface HTMLProps<T> {
  //   block?: string;
  //   element?: string;
  //   modifiers?: string;
  // }
  interface HTMLAttributes<T> {
    "data-app-active"?: boolean;
    "data-app-disabled"?: boolean;
    "data-app-error"?: boolean;
    "data-app-indeterminate"?: boolean;
    "data-app-focus"?: boolean;
  }
}

type TYear = `${number}${number}${number}${number}`;
type TMonth = `${number}${number}`;
type TDay = `${number}${number}`;
type THours = `${number}${number}`;
type TMinutes = `${number}${number}`;
type TSeconds = `${number}${number}`;
type TMilliseconds = `${number}${number}${number}`;

type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

/**
 * Represent a string like `14:42:34.678`
 */
type TDateISOTime = `${THours}:${TMinutes}:${TSeconds}.${TMilliseconds}`;
type TDateISO = `${TDateISODate}T${TDateISOTime}Z`;

// In TS, interfaces are "open" and can be extended
// eslint-disable-next-line no-unused-vars
interface Date {
  /**
   * Give a more precise return type to the method `toISOString()`:
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
   */
  toISOString(): TDateISO;
}
