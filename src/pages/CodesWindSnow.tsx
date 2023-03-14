import { Link } from "react-router-dom";


const CodesWindSnow: React.FC = () => {
    return(
        <div className="mainContent">
            <Link to="/" style = {{textDecoration: 'none', color: 'white'}}>
                <div className = "buttonContainer">
                    <button className="homeButton">Home</button>
                </div>
            </Link>
            <h1 className="pageHeader">Codes / Wind / Snow</h1>
            <div className="googleDocEmbedContainer">
                <iframe className = "doc"
                src="https://docs.google.com/document/d/e/2PACX-1vQU4Yh3sgznWn4HSs9pduFF4JcbGltKqHEagEaYunUo4CrDvCI72pzfr6XPzhFCjJtyTwqDhZFOD41u/pub?embedded=true&wmode=transparent"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                />
            </div>
        </div>
    );
}

export default CodesWindSnow;