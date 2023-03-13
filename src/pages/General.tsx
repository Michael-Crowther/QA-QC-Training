import { useState } from 'react';
import { Link } from 'react-router-dom';

const General: React.FC = () => {
  const [todo, setTodo] = useState<string>("");

  return (
    <div className="mainContent">
      <Link to="/" className="homeLink">
        <div className="buttonContainer">
          <button className="homeButton">Home</button>
        </div>
      </Link>
      <h1 className="pageHeader">SLA / General</h1>
      <div className="googleDocEmbedContainer">
        <iframe className = "doc"
          src="https://docs.google.com/document/d/e/2PACX-1vS05lc5uHMaRQWITWSFcusg_KMRf9jKEypsbjdA3ctflPNXmwz9Gz3zT7gQjb0Fm9tMQqes9ehSDxNG/pub?embedded=true&wmode=transparent"
          width="1000"
          height="1000"
          title="Google Doc Embed"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default General;
