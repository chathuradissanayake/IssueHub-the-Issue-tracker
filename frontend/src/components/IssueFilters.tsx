import type { IssueQueryParams } from "../types/issue";

interface Props {
  filters: IssueQueryParams;
  onFilterChange: (filters: IssueQueryParams) => void;
}

const IssueFilters = ({ filters, onFilterChange }: Props) => {

  const handleChange = (key: keyof IssueQueryParams, value: unknown) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      page: 1,
      limit: 10,
    });
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">

      {/* Search */}
      <input
        type="text"
        placeholder="Search title or description..."
        className="border p-2 rounded"
        value={filters.search || ""}
        onChange={(e) => handleChange("search", e.target.value)}
      />

      {/* Status */}
      <select
        className="border p-2 rounded"
        value={filters.status || ""}
        onChange={(e) => handleChange("status", e.target.value)}
      >
        <option value="">All Status</option>
        <option value="OPEN">OPEN</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="RESOLVED">RESOLVED</option>
        <option value="CLOSED">CLOSED</option>
      </select>

      {/* Priority */}
      <select
        className="border p-2 rounded"
        value={filters.priority || ""}
        onChange={(e) => handleChange("priority", e.target.value)}
      >
        <option value="">All Priority</option>
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
      </select>

      {/* Severity */}
      <select
        className="border p-2 rounded"
        value={filters.severity || ""}
        onChange={(e) => handleChange("severity", e.target.value)}
      >
        <option value="">All Severity</option>
        <option value="MINOR">MINOR</option>
        <option value="MAJOR">MAJOR</option>
        <option value="CRITICAL">CRITICAL</option>
      </select>

      {/* Clear */}
      <button
        className="border p-2 rounded bg-red-500 text-white hover:bg-red-600"
        onClick={handleClearFilters}
      >
        Clear Filters
      </button>

    </div>
  );
};

export default IssueFilters;