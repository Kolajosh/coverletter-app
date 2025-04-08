import React, { forwardRef, useLayoutEffect, useState } from "react";
import Preloader from "../mics/Preloader";

type IconProps = {
  active: boolean;
  variant: string;
  preview: React.ReactNode;
};

type TextInputProps = {
  autoFocus?: boolean;
  containerVariant?: string;
  type?: "text" | "search" | "number" | "email";
  name: string;
  label?: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  error?: string;
  hasError?: boolean;
  placeHolder?: string;
  variant?: string;
  icon?: IconProps;
  isDisabled?: boolean;
  isLoading?: boolean;
  success?: boolean;
  maxLength?: number;
  isPin?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      autoFocus = false,
      containerVariant = "w-full flex flex-col",
      type = "text",
      name,
      label,
      handleChange,
      handleBlur,
      value = "",
      error,
      hasError = false,
      placeHolder = "Enter text",
      variant = "text-black w-full h-12 text-lg px-5",
      icon = { active: false, variant: "", preview: null },
      isDisabled = false,
      isLoading = false,
      success = false,
      maxLength,
      isPin,
    },
    ref
  ) => {
    const [localValue, setLocalValue] = useState<string>("");

    useLayoutEffect(() => {
      if (value !== "") {
        setLocalValue(value);
      }
    }, [value]);

    const validationFulfilled = value !== "" && success;

    return (
      <div className={`${containerVariant}`}>
        {label && (
          <div className="flex items-center text-white justify-between font-jarkata font-normal">
            <label
              htmlFor={`input-${name}`}
              className={`font-normal text-xs mb-1.5 ${
                isDisabled ? "text-gray-300" : "text-white"
              }`}
            >
              {label}
            </label>
          </div>
        )}
        {icon?.active && <span className={icon.variant}>{icon.preview}</span>}
        {isLoading && (
          <div className="relative">
            <span className="absolute text-[#AB0B4B] ml-5 right-1.5 top-3">
              <Preloader
                variant="w-6 h-6"
                currentColor="#AB0B4B"
                currentFill="#F8E8E8"
              />
            </span>
          </div>
        )}
        {validationFulfilled && (
          <div className="relative">
            <span className="absolute text-[#AB0B4B] ml-5 right-1.5 top-3">
              good
            </span>
          </div>
        )}
        <input
          ref={ref}
          name={name}
          type={type}
          className={`focus:outline-none text-sm text-white border-[0.5px] border-[#fff] z-2 bg-[#ffffff] bg-opacity-10 outline-none placeholder:text-xs placeholder:text-[#939393] rounded-lg
            ${icon?.active && "px-12"}
            ${
              isDisabled
                ? "cursor-not-allowed border-gray-100 bg-gray-50 placeholder:text-gray-300"
                : "bg-lib-alat-gray-input placeholder:text-gray-500 border-lib-alat-gray-input-border"
            }
            ${
              success &&
              !hasError &&
              "valid:border-[#3BB54A] focus:valid:border-[#3BB54A]"
            }
            ${hasError && "border-red-500 focus:border-red-500"}
            ${variant}`}
          value={localValue}
          onChange={(event) => {
            const re = /^[0-9\b]+$/;
            if (
              isPin &&
              event.target.value !== "" &&
              re.test(event.target.value) === false
            )
              return;
            if (isPin && maxLength && event.target.value.length > maxLength)
              return;
            setLocalValue(event.target.value);
            handleChange(event);
          }}
          onBlur={handleBlur}
          placeholder={placeHolder}
          disabled={isDisabled}
          autoFocus={autoFocus}
          maxLength={maxLength}
        />
        {hasError && (
          <div className="flex gap-2">
            <p className="text-red-500 text-[10px] h-auto py-1 font-openSans">
              {error}
            </p>
          </div>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
