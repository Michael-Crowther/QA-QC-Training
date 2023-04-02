import { useState, useEffect, FormEvent } from "react";
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
import Settings from "./pages/Settings";
import './App.css';
import React from "react";


interface LoginResponse {
  status: number;
  message: string;
  authToken: string;
  userInfo?: {
    firstName: string;
    lastName: string;
    email: string;
  }
}

const App: React.FC = () => {
  
  const [search, setSearch] = useState<string>("");
  // eslint-disable-next-line
  const [initialSearchTerms, setInitialSearchTerms] = useState<string[]>([]);
  const [showLink, setShowLink] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  //This useState is used to make the login screen show every week to the user
  //instead of every time the app is opened. I'm using a localStorage here to
  //store a timestamp of the last time the user logged in
  useEffect(() => {
    const lastLogin = localStorage.getItem('lastLogin');
    if(!lastLogin || Date.now() - parseInt(lastLogin) > 30000){
      setShowLogin(true);
      localStorage.setItem('lastLogin', Date.now().toString());
    }
  }, []);



  //This event listener is for the login page. It sends a POST request to the server
  //with the email and password data.
  const loginForm = document.querySelector(".loginForm") as HTMLFormElement;

  useEffect(() => {
    const submitForm = async (event: Event) => {
      event.preventDefault();

      try{
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        //If login is successful, redirect user to home page
        if(response.status === 200){
          localStorage.setItem('authToken', data.token);
          window.location.href = '/';
        }
        else{
          //if login fails, display error message
          setErrorMessage(data.message);
        }
      }
      catch(error){
        console.log(error);
      }
    };

    const loginForm = document.querySelector('.loginForm') as HTMLFormElement;
    loginForm?.addEventListener('submit', submitForm);

    return () => {
      loginForm?.removeEventListener('submit', submitForm);
    };
  }, [email, password]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = event.target.value;
    if(emailInput.trim() == '' || !/\S+@\S+\.\S+/.test(emailInput))
      setErrorMessage('Please enter a valid email address');
    else
      setErrorMessage('');
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent form submission
  
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Invalid email or password');
      return;
    }
  };

  return (
    <div className="App">
      {showLogin ? (
        // Login screen here
        <div className="mainContentLogin">
            <form className="loginForm" onSubmit={handleFormSubmit}>
              <div className="formGroup">
                <label htmlFor="email" className="emailLabel">Email:</label>
                <input
                  type="email"
                  id="email"
                  className="emailInput"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>

              <div className="formGroup">
                <label htmlFor="password" className="passwordLabel">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="passwordInput"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              {errorMessage && <div className="errorContainer">{errorMessage}</div>}

              <button type="submit" className="loginButton">Login</button>
            </form>
        </div>
      ) : (
        <div id="Home">
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
              <Route path="/settings" element={<Settings showLogin={showLogin} />} />
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
      )}
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
