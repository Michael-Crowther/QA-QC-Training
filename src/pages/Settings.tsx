import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import SuccessModal from '../pages/SuccessModal';


interface SettingsProps {
    showLogin: boolean;
    handleLogout: () => void;
}

interface PasswordMatch {
  passwordMatch: boolean;
}

Modal.setAppElement('#root');


const Settings: React.FC<SettingsProps> = ({showLogin, handleLogout}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    
    //Password form useStates
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //eslint-disable-next-line
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [showModal, setShowModal] = useState(false);

    //Report Bug Form useStates
    const [showReportBug, setShowReportBug] = useState(false);
    const [bugTitle, setBugTitle] = useState('');
    const [bugDescription, setBugDescription] = useState('');

    //Request Search Term useStates
    const [showSearchTerm, setShowSearchTerm] = useState(false);
    const [searchTermRequest, setSearchTermRequest] = useState('');
    const [searchTermDescription, setShowSearchTermDescription] = useState('');

    const BACKEND_URL = "https://guarded-wildwood-93633.herokuapp.com";

    const navigate = useNavigate();

        //useEffect for calling API from server.cjs to check if entered
    //password for changing matches what is in the database
    useEffect(() => {
      if(formSubmitted){
        const checkPasswordMatch = async () => {
          const response = await fetch(`${BACKEND_URL}/api/checkPasswordMatch`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, currentPassword }),
          });
          const data: PasswordMatch = await response.json();
          setPasswordMatch(data.passwordMatch);
        };
        checkPasswordMatch();
      }
    }, [email, currentPassword, formSubmitted, BACKEND_URL]);


    const handleSubmitPasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setFormSubmitted(true);
    
      // Check if the current password matches what is in the database
      const response = await fetch(`${BACKEND_URL}/api/checkPasswordMatch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword }),
      });
      const data: PasswordMatch = await response.json();
      const passwordMatch = data.passwordMatch;
    
      if (!passwordMatch) {
        setErrorMessage('Current password is incorrect');
        return;
      }
      else if (newPassword === currentPassword){
        setErrorMessage('New password must be different than current password');
        return;
      }
    
      // Check if the new password and confirm passwords match
      if (newPassword === confirmPassword) {
        // call API to update password here
        fetch(`${BACKEND_URL}/api/updatePassword`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( {email, newPassword} ),
        });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setErrorMessage('');
        setShowModal(true);
      } else {
        setErrorMessage('New password does not match confirmation');
      }
    };

    const handleModalClose = () => {
      setShowModal(false);
      setShowChangePassword(false);
      setShowReportBug(false);
      setShowSearchTerm(false);
    };


    const handleReportBugSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await fetch(`${BACKEND_URL}/report-bug`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, bugTitle, bugDescription })
        });

        setBugTitle('');
        setBugDescription('');
        setShowModal(true);


        if (response.ok) {
          console.log('Bug report submitted successfully!');
        } else {
          console.error('Error submitting bug report');
        }
      } catch (error) {
        console.error(error);
      }
      
    };

    const handleSearchTermSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const response = await fetch(`${BACKEND_URL}/request-term`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, searchTermRequest, searchTermDescription })
        });

        setSearchTermRequest('');
        setShowSearchTermDescription('');
        setShowModal(true);


        if (response.ok) {
          console.log('Search term submitted successfully!');
        } else {
          console.error('Error submitting search term');
        }
      } catch (error) {
        console.error(error);
      }
      
    };


    //This useEffect fetches userInfo from REST API which 
    //is defined in the server.cjs file
    useEffect(() => {
    const fetchUserInfo = async () => {
      try{
        const response = await fetch(`${BACKEND_URL}/api/user`, {
          headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
        });

        const data = await response.json();
    
        if(response.status === 200){
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
        }
        else{
          console.log(data.message);
        }
      }
      catch(error){
        console.log(error);
      }
    };
    
    if(!showLogin){
      fetchUserInfo();
    }
  }, [showLogin, BACKEND_URL]);


  //UseEffect to change class of settings page to prevent
  //from allowing scrolling
  useEffect(() => {
    const appElement = document.querySelector(".AppPageActive");
    appElement?.classList.remove(".AppPageActive");
  }, [])

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  }


    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Settings</h1>

            <div className="userInfo">
                <h3 className="settingsHeader">User</h3>
                <input className="settingsTextBox" type="text" value={firstName} readOnly/>
                <input className="settingsTextBox" type="text" value={lastName} readOnly/>
                <input className="settingsTextBox" type="text" value={email} readOnly/>
            </div>

            {showChangePassword ? (
              <form className="changePasswordForm" onSubmit={handleSubmitPasswordChange}>
                <h3 className="settingsHeader">Change Password</h3>
                <input className="settingsTextBox" 
                  required 
                  type="password"
                  placeholder="Current password..."
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                />
                <input className="settingsTextBox" 
                  required 
                  type="password"
                  placeholder="New password..."
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                
                />
                <input className="settingsTextBox" 
                  required 
                  type="password"
                  placeholder="Confirm password..."
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
                {errorMessage && <div className="errorContainer">{errorMessage}</div>}
                <div className="formButtons">
                  <button className="submitButton" type="submit">Submit</button>
                  <button className="backButton" onClick={() => setShowChangePassword(false)}>Back</button>
                </div>
                <SuccessModal isOpen={showModal} onClose={handleModalClose} modalMessage="Your password was successfully changed"/>
              </form>
            ) : showReportBug ? (
              <form className="reportBugForm" onSubmit={handleReportBugSubmit}>
                <h3 className="settingsHeader">Report a Bug</h3>
                <input
                  className="settingsTextBox"
                  required
                  type="text"
                  placeholder="Bug title..."
                  value={bugTitle}
                  onChange={(event) => setBugTitle(event.target.value)}
                />
                <textarea
                  className="settingsTextAreaBox"
                  required
                  placeholder="Please describe the bug (where did it happen, what were you doing when it happened)..."
                  value={bugDescription}
                  onChange={(event) => setBugDescription(event.target.value)}
                />
                {errorMessage && <div className="errorContainer">{errorMessage}</div>}
                <div className="formButtons">
                  <button className="submitButton" type="submit">Submit</button>
                  <button className="backButton" onClick={() => setShowReportBug(false)}>Back</button>
                </div>
                <SuccessModal isOpen={showModal} onClose={handleModalClose} modalMessage="Your bug report was successfully submitted. Thank you for your feedback"/>
              </form>
            ) : showSearchTerm ? (
              <form className="searchTermForm" onSubmit={handleSearchTermSubmit}>
                <h3 className="settingsHeader">Request Search Term</h3>
                <input
                  className="settingsTextBox"
                  required
                  type="text"
                  placeholder="Search Term to Request..."
                  value={searchTermRequest}
                  onChange={(event) => setSearchTermRequest(event.target.value)}
                />
                <textarea
                  className="settingsTextAreaBox"
                  required
                  placeholder="Please provide any additional information here..."
                  value={searchTermDescription}
                  onChange={(event) => setShowSearchTermDescription(event.target.value)}
                />
                {errorMessage && <div className="errorContainer">{errorMessage}</div>}
                <div className="formButtons">
                  <button className="submitButton" type="submit">Submit</button>
                  <button className="backButton" onClick={() => setShowSearchTerm(false)}>Back</button>
                </div>
                <SuccessModal isOpen={showModal} onClose={handleModalClose} modalMessage="Your request was successfully submitted. Thank you for your feedback"/>
              </form>
            ) : (
              <div className="grid-container-settings">
                <div className="grid-item-settings" onClick={() => setShowChangePassword(true)}>Change Password</div>
                <div className="grid-item-settings" onClick={() => setShowSearchTerm(true)}>Request Search Term</div>
                <div className="grid-item-settings" onClick={() => setShowReportBug(true)}>Report a Bug</div>
                <div className="grid-item-settings" onClick={handleLogoutClick}>Logout</div>
              </div>
            )}
        </div>
    );
}

export default Settings;