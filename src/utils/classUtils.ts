import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function classVariable(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
