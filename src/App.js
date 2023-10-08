import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/Routes";
import AOS from "aos";
import "aos/dist/aos.css";
import { HelmetProvider } from "react-helmet-async";

function App() {
  useEffect(() => {
    AOS.init({
      disableMutationObserver: false,
      mirror: false,
    });
  }, []);
  return (
    <HelmetProvider>
      <div className="App">
        <Router>
          <AppRoutes />
        </Router>
      </div>
    </HelmetProvider>
  );
}

export default App;
