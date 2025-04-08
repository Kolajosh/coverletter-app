import Preloader from "../mics/Preloader";

interface CustomButtonProps {
  labelText: string;
  handleClick: () => void;
  variant?: string;
  containerVariant?: string;
  buttonVariant?: "primary" | "secondary";
  isDisabled?: boolean;
  isLoading?: boolean;
  icon?: {
    active: boolean;
    variant?: string;
    preview?: React.ReactNode;
  };
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  labelText,
  handleClick,
  variant = "font-medium",
  containerVariant = "py-4 px-5 rounded-full flex justify-center",
  buttonVariant = "primary",
  isDisabled = false,
  isLoading = false,
  icon,
}) => {
  const primaryColor = "black";
  const secondaryColor = "#000"; // Set your preferred secondary color

  return (
    <button
      type="submit"
      onClick={handleClick}
      className={`${variant} shadow-md ${
        isDisabled
          ? buttonVariant === "primary"
            ? "bg-gray-600 text-white cursor-not-allowed py-3"
            : `border-[1.5px] border-black bg-opacity-50 text-[${secondaryColor}] cursor-not-allowed py-3`
          : buttonVariant === "primary"
          ? `bg-${primaryColor} hover:bg-${primaryColor} text-white py-3 cursor-pointer`
          : `bg-none border-[1.5px] border-white bg-opacity-50 text-[${secondaryColor}] py-3 cursor-pointer`
      } ${containerVariant}`}
      disabled={isDisabled}
    >
      <div className="flex items-center text-sm">
        {icon?.active && <div className={icon.variant}>{icon.preview}</div>}
        {isLoading ? <Preloader variant="w-6 h-6" /> : labelText}
      </div>
    </button>
  );
};
