import { NextPage } from "next";
import React from "react";
import {
  useState,
  MouseEventHandler,
  useEffect,
  useRef,
  ChangeEvent,
} from "react";

export type options = {
  label: string;
  value: string;
};

interface SelectProps {
  options: options[];
  initialLabel: options;
  value?: options | undefined;
  onChange?: (option: options) => void;
}

const Select: NextPage<SelectProps> = ({
  options,
  initialLabel,
  value,
  onChange,
}) => {
  const [selected, setSelected] = useState<options | null>(null);
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const mainContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const clickOutside = () => {
      if (dropDownOpen) {
        setDropDownOpen(false);
      }
    };
    document.body.addEventListener("click", clickOutside);

    return () => {
      document.body.removeEventListener("click", clickOutside);
    };
  }, [dropDownOpen]);

  useEffect(() => {
    if (labelRef.current && mainContainer.current) {
      if (selected) {
        mainContainer.current.classList.remove("border");
        labelRef.current.classList.remove("translate-x-0");
        labelRef.current.classList.remove("translate-y-0");
        labelRef.current.classList.remove("scale-100");
        labelRef.current.classList.remove("text-gray-400");
        labelRef.current.classList.add("-translate-x-5");
        labelRef.current.classList.add("-translate-y-7");
        labelRef.current.classList.add("scale-80");
        labelRef.current.classList.add("text-main");
        mainContainer.current.classList.add("border-2");
      } else {
        mainContainer.current.classList.remove("border-2");
        labelRef.current.classList.remove("-translate-x-5");
        labelRef.current.classList.remove("-translate-y-7");
        labelRef.current.classList.remove("scale-80");
        labelRef.current.classList.remove("text-main");
        labelRef.current.classList.add("translate-x-0");
        labelRef.current.classList.add("translate-y-0");
        labelRef.current.classList.add("scale-100");
        labelRef.current.classList.add("text-gray-400");
        mainContainer.current.classList.add("border");
      }
    }
  }, [selected]);

  React.useEffect(() => {
    let isLoaded = true;

    if (isLoaded) {
      if (value && +value?.value > 0) {
        if (labelRef.current && mainContainer.current) {
          mainContainer.current.classList.remove("border");
          labelRef.current.classList.remove("translate-x-0");
          labelRef.current.classList.remove("translate-y-0");
          labelRef.current.classList.remove("scale-100");
          labelRef.current.classList.remove("text-gray-400");
          labelRef.current.classList.add("-translate-x-5");
          labelRef.current.classList.add("-translate-y-7");
          labelRef.current.classList.add("scale-80");
          labelRef.current.classList.add("text-main");
          mainContainer.current.classList.add("border-2");
        }
      }
    }

    return () => {
      isLoaded = false;
    };
  }, [value]);

  const renderOptions = options.map((x) => {
    return (
      <div
        key={x.value}
        data-value={x.value}
        className="px-4 py-3 text-main first:rounded-t-lg first:rouded-b-0  last:rounded-b-lg last:rouded-t-0  hover:bg-gray-200"
        onClick={() => {
          setSelected(x);
          onChange && onChange(x);
        }}
      >
        {x.label}
      </div>
    );
  });
  const toggleDropDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setDropDownOpen(!dropDownOpen);
  };

  return (
    <div
      className={`py-3 bg-white px-3 border-solid border-main font-poppins rounded-normal h-14 cursor-pointer relative ${
        !dropDownOpen && !selected ? "border" : "border-2"
      }`}
      onClick={toggleDropDown}
      ref={mainContainer}
    >
      <select className="hidden">
        {options.map((x) => {
          return <option key={x.value}>{x.label}</option>;
        })}
      </select>
      <i className="fas fa-sort-down absolute right-4 top-4 text-main" />
      <div className="font-medium text-xl text-main">
        <span
          className="text-gray-400 ml-1 px-1 translate-x-0 translate-y-0 scale-100 duration-300 transition-all absolute bg-white"
          ref={labelRef}
        >
          {initialLabel.label}
        </span>
        {value && (
          <span data-selected={value.value} className="text-xl text-main">
            {value.label}
          </span>
        )}
      </div>
      <div
        className={`absolute bg-white w-full left-0 z-20 top-16 shadow-lg border-2 border-main rounded-lg ${
          dropDownOpen ? "block" : "hidden"
        }`}
      >
        {renderOptions}
      </div>
    </div>
  );
};

export default Select;
