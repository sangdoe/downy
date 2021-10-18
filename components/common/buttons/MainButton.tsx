import { NextPage } from "next";
import { MouseEventHandler } from "react";

type MainProps = {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: string;
  disable?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const MainButton: NextPage<MainProps> = ({
  text,
  icon,
  loading,
  disable,
  className,
  fullWidth = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${
        fullWidth && "w-full"
      } w-full py-3 px-6 font-semibold rounded-full transition-colors duration-300 ${
        disable
          ? "bg-gray-600 cursor-not-allowed bg-opacity-75"
          : "bg-main hover:bg-blue-800"
      }`}
    >
      {icon && <i className={`${icon} mr-2 text-white`} />}
      {loading && !disable && (
        <i className="fad fa-spinner-third mr-2 text-white animate-spin-button" />
      )}
      <span className="text-white">{text}</span>
    </button>
  );
};

export default MainButton;
