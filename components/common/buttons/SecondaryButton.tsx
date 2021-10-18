import { NextPage } from "next";
import { MouseEventHandler } from "react";

type SecondaryProps = {
  text: string;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: string;
  disable?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

const SecondaryButton: NextPage<SecondaryProps> = ({
  text,
  icon,
  loading,
  disable,
  fullWidth = false,
  className,
  type = "button",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${
        fullWidth && "w-full"
      } py-3 px-6 font-semibold rounded-full border-2 transition-colors duration-300 ${
        disable
          ? "bg-gray-400 border-none cursor-not-allowed bg-opacity-75"
          : "border-main"
      }`}
    >
      {icon && <i className={`${icon} mr-2 text-main`} />}
      {loading && !disable && (
        <i className="fad fa-spinner-third mr-2 text-main animate-spin-button" />
      )}
      <span
        className={`${
          disable ? "text-gray-700" : "text-main"
        } whitespace-nowrap`}
      >
        {text}
      </span>
    </button>
  );
};

export default SecondaryButton;
