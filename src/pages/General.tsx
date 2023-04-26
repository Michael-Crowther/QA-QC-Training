import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons';

const General: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    const iFrame = document.querySelector(".docHidden");
    const loading = document.querySelector(".loading");
    iFrame?.classList.remove("docHidden");
    iFrame?.classList.add("doc");
    loading?.classList.remove("loading");
    loading?.classList.add("docHidden");
  }

  const toggleFullScreen = () => {
    const iFrame = document.querySelector(".doc");
    iFrame?.classList.remove("doc");
    iFrame?.classList.add("docFullscreen");
    if(iFrame){
      (iFrame as any).style.height = window.screen.height - 230 + "px";
    }

    const inputBox = document.querySelector(".input");
    inputBox?.classList.add("hidden");

    const fullscreenCloseButton = document.querySelector("#fullscreenClose");
    fullscreenCloseButton?.classList.remove("hidden");
    fullscreenCloseButton?.classList.add("fullscreenExit");

    const appHeading = document.querySelector(".heading");
    appHeading?.classList.add("headingFullscreen");
  };
  

  return (
    <div className="mainContent">
      <Link to="/" className="homeLink">
        <div className="buttonContainer">
          <button className="homeButton">Home</button>
        </div>
      </Link>
      <div className="pageHeaderParent">
        <h1 className="pageHeader">SLA / General</h1>
        <FontAwesomeIcon 
          className="fullscreenButton"
          icon={faUpRightAndDownLeftFromCenter}        
          onClick={toggleFullScreen}
          />
      </div>
        <div className="googleDocEmbedContainer">
          <iframe
            className="docHidden"
            ref={iframeRef}
            src="https://docs.google.com/document/d/e/2PACX-1vS05lc5uHMaRQWITWSFcusg_KMRf9jKEypsbjdA3ctflPNXmwz9Gz3zT7gQjb0Fm9tMQqes9ehSDxNG/pub?embedded=true"
            title="Google Doc Embed"
            allowFullScreen
            onLoad={handleLoad}
          />
        </div>
        <div className="loading"></div>
    </div>
  );
};

export default General;
