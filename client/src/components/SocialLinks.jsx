import { useState } from "react";
import "../styles/components/social-link.css"

export function SocialLinks({ socialLinks, setSocialLinks, editMode }) {
  const [addMode, setAddMode] = useState(false);
  const [platform, setPlatform] = useState("");
  const [URL, setURL] = useState("");

  function handleAddSocialLink() {
    if (!platform.trim() || !URL.trim()) return;
    setSocialLinks({ ...socialLinks, [platform]: URL });
    setPlatform("");
    setURL("");
    setAddMode(false);
  }

  function handleDeleteSocialLink(key) {
    const updatedLinks = { ...socialLinks };
    delete updatedLinks[key];
    setSocialLinks(updatedLinks);
  }

  return (
    <div className="section-content">
      <div className="section-header">
        <h2>Social Links</h2>
      </div>

      {Object.keys(socialLinks).map((key, index) => (
        <div className="form-group social-item" key={index}>
          <label>{key}</label>
          <input
            type="text"
            value={socialLinks[key]}
            onChange={(event) => {
              setSocialLinks({
                ...socialLinks,
                [key]: event.target.value,
              });
            }}
            disabled={!editMode}
          />
          {editMode && (
            <button
              className="delete-btn"
              onClick={() => handleDeleteSocialLink(key)}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {editMode && (
        <>
          <button
            className="add-btn"
            hidden={addMode}
            onClick={() => setAddMode(!addMode)}
          >
            Add Handle
          </button>

          {addMode && (
            <div className="add-social-form">
              <input
                type="text"
                value={platform}
                placeholder="Platform"
                onChange={(event) => setPlatform(event.target.value)}
              />
              <input
                type="text"
                value={URL}
                placeholder="URL"
                onChange={(event) => setURL(event.target.value)}
              />
              <div className="add-actions">
                <button onClick={handleAddSocialLink}>Save</button>
                <button onClick={() => setAddMode(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
