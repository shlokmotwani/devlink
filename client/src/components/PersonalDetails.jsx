export function PersonalDetails({
  fullName,
  email,
  username,
  bio,
  setBio,
  editMode,
}) {
  return (
    <div className="section-content">
      <div className="section-header">
        <h2>Personal Details</h2>
      </div>

      <div className="form-group">
        <label>Full Name</label>
        <input type="text" value={fullName} disabled />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" value={email} disabled />
      </div>

      <div className="form-group">
        <label>Username</label>
        <input type="text" value={username} disabled />
      </div>

      <div className="form-group">
        <label>Bio</label>
        <textarea
          type="text"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          disabled={!editMode}
        />
      </div>
    </div>
  );
}
