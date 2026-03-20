const FilterPanel = ({ roleFilter, setRoleFilter, statusFilter, setStatusFilter }) => {
  return (
    <div className="filter-panel">
      <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
        <option value="">All Roles</option>
        <option>Admin</option>
        <option>Editor</option>
        <option>Viewer</option>
      </select>

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="">All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>
  );
};

export default FilterPanel;
