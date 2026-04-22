import type { IssueQueryParams } from "../types/issue";

interface Props {
  filters: IssueQueryParams;
  onFilterChange: (filters: IssueQueryParams) => void;
}

const IssueFilters = ({ filters, onFilterChange }: Props) => {

  const handleChange = (key: keyof IssueQueryParams, value: unknown) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleClearFilters = () => {
    onFilterChange({ page: 1, limit: 10 });
  };

  const hasActiveFilters = filters.search || filters.status || filters.priority || filters.severity;

  const selectClass =
    "h-9 px-3 pr-8 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition appearance-none cursor-pointer hover:border-slate-300";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-4">
      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search title or description..."
            className="w-full h-9 pl-9 pr-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition"
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status */}
          <div className="relative">
            <select
              className={selectClass}
              value={filters.status || ""}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="">All Status</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Priority */}
          <div className="relative">
            <select
              className={selectClass}
              value={filters.priority || ""}
              onChange={(e) => handleChange("priority", e.target.value)}
            >
              <option value="">All Priority</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Severity */}
          <div className="relative">
            <select
              className={selectClass}
              value={filters.severity || ""}
              onChange={(e) => handleChange("severity", e.target.value)}
            >
              <option value="">All Severity</option>
              <option value="MINOR">Minor</option>
              <option value="MAJOR">Major</option>
              <option value="CRITICAL">Critical</option>
            </select>
            <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Clear */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="h-9 px-3 text-sm rounded-xl border border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100 transition flex items-center gap-1.5 font-medium"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueFilters;