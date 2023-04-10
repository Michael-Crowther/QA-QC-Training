import { Link } from "react-router-dom";


const CodesWindSnow: React.FC = () => {

    const handleLoad = () => {
        const iFrame = document.querySelector(".docHidden");
        const loading = document.querySelector(".loading");
        iFrame?.classList.remove("docHidden");
        iFrame?.classList.add("doc");
        loading?.classList.remove("loading");
        loading?.classList.add("docHidden");
      }
    
      return (
        <div className="mainContent">
          <Link to="/" className="homeLink">
            <div className="buttonContainer">
              <button className="homeButton">Home</button>
            </div>
          </Link>
          <h1 className="pageHeader">Codes / Wind / Snow</h1>
            <div className="googleDocEmbedContainer">
              <iframe
                className="docHidden"
                src="https://docs.google.com/document/d/e/2PACX-1vQU4Yh3sgznWn4HSs9pduFF4JcbGltKqHEagEaYunUo4CrDvCI72pzfr6XPzhFCjJtyTwqDhZFOD41u/pub?embedded=true"
                width="1000"
                height="1000"
                title="Google Doc Embed"
                allowFullScreen
                onLoad={handleLoad}
              />
            </div>
            <div className="loading"></div>
        </div>
      );
}

export default CodesWindSnow;