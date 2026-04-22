import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getIssues } from "../services/issueService";
import type { Issue, IssueQueryParams } from "../types/issue";
import IssuesList from "../components/IssuesList";
import IssueCounter from "../components/IssueCounter";
import IssueFilters from "../components/IssueFilters";
import LogoutModal from "../components/modals/LogoutModal";

const IssueBoard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<IssueQueryParams>({
    page: 1,
    limit: 10,
  });

  // Profile UI state
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  interface JwtPayload {
    userId: string;
    role: string;
    email: string;
    exp: number;
    iat?: number;
  }

  // Decode user
  const userEmail = useMemo(() => {
    const token = localStorage.getItem("token");
    if (!token) return "";

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.email;
    } catch (error) {
      console.error("Invalid token:", error);
      return "";
    }
  }, []);

  // Fetch issues
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
      {/* Top Nav */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="font-bold text-slate-800 text-lg tracking-tight">
              IssueHub
            </span>
          </div>

          {/* Profile */}
          {userEmail && (
            <div className="relative">
              {/* Clickable Profile */}
              <button
                onClick={() => setIsProfileMenuOpen((v) => !v)}
                className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 transition rounded-full px-3 py-1.5"
              >
                {/* Avatar */}
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400 flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold">
                    {userEmail[0].toUpperCase()}
                  </span>
                </div>

                {/* Email */}
                <span className="text-slate-600 text-xs font-medium max-w-[140px] truncate">
                  {userEmail}
                </span>

                {/* Arrow */}
                <svg
                  className={`w-3 h-3 text-slate-500 transition-transform ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {isProfileMenuOpen && (
                <>
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {userEmail}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Logged in user
                      </p>
                    </div>

                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>

                  {/* Outside click */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileMenuOpen(false)}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-7">
          <IssueCounter />
        </div>

        <div className="mb-6">
          <IssueFilters filters={filters} onFilterChange={handleFilterChange} />
        </div>

        <div>
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <div className="w-8 h-8 border-2 border-violet-300 border-t-violet-500 rounded-full animate-spin" />
              <p className="text-slate-400 text-sm">Fetching issues...</p>
            </div>
          )}

          {!loading && issues.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 font-medium">No issues found</p>
            </div>
          )}

          {!loading && issues.length > 0 && <IssuesList issues={issues} />}
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isVisible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default IssueBoard;