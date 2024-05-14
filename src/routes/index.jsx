import { BrowserRouter, Route, Routes } from "react-router-dom";
import OpenWheater from "../pages/OpenWheater";
import GoWheater from "../pages/GoWheater";
import WheaterForecast from "../pages/WheaterForecast";

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/go-wheater" element={<GoWheater />} />
        <Route path="/open-wheater" element={<OpenWheater />} />
        <Route path="/wheater-forecast" element={<WheaterForecast />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesApp;
