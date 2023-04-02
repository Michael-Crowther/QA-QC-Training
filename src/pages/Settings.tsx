import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

interface SettingsProps {
    showLogin: boolean;
}

const Settings: React.FC<SettingsProps> = ({showLogin}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    //This useState fetches userInfo from REST API which was defined in the
    //server.cjs file
    useEffect(() => {
        const fetchUserInfo = async () => {
          try{
            const response = await fetch('http://localhost:5000/api/user', {
              headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
            });

            const data = await response.json();

            console.log(data.firstName);//not getting here

    
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
      }, [showLogin]);


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

            <div className="grid-container-settings">
                <div className="grid-item-settings">Change Password</div>
                <div className="grid-item-settings">Request Search Term</div>
                <div className="grid-item-settings">Report a Bug</div>
                <div className="grid-item-settings">Logout</div>
            </div>
        </div>
    );
}

export default Settings;