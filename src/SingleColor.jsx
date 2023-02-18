import React, { useState, useEffect } from "react";
import Tooltip from "./Tooltip";
import { classNames } from "./utils";

export default function SingleColor({ hex, rgb, weight }) {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (alert) {
      const id = setTimeout(() => {
        setAlert(false);
      }, 3000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [alert]);

  const handleClick = () => {
    setAlert(true);
    navigator.clipboard.writeText("#" + hex);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const brightnessWeight = [299, 587, 114];
  const brightness =
    brightnessWeight.reduce((acc, value, index) => acc + value * rgb[index]) /
    1000;

  return (
    <div className="relative aspect-[2/1]">
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={classNames(
          "flex h-full cursor-pointer flex-col items-center justify-center outline-0 ring-inset ring-blue-500/80 focus:ring-2",
          brightness > 128 ? "text-slate-800" : "text-slate-100"
        )}
        style={{ backgroundColor: "#" + hex }}
      >
        <p>{weight}%</p>
        <p>{"#" + hex}</p>
      </div>
      <Tooltip alert={alert} />
    </div>
  );
}
