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
                src="https://docs.google.com/document/d/e/2PACX-1vSWH1hVv4ExXqSt5BwPw4Pdbaw4hwp_y8UYraANTHBAYffhm-DCs4RJkPr9sAz9hEDA1YygMqeaJ6XO/pub?embedded=true"
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