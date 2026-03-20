import { useState } from "react";

const AddUserForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    language: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (error) {
      setError("");
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "Enter a valid email address.";
    if (!form.role) return "Role is required.";
    if (!form.status) return "Status is required.";
    if (!form.language.trim()) return "Language is required.";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    onAdd({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      language: form.language.trim(),
    });

    setError("");
    setForm({
      name: "",
      email: "",
      role: "",
      status: "",
      language: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-user-form">
      <h3>Add User</h3>
      {error ? <p className="form-error">{error}</p> : null}

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="">Select Role</option>
        <option>Admin</option>
        <option>Editor</option>
        <option>Viewer</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="">Select Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <input
        name="language"
        placeholder="Preferred Language"
        value={form.language}
        onChange={handleChange}
      />

      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUserForm;
