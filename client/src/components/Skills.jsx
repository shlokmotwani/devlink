import { useState } from "react";

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
    <div>
      <div>
        <h1>Skills</h1>
      </div>

      {skills.map((skillItem, index) => (
        <div key={index}>
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
            <button onClick={() => handleDeleteSkill(skillItem)}>Delete</button>
          )}
        </div>
      ))}

      {editMode && (
        <>
          <button hidden={addMode} onClick={() => setAddMode(true)}>
            Add Skill
          </button>

          {addMode && (
            <div>
              <input
                type="text"
                value={skill}
                placeholder="Enter skill"
                onChange={(event) => setSkill(event.target.value)}
              />
              <button onClick={handleAddSkill}>Save</button>
              <button onClick={() => setAddMode(false)}>Cancel</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
