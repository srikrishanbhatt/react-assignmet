import React, { useEffect, useMemo, useState } from "react";
import "./styles.css";
import { initialUsers } from "./data/users";
import SearchBar from "./components/SearchBar";
import FilterPanel from "./components/FilterPanel";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import AddUserForm from "./components/AddUserForm";
import { generateUserInsights } from "./services/groq";

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
  const [insightsByUserId, setInsightsByUserId] = useState(() => {
  const savedInsights = localStorage.getItem("userInsights");

    if (!savedInsights) {
      return {};
    }

    try {
      return JSON.parse(savedInsights);
    } catch (error) {
      return {};
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("userInsights", JSON.stringify(insightsByUserId));
  }, [insightsByUserId]);

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

  const generateInsightsForUser = async (user, { force = false } = {}) => {
    const cachedInsight = insightsByUserId[user.id];

    if (
      !force &&
      (cachedInsight?.status === "loading" || cachedInsight?.status === "success")
    ) {
      return;
    }

    setInsightsByUserId((prev) => ({
      ...prev,
      [user.id]: {
        status: "loading",
        text: prev[user.id]?.text ?? "",
        error: "",
      },
    }));

    try {
      const text = await generateUserInsights(user);

      setInsightsByUserId((prev) => ({
        ...prev,
        [user.id]: {
          status: "success",
          text,
          error: "",
        },
      }));
    } catch (error) {
      setInsightsByUserId((prev) => ({
        ...prev,
        [user.id]: {
          status: "error",
          text: prev[user.id]?.text ?? "",
          error: error.message || "Unable to generate insights right now.",
        },
      }));
    }
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
            insightsByUserId={insightsByUserId}
            onGenerateInsights={generateInsightsForUser}
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
