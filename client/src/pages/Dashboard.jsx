import axios from "axios";
import { useEffect, useState } from "react";
import { PersonalDetails } from "../components/PersonalDetails";
import { SocialLinks } from "../components/SocialLinks";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";

const USER_DASHBOARD_URI = import.meta.env.VITE_USER_DASHBOARD_URI;
const LOCAL_STORAGE_TOKEN_NAME = import.meta.env.VITE_LOCAL_STORAGE_TOKEN_NAME;
const USER_BASE_URI = import.meta.env.VITE_USER_BASE_URI;

export function Dashboard() {
  const [user, setUser] = useState(null);

  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState({});
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);

      if (!token) {
        showToast("No token found. Please login.");
        return;
      }

      try {
        const res = await axios.get(USER_DASHBOARD_URI, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setUser(data);

        setBio(data.bio || "");
        setAvatarUrl(data.avatarUrl || "");
        setResumeUrl(data.resumeUrl || "");
        setSocialLinks(data.socialLinks || {});
        setSkills(data.skills || []);
        setProjects(data.projects || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        showToast(
          err.response?.data?.error || "Failed to fetch dashboard data"
        );
      }
    }
    fetchUserData();
  }, []);

  async function handleSave() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);

    if (!token) {
      showToast("No token found. Please login.");
      return;
    }

    try {
      await axios.put(
        `${USER_BASE_URI}/${user.username}`,
        {
          bio,
          avatarUrl,
          resumeUrl,
          socialLinks,
          skills,
          projects,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditMode(false);
      showToast("Profile updated successfully!");
    } catch (err) {
      showToast("❌ Failed to update profile");
      console.error(err);
    }
  }

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(null), 3000); // Toast disappears in 3s
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      {user ? (
        <>
          {!editMode && (
            <div className="view-only-banner">
              🔒 You are in view-only mode. Click "Edit" to make changes.
            </div>
          )}
          <div className="dashboard-grid">
            <div className="dashboard-section">
              <PersonalDetails
                fullName={user.fullName}
                email={user.email}
                username={user.username}
                bio={bio}
                setBio={setBio}
                editMode={editMode}
              />
            </div>

            <div className="dashboard-section">
              <SocialLinks
                socialLinks={socialLinks}
                setSocialLinks={setSocialLinks}
                handleSave={handleSave}
                editMode={editMode}
              />
            </div>

            <div className="dashboard-section">
              <Skills
                skills={skills}
                setSkills={setSkills}
                editMode={editMode}
              />
            </div>

            <div className="dashboard-section">
              <Projects
                projects={projects}
                setProjects={setProjects}
                editMode={editMode}
              />
            </div>
          </div>

          <div className="dashboard-buttons">
            {!editMode ? (
              <button onClick={() => setEditMode(true)}>Edit</button>
            ) : (
              <>
                <button onClick={handleSave}>Save All</button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    showToast("❌ Edits discarded");
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
