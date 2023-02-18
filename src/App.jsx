import React, { useRef, useState } from "react";
import Values from "values.js";
import SingleColor from "./SingleColor";
import { classNames, toKebabCase } from "./utils";

export default function App() {
  const [text, setText] = useState("#f15025");
  const [color, setColor] = useState(text);
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values(color).all(10));
  const textInputRef = useRef(null);

  const handleTextBlur = (e) => {
    let value = e.target.value;

    if (CSS.supports("color", value)) {
      if (value.startsWith("#")) {
        switch (value.length) {
          case 5:
            value = value.slice(0, 4);
          /* eslint-disable-next-line no-fallthrough */
          case 4:
            value =
              value[0] +
              value[1] +
              value[1] +
              value[2] +
              value[2] +
              value[3] +
              value[3];
            break;
          case 9: {
            value = value.slice(0, 7);
            break;
          }
        }
        e.target.value = value;
        setText(value);
        setColor(value);
        setError(false);
      } else if (value.match(/^([Rr][Gg][Bb]|[Hh][Ss][Ll])/)) {
        const temp = value
          .split(/[\t (),/]/)
          .filter((x) => x !== "")
          .slice(0, 4);
        value =
          temp[0].slice(0, 3).toLowerCase() +
          "(" +
          temp[1] +
          "," +
          temp[2] +
          "," +
          temp[3] +
          ")";
        e.target.value = value;
        setText(value);
        setColor("#" + new Values(value).hex);
        setError(false);
      } else {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  const handleColorChange = (e) => {
    setText(e.target.value);
    textInputRef.current.value = e.target.value;
    setColor(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!error) {
      let colors = new Values(color).all(10);
      setList(colors);
    }
  };

  return (
    <main className="flex min-h-screen flex-col gap-4 bg-slate-100 px-4 py-8 text-slate-800 sm:px-8">
      <section className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
        <h1 className="text-xl font-bold tracking-wider sm:text-2xl">
          Color Generator
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 sm:flex-row sm:text-lg"
        >
          <div className="flex">
            <input
              type="text"
              ref={textInputRef}
              defaultValue={color}
              onBlur={handleTextBlur}
              className={classNames(
                "w-44 rounded-l-full py-1.5 pl-2.5 outline-0 ring-inset",
                "sm:w-60 sm:py-2 sm:pl-3.5",
                "focus:ring-2",
                error && "ring-2 ring-red-500/50"
              )}
            />
            <input
              type="color"
              value={color}
              onChange={handleColorChange}
              className={classNames(
                "h-9 w-9 select-none appearance-none rounded-r-full bg-white p-[4.5px] outline-0",
                "sm:h-11 sm:w-11 sm:p-[5.5px]",
                "focus:ring-2 focus:ring-inset",
                "color-swatch:rounded-full color-swatch:border-none color-swatch-wrapper:p-0"
              )}
            />
          </div>
          <button
            type="submit"
            className={classNames(
              "rounded-full bg-blue-500 py-1.5 px-3.5 text-white outline-0 transition duration-200",
              "hover:bg-blue-600 focus:bg-blue-600 focus:ring-2"
            )}
          >
            Submit
          </button>
        </form>
      </section>
      <section className="flex flex-col gap-4">
        {["tint", "shade"].map((type, index, array) => (
          <div
            key={type}
            className="flex flex-col items-center gap-4 md:items-start"
          >
            <h2 className="font-bold sm:text-xl">{toKebabCase(type) + "s"}</h2>
            <div className="grid w-full grid-cols-2 gap-y-9 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
              {list
                .filter(
                  (color) => color.type !== array[array.length - 1 - index]
                )
                .map((color) => {
                  const { hex, rgb, weight } = color;
                  return (
                    <SingleColor
                      key={hex}
                      hex={hex}
                      rgb={rgb}
                      weight={weight}
                    />
                  );
                })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
