export function PersonalDetails({ fullName, email, bio, setBio, editMode }) {
  return (
    <div>
      <div>
        <h1>Personal Details</h1>
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" value={fullName} disabled />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" value={email} disabled />
      </div>
      <div>
        <label htmlFor="bio">Bio</label>
        <input
          type="text"
          value={bio}
          onChange={(event) => {
            setBio(event.target.value);
          }}
          disabled={!editMode}
          required
        />
      </div>
    </div>
  );
}
