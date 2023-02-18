import React from "react";
import { classNames } from "./utils";

export default function Tooltip({ alert }) {
  return (
    <div
      className={classNames(
        "absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[125%] select-none rounded-lg border border-blue-400 bg-blue-400 py-1 px-2 text-xs text-slate-100 transition duration-200",
        "after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:border-transparent after:border-t-blue-400",
        alert ? "opacity-100" : "opacity-0"
      )}
    >
      Copied
    </div>
  );
}
