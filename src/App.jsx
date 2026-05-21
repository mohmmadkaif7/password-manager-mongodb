import { useState } from "react";

import Navbar from "./components/Navbar";
import Manager from "./components/manager";
function App() {
  return (
    <>
      <Navbar />
      <div className=" inset-0 -z-10 h-full w-full items-center px-5 py-6 [background:radial-gradient(145%_125%_at_50%_5%,#005_30%,#63e_100%)]">
        <Manager />
      </div>
      <div className="text-blue-100 font-bold p-4 bg-indigo-700  items-center">-Developed my MOHAMMAD KAIF</div>
    </>
  );
}

export default App;
