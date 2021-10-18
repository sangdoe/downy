import { NextPage } from "next";
import { MouseEventHandler } from "react";

type ExtraProps = {
  text: string;
  icon?: string;
  disable?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const ExtraButton: NextPage<ExtraProps> = ({
  text,
  icon,
  loading,
  disable,
  type,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} py-2 px-3 ipad:py-3 ipad:px-5 font-semibold rounded-full transition-colors duration-300 ${
        disable
          ? "bg-gray-600 cursor-not-allowed bg-opacity-75"
          : "bg-red-600 hover:bg-red-800"
      }`}
    >
      {icon && <i className={`${icon} mr-2 text-white`} />}
      {loading && !disable && (
        <i className="fad fa-spinner-third mr-2 text-white animate-spin-button" />
      )}
      <span className="text-white text-sm ipad:text-base desktop:text-lg whitespace-nowrap">
        {text}
      </span>
    </button>
  );
};

export default ExtraButton;
