export interface DropdownProps {
  value: string;
  options: any;
  addEmptyOption?: boolean;
  className?: string;
  id?: string;
  label?: string;
  onChange?: (e: any) => void;
  mapOptions?: (option: any) => any;
}

export const Dropdown = ({
  className,
  id,
  label,
  onChange,
  value,
  options,
  mapOptions,
  addEmptyOption,
}: DropdownProps) => {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-bold mb-1">
          {label}
        </label>
      )}
      <select
        id={id}
        name={id}
        className="mt-1 shadow-md sm:text-sm border-gray-300 rounded-md p-2 w-full"
        onChange={onChange}
        value={value}
      >
        {addEmptyOption && (
          <option value="" key="none">
            None
          </option>
        )}

        {options?.map((singleOption: any) => {
          const option = mapOptions?.(singleOption) ?? singleOption;
          return (
            <option value={option.value} key={option.key}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
