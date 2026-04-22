import { useEffect, useMemo, useState } from "react";
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

  const userEmail = useMemo(() => {
    const token = localStorage.getItem("token");
    if (!token) return "";

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Logged User:", decoded.email);
      console.log("Role:", decoded.role);
      return decoded.email;
    } catch (error) {
      console.error("Invalid token:", error);
      return "";
    }
  }, []);


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


  const handleFilterChange = (newFilters: IssueQueryParams) => {
    setFilters({ page: 1, limit: 10, ...newFilters });
  };

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top Nav Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">IssueHub</span>
          </div>
          {userEmail && (
            <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1.5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">{userEmail[0].toUpperCase()}</span>
              </div>
              <span className="text-slate-600 text-xs font-medium">{userEmail}</span>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        {/* <header className="mb-8">
          <div className="flex items-end gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Issue Board</h1>
            <span className="mb-0.5 text-2xl">🚀</span>
          </div>
          <p className="text-slate-400 text-sm font-normal">Track, manage, and resolve your team's issues in one place.</p>
        </header> */}

        {/* Counter */}
        <div className="mb-7">
          <IssueCounter />
        </div>

        {/* Filters */}
        <div className="mb-6">
          <IssueFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        {/* Content */}
        <div>
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-8 h-8 border-2 border-violet-300 border-t-violet-500 rounded-full animate-spin" />
              <p className="text-slate-400 text-sm">Fetching issues...</p>
            </div>
          )}

          {!loading && issues.length === 0 && (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">No issues found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or create a new issue.</p>
            </div>
          )}

          {!loading && issues.length > 0 && (
            <IssuesList issues={issues} />
          )}
        </div>
      </div>
    </div>
  );
};

export default IssueBoard;