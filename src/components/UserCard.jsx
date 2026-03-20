const UserCard = ({ user, onSelect, isSelected }) => {
  return (
    <button
      type="button"
      className={`card user-card${isSelected ? " selected" : ""}`}
      onClick={() => onSelect(user)}
    >
      <h4>{user.name}</h4>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>
      <p>Status: {user.status}</p>
      <p>Language: {user.language}</p>
    </button>
  );
};

export default UserCard;
