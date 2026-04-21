import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getIssues } from "../services/issueService";
import type { Issue, IssueQueryParams } from "../types/issue";
import IssuesList from "../components/IssuesList";
import IssueCounter from "../components/IssueCounter";
import IssueFilters from "../components/IssueFilters";

interface JwtPayload {
  userId: string;
  role: string;
  email: string;
  exp: number;
  iat?: number;
}

const IssueBoard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<IssueQueryParams>({
    page: 1,
    limit: 10,
  });

  // 🔐 Token debug (unchanged)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        console.log("Logged User:", decoded.email);
        console.log("Role:", decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  // 📦 Fetch issues whenever filters change
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await getIssues(filters);

        setIssues(res.data.issues);
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  // 🎯 Single source of truth for filters
  const handleFilterChange = (newFilters: IssueQueryParams) => {
    setFilters({
      page: 1,
      limit: 10,
      ...newFilters,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issue Board 🚀</h1>

      <IssueCounter />

      <IssueFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {loading && <p>Loading issues...</p>}

      {!loading && issues.length === 0 && (
        <p className="text-gray-500">No issues found for the selected filters.</p>
      )}

      {!loading && issues.length > 0 && (
        <div className="grid gap-3 mt-6">
          <IssuesList issues={issues} />
        </div>
      )}
    </div>
  );
};

export default IssueBoard;