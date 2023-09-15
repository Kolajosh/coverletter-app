import Preloader from "../mics/Preloader";

export const CustomButton = ({
  labelText,
  handleClick,
  variant = "font-medium",
  containerVariant = "py-4 px-5 rounded-full flex justify-center",
  buttonVariant = "primary",
  isDisabled = false,
  isLoading = false,
  icon,
}) => {
  const primaryColor = "black"; // Change this to your preferred shade of black
  const secondaryColor = "#"; // Change this to your preferred secondary color

  return (
    <button
      type="submit"
      onClick={() => handleClick()}
      className={`${variant} shadow-md ${
        isDisabled
          ? `${
              buttonVariant === "primary" &&
              `bg-gray-600 text-[#fff] cursor-not-allowed py-3`
            } ${
              buttonVariant === "secondary" &&
              `border-[1.5px] border-black bg-opacity-50 text-[${secondaryColor}] cursor-not-allowed py-3`
            }`
          : `${
              buttonVariant === "primary" &&
              `bg-${primaryColor} hover:bg-${primaryColor} text-white py-3 cursor-pointer`
            } ${
              buttonVariant === "secondary" &&
              `bg-[#ECF1FC] border-[1.5px] bg-opacity-50 border-black text-[${secondaryColor}] py-3 cursor-pointer`
            }`
      } 
      ${containerVariant}`}
      disabled={isDisabled}
    >
      <div className="flex items-center">
        {icon?.active && (
          <div className={`${icon.variant}`}>{icon.preview}</div>
        )}
        {isLoading ? <Preloader variant="w-6 h-6" /> : labelText}
      </div>
    </button>
  );
};
