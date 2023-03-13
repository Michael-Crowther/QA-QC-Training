import { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import InputFeild from './components/InputFeild';
import General from './pages/General';
import Folders from "./pages/Folders";
import SendToEngineers from "./pages/SendToEngineers";
import ErrorRatePolicy from "./pages/ErrorRatePolicy";
import Templates from "./pages/Templates";
import RoofFraming from "./pages/RoofFraming";
import CodesWindSnow from "./pages/CodesWindSnow";
import Database from "./pages/Database";
import GroundMounts from "./pages/GroundMounts";
import AttachmentsScrews from "./pages/AttachmentsScrews";
import Calculations from "./pages/Calculations";

import './App.css';
import React from "react";


const App: React.FC = () => {
  
  const [search, setSearch] = useState<string>("");
  const [initialSearchTerms, setInitialSearchTerms] = useState<string[]>([]);
  const [showLink, setShowLink] = useState(true);
  const navigate = useNavigate();

  const location = useLocation();
  
  //The location and useEffect here is to toggle the setShowLink when we return to the home page from other pages
  useEffect(() => {
    const homeDiv = document.querySelector("#Home");
    const commandmentHeader = document.querySelector("#commandmentHeader");
    const gridContainer = document.querySelector("#grid-container");

    if (location.pathname === '/') {
      setShowLink(true);
      homeDiv?.classList.remove("Page");
      homeDiv?.classList.add("App");
      commandmentHeader?.classList.remove("hidden");
      commandmentHeader?.classList.add("commandmentHeader");
      gridContainer?.classList.remove("hidden");
      gridContainer?.classList.add("grid-container");
    }
    else{
      homeDiv?.classList.add("Page");
      homeDiv?.classList.remove("App");
      commandmentHeader?.classList.add("hidden");
      commandmentHeader?.classList.remove("commandmentHeader");
      gridContainer?.classList.add("hidden");
      gridContainer?.classList.remove("grid-container");
    }
  }, [location]);

  return (
    <div className="App" id="Home">
      <span className="heading">QA / QC Bible</span>

      <InputFeild search={search} setSearch={setSearch} navigate={navigate} initialSearchTerms={initialSearchTerms} />

      {showLink && <h1 className="commandmentHeader" id="commandmentHeader">Commandments</h1>}

      <div className="commandments">
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/general" element={<General />} />
          <Route path="/errorRatePolicy" element={<ErrorRatePolicy />} />
          <Route path="/folders" element={<Folders />} />
          <Route path="/sendToEngineers" element={<SendToEngineers />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/roofFraming" element={<RoofFraming />} />
          <Route path="/codesWindSnow" element={<CodesWindSnow />} />
          <Route path="/database" element={<Database />} />
          <Route path="/attachmentsScrews" element={<AttachmentsScrews />} />
          <Route path="/groundMounts" element={<GroundMounts />} />
          <Route path="/calculations" element={<Calculations />} />
        </Routes>
        <div className="grid-container" id="grid-container">
          {showLink && <Link className="grid-item" to="/general" onClick={() => setShowLink(false)}>SLA / General</Link>}
          {showLink && <Link className="grid-item" to="/errorRatePolicy" onClick={() => setShowLink(false)}>Error Rate Policy</Link>}
          {showLink && <Link className="grid-item" to="/folders" onClick={() => setShowLink(false)}>Folders</Link>}
          {showLink && <Link className="grid-item" to="/sendToEngineers" onClick={() => setShowLink(false)}>Send to Engineers</Link>}
          {showLink && <Link className="grid-item" to="/templates" onClick={() => setShowLink(false)}>Templates</Link>}
          {showLink && <Link className="grid-item" to="/roofFraming" onClick={() => setShowLink(false)}>Roof Framing</Link>}
          {showLink && <Link className="grid-item" to="/codesWindSnow" onClick={() => setShowLink(false)}>Codes / Wind / Snow</Link>}
          {showLink && <Link className="grid-item" to="/database" onClick={() => setShowLink(false)}>AHJ Database</Link>}
          {showLink && <Link className="grid-item" to="/attachmentsScrews" onClick={() => setShowLink(false)}>Attachments / Screws</Link>}
          {showLink && <Link className="grid-item" to="/groundMounts" onClick={() => setShowLink(false)}>Ground Mounts</Link>}
          {showLink && <Link className="grid-item" to="/calculations" onClick={() => setShowLink(false)}>Calculations</Link>}
        </div>
      </div>
    </div>
  );
}

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;
