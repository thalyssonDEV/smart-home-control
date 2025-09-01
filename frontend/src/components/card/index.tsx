import React from "react";

interface CardProps {
  showStatus?: boolean;
  status?: boolean;
  toggle?: (e: any) => void;
  toggleStatus?: boolean;
  toggleSize?: "lg" | "md" | "sm";
  direction?: "row" | "column";
  icon?: string;
  title: string;
  className?: string;
}

export const Card = ({
  showStatus,
  status,
  toggle,
  toggleStatus,
  toggleSize,
  title,
  direction = "column",
  icon,
  className,
}: CardProps) => {
  return (
    <div
      className={`bg-secondary p-5 rounded-md shadow-md w-full h-full flex ${
        direction === "row" ? "flex-row" : "flex-col"
      } gap-3 text-center relative ${className}`}
    >
      {showStatus && (
        <div
          className={`absolute bottom-1 right-1 w-5 h-5 rounded-full ${
            status ? "bg-green-400" : "bg-red-400"
          }`}
        ></div>
      )}

      {toggle && (
        <div
          className={`flex ${
            toggleSize === "lg"
              ? "w-20 h-10"
              : toggleSize === "md"
              ? "w-16 h-8"
              : "w-12 h-6"
          } ${toggleStatus ? "bg-green-300/50" : "bg-red-300/50"} ${
            toggleStatus ? "justify-end" : "justify-start"
          } absolute top-1 right-1 rounded-full p-1 cursor-pointer transition-all duration-500 items-center`}
          onClick={toggle}
        >
          <div
            className={`${
              toggleSize === "lg"
                ? "w-8 h-8"
                : toggleSize === "md"
                ? "w-6 h-6"
                : "w-5 h-5"
            } bg-secondary rounded-full transition-all duration-500`}
          ></div>
        </div>
      )}

      {icon && (
        <div
          className={`flex justify-center items-center bg-primary p-4 rounded-md ${
            direction === "row" ? "w-1/4" : "w-full"
          }`}
        >
          <i className={`fa-solid ${icon} text-2xl`}></i>
        </div>
      )}
      <p>{title}</p>
    </div>
  );
};
