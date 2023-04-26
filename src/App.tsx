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
import TeamMeetings from "./pages/TeamMeetings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownLeftAndUpRightToCenter } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import React from "react";


const App: React.FC = () => {
  
  const [search, setSearch] = useState<string>("");
  // eslint-disable-next-line
  const [initialSearchTerms, setInitialSearchTerms] = useState<string[]>([]);
  const [showLink, setShowLink] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const REACT_APP_BACKEND_URL = "https://guarded-wildwood-93633.herokuapp.com";
  //const REACT_APP_BACKEND_URL = "http://localhost:5000";

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

  const [showLogin, setShowLogin] = useState<boolean>(() => {
    const lastLogin = localStorage.getItem('lastLogin');
    // Show login page if last login was more than a week ago
    return !lastLogin || Date.now() - parseInt(lastLogin) > 7 * 24 * 60 * 60 * 1000;
  });

  useEffect(() => {
    if (showLogin) {
      localStorage.removeItem('lastLogin');
    } else {
      localStorage.setItem('lastLogin', Date.now().toString());
    }
  }, [showLogin]);

  const handleLogout = () => {
    setShowLogin(true);
  };


  //This event listener is for the login page. It sends a POST request to the server
  //with the email and password data.
  useEffect(() => {
    const submitForm = async (event: Event) => {
      event.preventDefault();
      const loginForm = document.querySelector(".loginForm");
      const loading = document.querySelector(".docHidden");
      try{
        const responseLogin = await fetch(`${REACT_APP_BACKEND_URL}/login`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password}),
        });

        const data = await responseLogin.json();

        //If login is successful, redirect user to home page
        //and set authToken in localStorage for settings page
        if(responseLogin.status === 200){
          loginForm?.classList.add("hidden");
          loginForm?.classList.remove("loginForm");
          loading?.classList.remove("docHidden");
          loading?.classList.add("loadingLogin");

          setTimeout(() => {
            window.location.href = '/';
            localStorage.setItem('authToken', data.token);
            setShowLogin(false);
          }, 1000);
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
  }, [email, password, REACT_APP_BACKEND_URL]);


  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = event.target.value;
    if(emailInput.trim() === '' || !/\S+@\S+\.\S+/.test(emailInput))
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

  const toggleFullScreen = () => {
    const fullscreenCloseButton = document.querySelector("#fullscreenClose");
    fullscreenCloseButton?.classList.remove("fullscreenClose");
    fullscreenCloseButton?.classList.add("hidden");

    const appHeading = document.querySelector(".headingFullscreen");
    appHeading?.classList.remove("headingFullscreen");
    appHeading?.classList.add("heading");

    const iFrame = document.querySelector(".docFullscreen");
    iFrame?.classList.remove("docFullscreen");
    iFrame?.classList.add("doc");

    if(iFrame){
      (iFrame as any).style.height = 580 + "px";
    }

    const inputBox = document.querySelector(".input");
    inputBox?.classList.remove("hidden");
  }


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
            <div className="docHidden"></div>
        </div>
      ) : (
        <div id="Home">
          <div className="headingParent">
            <FontAwesomeIcon 
              className="hidden"
              id="fullscreenClose"
              icon={faDownLeftAndUpRightToCenter}        
              onClick={toggleFullScreen}
            />
            <span className="heading">QA ~ QC Bible</span>
          </div>
  
          <InputFeild search={search} setSearch={setSearch} navigate={navigate} initialSearchTerms={initialSearchTerms} />
  
          {showLink && <h1 className="commandmentHeader" id="commandmentHeader">Training Guide</h1>}
  
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
              <Route path="/teamMeetings" element={<TeamMeetings />} />
              <Route path="/settings" element={<Settings showLogin={showLogin} handleLogout={handleLogout} />} />
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
              {showLink && <Link className="grid-item" to="/teamMeetings" onClick={() => setShowLink(false)}>Team Meetings</Link>}
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
