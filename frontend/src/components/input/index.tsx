interface InputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
}: InputProps) => {
  return (
    <div className="flex flex-col p-3 ">
      {label && (
        <label htmlFor={id} className="mb-2 font-bold">
          {label}
        </label>
      )}
      <input
        id={id}
        name={id}
        className="border border-gray-300 p-2 rounded-md shadow-md"
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
