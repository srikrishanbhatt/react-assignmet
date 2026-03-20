import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { initialUsers } from "./data/users";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import AddUserForm from "./components/AddUserForm";

const App = () => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");

    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.length > 0 ? parsed : initialUsers;
    }

    return initialUsers;
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      return (
        (user.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(debouncedSearch.toLowerCase())) &&
        (roleFilter ? user.role === roleFilter : true) &&
        (statusFilter ? user.status === statusFilter : true)
      );
    });
  }, [users, debouncedSearch, roleFilter, statusFilter]);

  const addUser = (newUser) => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
  };

  return (
    <div className="container">
      <h2>User Directory</h2>

      <SearchBar search={search} setSearch={setSearch} />

      <FilterPanel
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="main">
        <UserList
          users={filteredUsers}
          onSelect={setSelectedUser}
          selectedUserId={selectedUser?.id}
        />
        <UserDetails user={selectedUser} />
      </div>

      <AddUserForm onAdd={addUser} />
    </div>
  );
};

export default App;
