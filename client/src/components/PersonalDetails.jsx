export function PersonalDetails({ fullName, email, bio, setBio, editMode }) {
  return (
    <div>
      <div>
        <h1>Personal Details</h1>
      </div>
      <div>
        <label>Full Name</label>
        <input type="text" value={fullName} disabled />
      </div>
      <div>
        <label>Email</label>
        <input type="email" value={email} disabled />
      </div>
      <div>
        <label>Bio</label>
        <input
          type="text"
          value={bio}
          onChange={(event) => {
            setBio(event.target.value);
          }}
          disabled={!editMode}
        />
      </div>
    </div>
  );
}
