import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const Folders: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Folders</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vSo8VDGkfM7zvxPEM_-oAcQdd0UybNupCzf3Idyhyv0icU6IFN_mMx45w7hHWZF6QLYrSJJ7Lfw-Dkt/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default Folders;