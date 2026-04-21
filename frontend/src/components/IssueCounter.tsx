// src/components/IssueCounter.tsx
import { useEffect, useState } from "react";
import { getStats } from "../services/issueService";
import type { Status } from "../types/issue";

type StatsMap = Record<Status, number>;

const defaultStats: StatsMap = {
  OPEN: 0,
  IN_PROGRESS: 0,
  RESOLVED: 0,
  CLOSED: 0,
};

const IssueCounter = () => {
  const [stats, setStats] = useState<StatsMap>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats();

        // API returns: [{ _id: "OPEN", count: 3 }, ...]
        const data = res.data;

        const mapped: StatsMap = { ...defaultStats };

        data.forEach((item) => {
          if (item._id in mapped) {
            mapped[item._id as Status] = item.count;
          }
        });

        setStats(mapped);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const getColor = (status: Status) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-600";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-600";
      case "RESOLVED":
        return "bg-green-100 text-green-600";
      case "CLOSED":
        return "bg-gray-200 text-gray-700";
      default:
        return "";
    }
  };

  if (loading) return <p>Loading stats...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {Object.entries(stats).map(([status, count]) => (
        <div
          key={status}
          className={`p-4 rounded-lg shadow-sm ${getColor(status as Status)}`}
        >
          <p className="text-sm font-medium">{status.replace("_", " ")}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      ))}
    </div>
  );
};

export default IssueCounter;