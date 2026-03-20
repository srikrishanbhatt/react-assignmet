const UserDetails = ({ user }) => {
  if (!user) return <div>Select a user</div>;

  return (
    <div className="details">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.status}</p>
      <p>Language: {user.language}</p>
    </div>
  );
};

export default UserDetails;