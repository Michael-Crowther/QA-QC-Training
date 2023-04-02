import { Link } from 'react-router-dom';

const TeamMeetings: React.FC = () => {
  return (
    <div className="mainContent">
      <Link to="/" className="homeLink">
        <div className="buttonContainer">
          <button className="homeButton">Home</button>
        </div>
      </Link>
      <h1 className="pageHeader">Team Meetings</h1>
      <div className="googleDocEmbedContainer">
        <iframe className = "doc"
          src="https://docs.google.com/document/d/e/2PACX-1vRDDQG63lKRz5fLYrYqLxtvMM-1BZvHiWfajPtSiPapPAX_leCvCAhONwiCqZjUIrrRRhNdAJRcs0sD/pub?embedded=true"
          width="1000"
          height="1000"
          title="Google Doc Embed"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default TeamMeetings;