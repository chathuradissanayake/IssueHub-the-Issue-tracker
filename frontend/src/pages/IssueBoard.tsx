import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getIssues } from "../services/issueService";
import type { Issue } from "../types/issue";
import IssuesList from "../components/IssuesList";
import IssueCounter from "../components/IssueCounter";

interface JwtPayload {
  userId: string;
  role: string;
  email: string;
  exp: number;
  iat?: number;
}

const IssueBoard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🔐 Decode token (optional UI/debug use)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        const expiryDate = new Date(decoded.exp * 1000);
        const remainingTime = decoded.exp * 1000 - Date.now();

        console.log("JWT Token:", token);
        console.log("Logged User:", decoded.email);
        console.log("Role:", decoded.role);
        console.log("Token Expiry:", expiryDate.toLocaleString());
        console.log("Time Remaining (ms):", remainingTime);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  // 📦 Fetch issues and stats from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const issuesRes = await getIssues({ page: 1, limit: 10 });

        setIssues(issuesRes.data.issues);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issue Board 🚀</h1>

      {loading ? <p>Loading stats...</p> : <IssueCounter />}

      {/* Loading state */}
      {loading && <p>Loading issues...</p>}

      {/* Empty state */}
      {!loading && issues.length === 0 && (
        <p className="text-gray-500">No issues found</p>
      )}

      {/* Issue List */}
      <div className="grid gap-3 mt-6">
        <IssuesList issues={issues} />
      </div>
    </div>
  );
};

export default IssueBoard;