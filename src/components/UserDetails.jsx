const UserDetails = ({ user }) => {
  if (!user) {
    return (
      <aside className="details empty-details">
        <h3>User Details</h3>
        <p>Select a user from the list to view full profile information.</p>
      </aside>
    );
  }

  return (
    <aside className="details">
      <div className="details-header">
        <p className="eyebrow">Selected User</p>
        <h3>{user.name}</h3>
      </div>
      <div className="detail-row">
        <span>Email</span>
        <strong>{user.email}</strong>
      </div>
      <div className="detail-row">
        <span>Role</span>
        <strong>{user.role}</strong>
      </div>
      <div className="detail-row">
        <span>Status</span>
        <strong>{user.status}</strong>
      </div>
      <div className="detail-row">
        <span>Preferred Language</span>
        <strong>{user.language}</strong>
      </div>
    </aside>
  );
};

export default UserDetails;
