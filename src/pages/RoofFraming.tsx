import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const RoofFraming: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Roof Framing</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vSa1k6HGtenRnQUOocrQN01eVIEAaS-6YiKdbGtGn_-l_vOTVmsbqPal_3ocJR21MV2Vh3XZeUZAr6H/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default RoofFraming;