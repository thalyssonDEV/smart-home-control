interface ActionButtonProps {
  icon: string;
}

export const ActionButton = ({ icon }: ActionButtonProps) => {
  return (
    <div className="shadow-md bg-secondary justify-center items-center flex rounded-md w-full h-full">
      <button>
        <i className={`fa-solid fa-${icon}`} />
      </button>
    </div>
  );
};
