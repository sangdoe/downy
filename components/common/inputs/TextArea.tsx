import { NextPage } from "next";
import React from "react";
import { ChangeEvent, FocusEventHandler, useRef } from "react";

interface InputProps {
  label: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string | ReadonlyArray<string> | number | undefined;
}

const TextArea: NextPage<InputProps> = ({ label, onChange, value }) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    e.target.classList.remove("border");
    // e.target.classList.remove("border-gray-600");
    // e.target.classList.add("border-main");
    e.target.classList.add("border-2");
    //e.target.select();
    const span = e.target.nextSibling as HTMLSpanElement;
    span.classList.remove("scale-100");
    span.classList.remove("translate-x-0");
    span.classList.remove("translate-y-0");
    span.classList.remove("text-gray-400");
    span.classList.add("-translate-x-1");
    span.classList.add("-translate-y-6");
    span.classList.add("text-main");
    span.classList.add("scale-80");
  };
  const handleBlur: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    if (!e.target.value) {
      // e.target.classList.remove("border-main");
      e.target.classList.remove("border-2");
      e.target.classList.add("border");
      // e.target.classList.add("border-gray-600");
      const span = e.target.nextSibling as HTMLSpanElement;
      span.classList.remove("scale-80");
      span.classList.remove("text-main");
      span.classList.remove("-translate-y-6");
      span.classList.remove("-translate-x-1");
      span.classList.add("translate-x-0");
      span.classList.add("translate-y-0");
      span.classList.add("text-gray-400");
      span.classList.add("scale-100");
    }
  };

  React.useEffect(() => {
    let isLoaded = true;

    if (isLoaded) {
      if (value) {
        const e = inputRef.current;
        if (e) {
          e.classList.remove("border");
          e.classList.add("border-2");
          const span = e.nextSibling as HTMLSpanElement;
          span.classList.remove("scale-100");
          span.classList.remove("translate-x-0");
          span.classList.remove("translate-y-0");
          span.classList.remove("text-gray-400");
          span.classList.add("-translate-x-1");
          span.classList.add("-translate-y-6");
          span.classList.add("text-main");
          span.classList.add("scale-80");
        }
      }
    }

    return () => {
      isLoaded = false;
    };
  }, [value]);

  return (
    <div className="relative w-aute px-3 h-56">
      <textarea
        value={value}
        className="absolute focus:outline-none top-0 left-0 text-xl w-full h-full py-3 px-3 border border-solid border-main font-poppins text-main rounded-normal"
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        onChange={onChange}
      />
      <span
        className="absolute bg-white origin-left text-gray-400 text-xl transition-all translate-x-0 duration-300 scale-100 translate-y-0 px-1 top-3"
        onClick={() => inputRef.current?.focus()}
      >
        {label}
      </span>
    </div>
  );
};

export default TextArea;
