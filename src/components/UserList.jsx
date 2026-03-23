import UserCard from "./UserCard";

const UserList = ({
  users,
  onSelect,
  selectedUserId,
  insightsByUserId,
  onGenerateInsights,
}) => {
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
          insightState={insightsByUserId[user.id]}
          onGenerateInsights={onGenerateInsights}
        />
      ))}
    </div>
  );
};

export default UserList;
