interface ActionButtonProps {
  icon: string;
  submit?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ActionButton = ({
  icon,
  submit,
  onClick,
  className,
}: ActionButtonProps) => {
  return (
    <div className={`absolute right-2 top-2 w-[50px] h-[50px] ${className}`}>
      <div className="shadow-md bg-secondary justify-center items-center flex rounded-md w-full h-full">
        <button type={submit ? "submit" : "button"} onClick={onClick}>
          <i className={`fa-solid fa-${icon}`} />
        </button>
      </div>
    </div>
  );
};
