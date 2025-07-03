import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/components/user-profile.css";
import "../styles/components/toast.css";

const USER_BASE_URI = import.meta.env.VITE_USER_BASE_URI;
const USER_PROJECTS_BASE_URI = import.meta.env.VITE_USER_PROJECTS_BASE_URI;

export function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const USER_DATA_URI = `${USER_BASE_URI}/${username}`;
      try {
        const userData = await axios.get(USER_DATA_URI);
        const data = userData.data;
        const projectData = await axios.get(
          `${USER_PROJECTS_BASE_URI}/${data.id}`
        );
        console.log(projectData.data);
        data.projects = projectData.data;
        setUser(data);
      } catch (err) {
        console.error("User profile fetch error:", err);
        showToast(err.response?.data?.error || "Failed to fetch user profile");
      } finally {
        setLoading(false);
      }
    }
    fetchUserData();
  }, [username]);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }

  if (loading) return <p>Loading user profile...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="user-profile">
      <div className="section">
        {toast && <div className="toast">{toast}</div>}
        <h1 className="section-header">{user.fullName}'s Profile</h1>
        <div className="section-content">
          <div className="profile-field">
            <label>Username</label>
            <input type="text" value={user.username} disabled />
          </div>
          <div className="profile-field">
            <label>Email</label>
            <input type="email" value={user.email} disabled />
          </div>
          <div className="profile-field">
            <label>Bio</label>
            <textarea value={user.bio || ""} disabled rows={3}></textarea>
          </div>
          <div className="profile-field">
            <label>Skills</label>
            <ul>
              {user.skills?.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="profile-field">
            <label>Social Links</label>
            <ul>
              {user.socialLinks &&
                Object.entries(user.socialLinks).map(([platform, url], i) => (
                  <li key={i}>
                    <strong>{platform}</strong>:{" "}
                    <a
                      href={url.startsWith("http") ? url : `https://${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
          <div className="profile-field">
            <label>Projects</label>
            {user.projects?.length > 0 ? (
              <div className="project-grid">
                {user.projects?.map((project, i) => (
                  <div key={i} className="project-card">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <p>
                      <strong>Tech:</strong> {project.techStack?.join(", ")}
                    </p>
                    {project.liveUrl && (
                      <a
                        href={
                          project.liveUrl.startsWith("http")
                            ? project.liveUrl
                            : `https://${project.liveUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live
                      </a>
                    )}{" "}
                    {project.githubUrl && (
                      <a
                        href={
                          project.githubUrl.startsWith("http")
                            ? project.githubUrl
                            : `https://${project.githubUrl}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No projects found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
