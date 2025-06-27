import { useState } from "react";

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
    <div>
      <div>
        <h1>Social Links</h1>
      </div>
      {Object.keys(socialLinks).map((key, index) => {
        return (
          <div key={index}>
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
              <button onClick={() => handleDeleteSocialLink(key)}>
                Delete
              </button>
            )}
          </div>
        );
      })}

      {editMode && (
        <>
          <button
            hidden={addMode}
            onClick={() => {
              setAddMode(!addMode);
            }}
          >
            Add Handle
          </button>

          {addMode && (
            <div>
              <input
                type="text"
                value={platform}
                placeholder="Platform"
                onChange={(event) => {
                  setPlatform(event.target.value);
                }}
              />
              <input
                type="text"
                value={URL}
                placeholder="URL"
                onChange={(event) => {
                  setURL(event.target.value);
                }}
              />
              <button onClick={handleAddSocialLink}>Save</button>
              <button onClick={() => setAddMode(false)}>Cancel</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
