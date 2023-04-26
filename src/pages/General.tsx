import { Link } from 'react-router-dom';

const General: React.FC = () => {

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
        <h1 className="pageHeader">SLA / General</h1>
        <div className="googleDocEmbedContainer">
          <iframe
            className="docHidden"
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
