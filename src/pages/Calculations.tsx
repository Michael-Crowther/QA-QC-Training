import React, { useState, lazy } from "react";
import { Link } from "react-router-dom";


const Calculations: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Calculations</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vRFUlGxiQXth-m6ehJUtOXHYskKQAEUYmppih5H4YCHol1H6w7RnSTw11HwX4jJmT80OPRQ98yoAkSW/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default Calculations;