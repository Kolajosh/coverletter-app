import { Route, Routes } from "react-router-dom";
import Landing from "../view/Onboarding/Landing";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default AppRoutes;
