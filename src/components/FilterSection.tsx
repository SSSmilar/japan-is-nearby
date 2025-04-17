interface FilterOption {
  value: string;
  label: string;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const FilterSection = ({ title, options, selected, onChange }: FilterSectionProps) => {
  const handleChange = (value: string) => {
    const newValues = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    onChange(newValues);
  };

  return (
    <div>
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="rounded text-blue-600"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterSection; 