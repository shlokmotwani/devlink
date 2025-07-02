import { useState } from "react";

export function Projects({ projects, setProjects, editMode }) {
  const [addMode, setAddMode] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  function handleAddProject() {
    if (!title.trim()) return;
    const newProject = {
      title,
      description,
      techStack: techStack.split(",").map((tech) => tech.trim()),
      imageUrl,
      liveUrl,
      githubUrl,
    };

    setProjects([...projects, newProject]);

    // Reset form
    setTitle("");
    setDescription("");
    setTechStack("");
    setImageUrl("");
    setLiveUrl("");
    setGithubUrl("");
    setAddMode(false);
  }

  function handleDeleteProject(index) {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  }

  function handleUpdateProjectField(index, field, value) {
    const updatedProjects = [...projects];
    if (field === "techStack") {
      updatedProjects[index][field] = value.split(",").map((t) => t.trim());
    } else {
      updatedProjects[index][field] = value;
    }
    setProjects(updatedProjects);
  }

  return (
    <div>
      <h2>Projects</h2>
        <p>Projects Count : {projects.length}</p>
      {projects.map((project, index) => (
        <div
          key={index}
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <label>Title</label>
          <input
            type="text"
            value={project.title}
            onChange={(e) =>
              handleUpdateProjectField(index, "title", e.target.value)
            }
            disabled={!editMode}
          />
          <br />

          <label>Description</label>
          <input
            type="text"
            value={project.description}
            onChange={(e) =>
              handleUpdateProjectField(index, "description", e.target.value)
            }
            disabled={!editMode}
          />
          <br />

          <label>Tech Stack (comma-separated)</label>
          <input
            type="text"
            value={project.techStack?.join(", ") || ""}
            onChange={(e) =>
              handleUpdateProjectField(index, "techStack", e.target.value)
            }
            disabled={!editMode}
          />
          <br />

          <label>Image URL</label>
          <input
            type="text"
            value={project.imageUrl || ""}
            onChange={(e) =>
              handleUpdateProjectField(index, "imageUrl", e.target.value)
            }
            disabled={!editMode}
          />
          <br />

          <label>Live URL</label>
          <input
            type="text"
            value={project.liveUrl || ""}
            onChange={(e) =>
              handleUpdateProjectField(index, "liveUrl", e.target.value)
            }
            disabled={!editMode}
          />
          <br />

          <label>GitHub URL</label>
          <input
            type="text"
            value={project.githubUrl || ""}
            onChange={(e) =>
              handleUpdateProjectField(index, "githubUrl", e.target.value)
            }
            disabled={!editMode}
          />
          <br />

          {editMode && (
            <button
              onClick={() => handleDeleteProject(index)}
              style={{ marginTop: "0.5rem" }}
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {editMode && (
        <>
          {!addMode && (
            <button onClick={() => setAddMode(true)}>Add Project</button>
          )}

          {addMode && (
            <div style={{ marginTop: "1rem" }}>
              <h4>New Project</h4>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tech Stack (comma-separated)"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="Live URL"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="GitHub URL"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
              <div>
                <button onClick={handleAddProject}>Save</button>
                <button onClick={() => setAddMode(false)}>Cancel</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
