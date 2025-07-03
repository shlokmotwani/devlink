import { useState } from "react";
import "../styles/components/skills.css"

export function Skills({ skills, setSkills, editMode }) {
  const [addMode, setAddMode] = useState(false);
  const [skill, setSkill] = useState("");

  function handleAddSkill() {
    if (!skill.trim()) return;
    const newSkillSet = [...skills, skill];
    setSkills(newSkillSet);
    setSkill("");
    setAddMode(false);
  }

  function handleDeleteSkill(skillToDelete) {
    const updatedSkills = skills.filter((s) => s !== skillToDelete);
    setSkills(updatedSkills);
  }

  return (
    <div className="section-content">
      <div className="section-header">
        <h2>Skills</h2>
      </div>

      {skills.map((skillItem, index) => (
        <div className="form-group skill-item" key={index}>
          <label>Skill {index + 1}</label>
          <input
            type="text"
            value={skillItem}
            onChange={(event) => {
              const updatedSkills = [...skills];
              updatedSkills[index] = event.target.value;
              setSkills(updatedSkills);
            }}
            disabled={!editMode}
          />
          {editMode && (
            <button
              className="delete-btn"
              onClick={() => handleDeleteSkill(skillItem)}
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
            onClick={() => setAddMode(true)}
          >
            Add Skill
          </button>

          {addMode && (
            <div className="add-skill-form">
              <input
                type="text"
                value={skill}
                placeholder="Enter skill"
                onChange={(event) => setSkill(event.target.value)}
              />
              <div className="add-actions">
                <button onClick={handleAddSkill}>Save</button>
                <button onClick={() => setAddMode(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
