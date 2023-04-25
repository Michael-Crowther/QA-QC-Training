import { Link } from 'react-router-dom';
import { useRef } from 'react';

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

/*  
  const toggleFullScreen = () => {

    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if ((iframeRef.current as any).webkitRequestFullscreen) {
        (iframeRef.current as any).webkitRequestFullscreen();
      } else if ((iframeRef.current as any).msRequestFullscreen) {
        (iframeRef.current as any).msRequestFullscreen();
      }
    }
    
   
    const iFrame = document.querySelector(".doc");
    iFrame?.classList.remove("doc");
    iFrame?.classList.add("docFullscreen");
    
  };
  */

  return (
    <div className="mainContent">
      <Link to="/" className="homeLink">
        <div className="buttonContainer">
          <button className="homeButton">Home</button>
        </div>
      </Link>
      <h1 className="pageHeader">SLA / General</h1>
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
