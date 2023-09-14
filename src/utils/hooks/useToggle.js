import React from "react";

const useToggle = () => {
  const [value, setValue] = React.useState(false);

  const toggleValue = React.useCallback(
    () => setValue((prev) => !prev),
    [value]
  );

  return [value, toggleValue];
};

export default useToggle;
