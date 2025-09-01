interface IconSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const IconSelector = ({ value, onChange }: IconSelectorProps) => {
  return (
    <div>
      <h2 className="text-center text-xl font-bold">Selecione um Ícone</h2>
      <div className="grid grid-cols-5 gap-4 mt-4 p-4">
        {iconsMock.map((icon) => {
          const isSelected = value === icon.value;
          return (
            <div
              key={icon.value}
              className={`flex flex-col items-center p-4 rounded-md cursor-pointer transition-all 
                ${
                  isSelected
                    ? "bg-primary text-white"
                    : "bg-secondary hover:bg-primary hover:text-white"
                }`}
              onClick={() => onChange(icon.value)}
            >
              <i className={`fa-solid ${icon.value} text-2xl mb-1`}></i>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const iconsMock = [
  {
    value: "fa-couch",
  },
  {
    value: "fa-bed",
  },
  {
    value: "fa-utensils",
  },
  {
    value: "fa-toilet",
  },
  {
    value: "fa-warehouse",
  },
  {
    value: "fa-laptop-house",
  },
  {
    value: "fa-lightbulb",
  },
  {
    value: "fa-snowflake",
  },
  {
    value: "fa-tv",
  },
  {
    value: "fa-window-maximize",
  },
  {
    value: "fa-plug",
  },
  {
    value: "fa-door-closed",
  },
  {
    value: "fa-door-open",
  },
  {
    value: "fa-moon",
  },
  {
    value: "fa-sun",
  },
  {
    value: "fa-person-walking",
  },
  {
    value: "fa-house-user",
  },
  {
    value: "fa-briefcase",
  },
  {
    value: "fa-spa",
  },
  {
    value: "fa-film",
  },
];
