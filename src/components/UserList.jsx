import UserCard from "./UserCard";

const UserList = ({ users, onSelect, selectedUserId }) => {
  if (users.length === 0) {
    return <div className="empty-state">No users found.</div>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onSelect={onSelect}
          isSelected={user.id === selectedUserId}
        />
      ))}
    </div>
  );
};

export default UserList;
