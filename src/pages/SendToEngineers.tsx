import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const SendToEngineers: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Send to Engineers</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vSd_MBWP2jiVkFY8CeWSNLb8IUUASsHtvHPLNlGWpb5b-vdGqJt21b4jTepE4UmZi1ryEI6lE1e8Aqp/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default SendToEngineers;