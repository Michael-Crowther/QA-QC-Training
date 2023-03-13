import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const ErrorRatePolicy: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Error Rate Policy</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vRsAQGxm4cfmJndek_huCHpqx0cDOHZretdYbqcV2G6lOE8Hrtb8w9dqGQlQCEKmaNSNOTYczeVfGDS/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default ErrorRatePolicy;