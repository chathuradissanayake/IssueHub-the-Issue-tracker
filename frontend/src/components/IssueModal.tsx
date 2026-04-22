// src/components/IssueModal.tsx
import React, { forwardRef, useImperativeHandle, useState, useCallback } from "react";
import type { Issue, Status, Priority, Severity } from "../types/issue";

export interface IssueModalRef {
  open: (issue?: Issue) => void;
  close: () => void;
}

interface IssueModalProps {
  width?: string;
  onSubmit?: (data: {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    severity: Severity | "";
  }) => Promise<void>;
  onUpdate?: (id: string, data: {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    severity: Severity | "";
  }) => Promise<void>;
}

const statusOptions: Status[] = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
const priorityOptions: Priority[] = ["LOW", "MEDIUM", "HIGH"];
const severityOptions: (Severity | "")[] = ["", "MINOR", "MAJOR", "CRITICAL"];

const statusMeta: Record<Status, { dot: string; label: string }> = {
  OPEN:        { dot: "bg-blue-400",    label: "Open" },
  IN_PROGRESS: { dot: "bg-amber-400",   label: "In Progress" },
  RESOLVED:    { dot: "bg-emerald-400", label: "Resolved" },
  CLOSED:      { dot: "bg-slate-300",   label: "Closed" },
};

const priorityMeta: Record<Priority, { color: string; label: string }> = {
  HIGH:   { color: "text-rose-500",   label: "High" },
  MEDIUM: { color: "text-orange-500", label: "Medium" },
  LOW:    { color: "text-slate-400",  label: "Low" },
};

const severityMeta: Record<string, { color: string; label: string }> = {
  CRITICAL: { color: "text-red-500",    label: "Critical" },
  MAJOR:    { color: "text-orange-500", label: "Major" },
  MINOR:    { color: "text-slate-400",  label: "Minor" },
  "":       { color: "text-slate-400",  label: "None" },
};

const IssueModal = forwardRef<IssueModalRef, IssueModalProps>(({ width, onSubmit, onUpdate }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [issue, setIssue] = useState<Issue | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "OPEN" as Status,
    priority: "MEDIUM" as Priority,
    severity: "" as Severity | "",
  });

  useImperativeHandle(ref, () => ({
    open: (issue?: Issue) => {
      setIssue(issue || null);
      setIsVisible(true);
      setForm(
        issue
          ? {
              title: issue.title,
              description: issue.description,
              status: issue.status,
              priority: issue.priority,
              severity: issue.severity || "",
            }
          : {
              title: "",
              description: "",
              status: "OPEN",
              priority: "MEDIUM",
              severity: "",
            }
      );
    },
    close: () => setIsVisible(false),
  }));

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setIssue(null);
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (e.target === e.currentTarget) handleClose();
    },
    [handleClose]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      alert("Fill all fields");
      return;
    }
    setSubmitting(true);
    try {
      if (!issue) {
        await onSubmit?.(form);
      } else {
        await onUpdate?.(issue._id, form);
      }
    } finally {
      setSubmitting(false);
    }
    setIsVisible(false);
    setIssue(null);
  };

  if (!isVisible) return null;

  const selectClass =
    "w-full h-9 px-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition appearance-none cursor-pointer";

  return (
    <div
      className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl shadow-slate-200/80 border border-slate-100 overflow-hidden flex flex-col ${width || "w-full max-w-lg"}`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Coloured top strip keyed to current status */}
        <div className={`h-1 w-full ${statusMeta[form.status]?.dot ?? "bg-violet-400"} transition-colors duration-300`} />

        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
              {!issue ? (
                <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              )}
            </div>
            <h2 className="text-sm font-semibold text-slate-800">
              {!issue ? "Create New Issue" : "Edit Issue"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition"
            aria-label="close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                Title <span className="text-rose-400">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Short, descriptive issue title..."
                className="w-full h-10 px-3 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition font-medium"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                Description <span className="text-rose-400">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the issue in detail..."
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 transition resize-none leading-relaxed"
                rows={4}
              />
            </div>

            {/* Selects row */}
            <div className="grid grid-cols-3 gap-3">
              {/* Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Status
                </label>
                <div className="relative">
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {statusMeta[opt].label}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Priority
                </label>
                <div className="relative">
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    {priorityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {priorityMeta[opt].label}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Severity */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">
                  Severity
                </label>
                <div className="relative">
                  <select
                    name="severity"
                    value={form.severity}
                    onChange={handleChange}
                    className={selectClass}
                  >
                    {severityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {severityMeta[opt]?.label ?? "None"}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Preview badges */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-xs text-slate-400 font-medium mr-1">Preview:</span>
              <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusMeta[form.status]?.dot}`} />
                <span className="text-slate-600">{statusMeta[form.status]?.label}</span>
              </span>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 ${priorityMeta[form.priority]?.color}`}>
                {priorityMeta[form.priority]?.label}
              </span>
              {form.severity && (
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white border border-slate-200 ${severityMeta[form.severity]?.color}`}>
                  {severityMeta[form.severity]?.label}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-500 text-sm font-medium hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 h-10 rounded-xl bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold transition disabled:opacity-60 flex items-center justify-center gap-2 shadow-sm shadow-violet-200"
              >
                {submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {!issue ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {!issue ? "Create Issue" : "Save Changes"}
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
});

export default IssueModal;