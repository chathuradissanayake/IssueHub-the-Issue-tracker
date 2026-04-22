import type { Issue } from "../types/issue";

interface IssueTileProps {
  issue: Issue;
}

const IssueTile = ({ issue }: IssueTileProps) => {

  const statusConfig: Record<string, { dot: string; badge: string; border: string; label: string }> = {
    OPEN:        { dot: "bg-blue-400",    badge: "bg-blue-50 text-blue-600",    border: "border-blue-100",   label: "Open" },
    IN_PROGRESS: { dot: "bg-amber-400",   badge: "bg-amber-50 text-amber-600",  border: "border-amber-100",  label: "In Progress" },
    RESOLVED:    { dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-600", border: "border-emerald-100", label: "Resolved" },
    CLOSED:      { dot: "bg-slate-300",   badge: "bg-slate-100 text-slate-500", border: "border-slate-200",  label: "Closed" },
  };

  const priorityConfig: Record<string, { badge: string; label: string }> = {
    HIGH:   { badge: "bg-rose-50 text-rose-600",     label: "High" },
    MEDIUM: { badge: "bg-orange-50 text-orange-500", label: "Medium" },
    LOW:    { badge: "bg-slate-100 text-slate-500",  label: "Low" },
  };

  const severityConfig: Record<string, { badge: string; label: string }> = {
    CRITICAL: { badge: "bg-red-50 text-red-600",      label: "Critical" },
    MAJOR:    { badge: "bg-orange-50 text-orange-500",label: "Major" },
    MINOR:    { badge: "bg-slate-100 text-slate-500", label: "Minor" },
  };

  const status = statusConfig[issue.status] ?? statusConfig["CLOSED"];
  const priority = priorityConfig[issue.priority];
  const severity = issue.severity ? severityConfig[issue.severity] : null;

  // 🕒 Dates
  const created = issue?.createdAt ? new Date(issue.createdAt) : null;
  const updated = issue?.updatedAt ? new Date(issue.updatedAt) : null;
  const isUpdated = updated && created && updated.getTime() > created.getTime();
  const label = isUpdated ? "Updated" : "Created";
  const time = (isUpdated ? updated : created)?.toLocaleDateString(undefined, {
    month: "short", day: "numeric", year: "numeric"
  });

  return (
    <div className={`group bg-white rounded-2xl border ${status.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-[168px] flex flex-col overflow-hidden`}>

      {/* Status indicator strip */}
      <div className={`h-1 w-full ${status.dot} opacity-70`} />

      {/* Body */}
      <div className="flex-1 px-4 pt-3 pb-2 flex flex-col overflow-hidden">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-semibold text-sm text-slate-800 line-clamp-1 flex-1 leading-snug">
            {issue.title}
          </h3>
          <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-1 ${status.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1">
          {issue.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {priority && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priority.badge}`}>
              {priority.label}
            </span>
          )}
          {severity && (
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${severity.badge}`}>
              {severity.label}
            </span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center gap-1.5">
        <svg className="w-3 h-3 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-[10px] text-slate-400">
          <span className="font-medium text-slate-500">{label}: </span>{time}
        </p>
      </div>
    </div>
  );
};

export default IssueTile;