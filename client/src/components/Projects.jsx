import { useState } from "react";
import "../styles/components/projects.css";
import "../styles/themes.css";

export function Projects({ projects, setProjects, editMode }) {
  const [addMode, setAddMode] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);

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

  function renderProjectFields(index) {
    const project = projects[index];

    return (
      <>
        <label>Title</label>
        <input
          type="text"
          value={project.title}
          onChange={(e) =>
            handleUpdateProjectField(index, "title", e.target.value)
          }
          disabled={!editMode}
        />

        <label>Description</label>
        <input
          type="text"
          value={project.description}
          onChange={(e) =>
            handleUpdateProjectField(index, "description", e.target.value)
          }
          disabled={!editMode}
        />

        <label>Tech Stack</label>
        <input
          type="text"
          value={project.techStack?.join(", ") || ""}
          onChange={(e) =>
            handleUpdateProjectField(index, "techStack", e.target.value)
          }
          disabled={!editMode}
        />

        <label>Image URL</label>
        <input
          type="text"
          value={project.imageUrl}
          onChange={(e) =>
            handleUpdateProjectField(index, "imageUrl", e.target.value)
          }
          disabled={!editMode}
        />

        <label>Live URL</label>
        <input
          type="text"
          value={project.liveUrl}
          onChange={(e) =>
            handleUpdateProjectField(index, "liveUrl", e.target.value)
          }
          disabled={!editMode}
        />

        <label>GitHub URL</label>
        <input
          type="text"
          value={project.githubUrl}
          onChange={(e) =>
            handleUpdateProjectField(index, "githubUrl", e.target.value)
          }
          disabled={!editMode}
        />

        {editMode && (
          <button
            className="delete-btn"
            onClick={() => {
              handleDeleteProject(index);
              setSelectedProjectIndex(null);
            }}
          >
            Delete Project
          </button>
        )}
      </>
    );
  }

  return (
    <div className="section-content">
      <div className="section-header">
        <h2>Projects</h2>
      </div>

      {/* Project Grid */}
      <div className="project-grid">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            onClick={() => setSelectedProjectIndex(index)}
          >
            <h3>{project.title}</h3>
            <p>{project.description?.slice(0, 80)}...</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProjectIndex !== null && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProjectIndex(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Project Details</h2>
            {renderProjectFields(selectedProjectIndex)}
            <button onClick={() => setSelectedProjectIndex(null)}>Close</button>
          </div>
        </div>
      )}

      {/* Add New Project Form */}
      {editMode && (
        <>
          {!addMode && (
            <button className="add-btn" onClick={() => setAddMode(true)}>
              Add Project
            </button>
          )}
          {addMode && (
            <div className="add-skill-form">
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
              <div className="add-actions">
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
