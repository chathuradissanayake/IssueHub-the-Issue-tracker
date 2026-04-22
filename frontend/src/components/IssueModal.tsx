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

const IssueModal = forwardRef<IssueModalRef, IssueModalProps>(({ width, onSubmit, onUpdate }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [issue, setIssue] = useState<Issue | null>(null);
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
      if (e.target === e.currentTarget) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      alert("Fill all fields");
      return;
    }
    if (!issue) {
      await onSubmit?.(form);
    } else {
      await onUpdate?.(issue._id, form);
    }
    setIsVisible(false);
    setIssue(null);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div className={`relative bg-white p-0 rounded-lg shadow-lg ${width || "w-full xl:w-2/3"}`}>
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-400 to-sky-400 px-6 py-4 flex items-center justify-between border-b-4 border-sky-500">
            <h2 className="text-xl font-semibold text-white">
              {!issue ? "Create New Issue" : "Edit Issue"}
            </h2>
            <button
              onClick={handleClose}
              className="text-white hover:text-cyan-200 transition-colors"
              aria-label="close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="border-b p-2 text-lg font-semibold"
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="border p-2"
                rows={4}
              />
              <div className="flex gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    {priorityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Severity</label>
                  <select
                    name="severity"
                    value={form.severity}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  >
                    {severityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt || "None"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {!issue ? "Create Issue" : "Update Issue"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default IssueModal;