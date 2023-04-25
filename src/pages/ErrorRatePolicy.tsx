import { Link } from "react-router-dom";

const ErrorRatePolicy: React.FC = () => {
    //const iFrameRef = useRef<HTMLIFrameElement>(null);


    const handleLoad = () => {
        //const iFrame = iFrameRef.current;
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
          <h1 className="pageHeader">Error Rate Policy</h1>
            <div className="googleDocEmbedContainer">
              <iframe
                className="docHidden"
                src="https://docs.google.com/document/d/e/2PACX-1vRsAQGxm4cfmJndek_huCHpqx0cDOHZretdYbqcV2G6lOE8Hrtb8w9dqGQlQCEKmaNSNOTYczeVfGDS/pub?embedded=true"
                title="Google Doc Embed"
                allowFullScreen
                onLoad={handleLoad}
              />
            </div>
            <div className="loading"></div>
        </div>
      );
}

export default ErrorRatePolicy;