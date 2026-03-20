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
      <header className="hero">
        <div>
          <p className="eyebrow">React User Directory</p>
          <h1>User Directory</h1>
          <p className="hero-copy">
            Browse team members, filter by role or status, and add new users in one
            place.
          </p>
        </div>
        <div className="hero-stat">
          <span className="hero-stat-value">{filteredUsers.length}</span>
          <span className="hero-stat-label">Users shown</span>
        </div>
      </header>

      <section className="toolbar">
        <SearchBar search={search} setSearch={setSearch} />

        <FilterPanel
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </section>

      <div className="main">
        <section className="panel list-panel">
          <div className="panel-header">
            <h2>Users</h2>
            <span>{users.length} total</span>
          </div>
          <UserList
            users={filteredUsers}
            onSelect={setSelectedUser}
            selectedUserId={selectedUser?.id}
          />
        </section>
        <UserDetails user={selectedUser} />
      </div>

      <section className="panel form-panel">
        <AddUserForm onAdd={addUser} />
      </section>
    </div>
  );
};

export default App;
