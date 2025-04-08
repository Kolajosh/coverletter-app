import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as CaretDownIcon } from "../../assets/svg/chevron-down.svg";

interface Option {
  label: string;
  value: string | number;
}

interface SelectFieldProps {
  label: string;
  options: Option[];
  name: string;
  placeholder?: string;
  isDisabled?: boolean;
  setStatus: (option: Option | null) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedItem?: Option | null;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  name,
  placeholder = "~Select Option~",
  isDisabled = false,
  setStatus,
  onChange = () => {},
  selectedItem = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    selectedItem || null
  );
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedOption(selectedItem);
  }, [selectedItem]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fieldRef.current &&
        !fieldRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).classList.contains("select-field-option")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setStatus(option);
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative flex flex-col font-verdana font-thin"
      ref={fieldRef}
    >
      <label
        htmlFor={`input-${name}`}
        className={`text-xs mb-2.5 ${
          isDisabled ? "text-gray-300" : "text-black"
        }`}
      >
        {label}
      </label>
      <div className="relative flex flex-col font-openSans font-thin items-center">
        <input
          type="button"
          className={`${
            selectedOption ? "text-xs" : "text-xs text-gray-300"
          } w-full text-left px-4 py-4 rounded bg-[#ffffff] bg-opacity-10`}
          onClick={handleToggleDropdown}
          value={selectedOption ? selectedOption.label : placeholder}
        />
        <CaretDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-20 bg-[#ffffff] bg-opacity-10 rounded-md shadow-lg">
          <div className="overflow-x-auto h-60">
            {options?.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 select-field-option"
                onClick={() => handleOptionClick(option)}
              >
                <label className="flex items-center text-xs">
                  <input
                    type="button"
                    name={name}
                    value={option.label}
                    className="mr-2 py-2"
                    onChange={onChange}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectField;
