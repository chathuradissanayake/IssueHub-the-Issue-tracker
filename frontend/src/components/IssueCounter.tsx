import { useEffect, useState } from "react";
import { Circle, Loader2, CheckCircle2, Lock } from "lucide-react"; // Import lucide-react icons
import { getStats } from "../services/issueService";
import type { Status } from "../types/issue";

type StatsMap = Record<Status, number>;

const defaultStats: StatsMap = {
  OPEN: 0,
  IN_PROGRESS: 0,
  RESOLVED: 0,
  CLOSED: 0,
};

const statusIcon = {
  OPEN: Circle,
  IN_PROGRESS: Loader2,
  RESOLVED: CheckCircle2,
  CLOSED: Lock,
};

const IssueCounter = () => {
  const [stats, setStats] = useState<StatsMap>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStats();
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

  const cards: {
    key: Status;
    label: string;
    icon: keyof typeof statusIcon;
    iconColor: string; // Add icon color
    numColor: string;
    badge: string;
    bar: string;
  }[] = [
    {
      key: "OPEN",
      label: "Open",
      icon: "OPEN",
      iconColor: "text-blue-500", // Icon color for OPEN
      numColor: "text-blue-600",
      badge: "bg-blue-50 text-blue-500",
      bar: "bg-blue-400",
    },
    {
      key: "IN_PROGRESS",
      label: "In Progress",
      icon: "IN_PROGRESS",
      iconColor: "text-amber-500", // Icon color for IN_PROGRESS
      numColor: "text-amber-500",
      badge: "bg-amber-50 text-amber-500",
      bar: "bg-amber-400",
    },
    {
      key: "RESOLVED",
      label: "Resolved",
      icon: "RESOLVED",
      iconColor: "text-emerald-500", // Icon color for RESOLVED
      numColor: "text-emerald-600",
      badge: "bg-emerald-50 text-emerald-500",
      bar: "bg-emerald-400",
    },
    {
      key: "CLOSED",
      label: "Closed",
      icon: "CLOSED",
      iconColor: "text-slate-500", // Icon color for CLOSED
      numColor: "text-slate-500",
      badge: "bg-slate-100 text-slate-500",
      bar: "bg-slate-300",
    },
  ];

  const total = Object.values(stats).reduce((a, b) => a + b, 0);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse h-28" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(({ key, label, icon, iconColor, numColor, badge, bar }) => {
        const count = stats[key];
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;
        const IconComponent = statusIcon[icon]; // Dynamically get the icon component

        return (
          <div
            key={key}
            className="bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold tracking-wide uppercase ${badge} px-2 py-0.5 rounded-full`}>
                {label}
              </span>
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base`}>
                <IconComponent className={`w-5 h-5 ${iconColor}`} /> {/* Apply icon color */}
              </span>
            </div>
            <p className={`text-3xl font-bold tracking-tight ${numColor} mb-3`}>{count}</p>
            {/* Progress bar */}
            <div className="w-full bg-slate-100 rounded-full h-1.5">
              <div
                className={`${bar} h-1.5 rounded-full transition-all duration-700`}
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="text-slate-400 text-xs mt-1">{pct}% of total</p>
          </div>
        );
      })}
    </div>
  );
};

export default IssueCounter;