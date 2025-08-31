import React from "react";

interface CardProps {
  showStatus?: boolean;
  status?: boolean;
  toggle?: (prevState: boolean) => void;
  toggleStatus?: boolean;
  direction?: "row" | "column";
  icon?: string;
  title: string;
}

export const Card = ({
  showStatus,
  status,
  toggle,
  toggleStatus,
  title,
  direction = "column",
  icon,
}: CardProps) => {
  return (
    <div
      className={`bg-secondary p-5 rounded-md shadow-md w-full h-full flex ${
        direction === "row" ? "flex-row" : "flex-col"
      } gap-3 text-center relative`}
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
          className={`flex w-[80px] h-[40px] ${
            toggleStatus ? "bg-green-300/50" : "bg-red-300/50"
          } ${
            toggleStatus ? "justify-end" : "justify-start"
          } absolute top-1 right-1 rounded-full p-1 cursor-pointer transition-all duration-500`}
          onClick={() => toggle(toggleStatus!)}
        >
          <div className="w-[30px] h-[30px] bg-secondary rounded-full transition-all duration-500"></div>
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
