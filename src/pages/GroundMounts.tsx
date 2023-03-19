import { Link } from "react-router-dom";


const GroundMounts: React.FC = () => {
    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Ground Mounts</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vQtljxzQ1slP0gp1wF6HNeuxU_otaWsCBg_iMCog_DyVsbNIowUaiwSqgqEQa0EdBG_HmPg-lG4_B6K/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default GroundMounts;