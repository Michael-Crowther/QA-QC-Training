import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const AttachmentsScrews: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Attachment & Screw Types</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vRzTDjdC-OvPByUngmBn2ReorK3wzoS4JmENQWH38NTxyvRzZtAAYro1xeMdcaJ835tpoHre_BrrptE/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default AttachmentsScrews;