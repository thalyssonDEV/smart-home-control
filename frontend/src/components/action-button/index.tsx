interface ActionButtonProps {
  icon: string;
  submit?: boolean;
  onClick?: () => void;
}

export const ActionButton = ({ icon, submit, onClick }: ActionButtonProps) => {
  return (
    <div className="absolute right-2 top-2 w-[50px] h-[50px]">
      <div className="shadow-md bg-secondary justify-center items-center flex rounded-md w-full h-full">
        <button type={submit ? "submit" : "button"} onClick={onClick}>
          <i className={`fa-solid fa-${icon}`} />
        </button>
      </div>
    </div>
  );
};
