import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const Database: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">AHJ Database</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vTLyikC4Gx70huYWpU8uK_wdHXt4mIiyH3BTnZFoyAyhnVwxVeMMFrFFRIqjmK4O2xvVPRQaz6kx-tD/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default Database;