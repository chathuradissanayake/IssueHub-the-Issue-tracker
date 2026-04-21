// src/components/modals/IssueModal.tsx
import React, { forwardRef, useImperativeHandle, useState, useCallback } from "react";
import type { Issue } from "../types/issue";

export interface IssueModalRef {
  open: (issue: Issue) => void;
  close: () => void;
}

const IssueModal = forwardRef<IssueModalRef, { width?: string }>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [issue, setIssue] = useState<Issue | null>(null);

  useImperativeHandle(ref, () => ({
    open: (issue: Issue) => {
      setIssue(issue);
      setIsVisible(true);
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

  // Derived timestamp info for display
  const created = issue?.createdAt ? new Date(issue.createdAt) : null;
  const updated = issue?.updatedAt ? new Date(issue.updatedAt) : null;
  const isUpdated = updated && created && updated.getTime() > created.getTime();
  const tsLabel = isUpdated ? "Updated" : "Created";
  const tsTime = (isUpdated ? updated : created)?.toLocaleString();

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleBackdropClick}
    >
      <div className={`relative bg-white p-0 rounded-lg shadow-lg ${props.width || "w-full xl:w-2/3"}`}>
        <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-400 to-sky-400 px-6 py-4 flex items-center justify-between border-b-4 border-sky-500">
            <div>
              <h2 className="text-xl font-semibold text-white">{issue?.title}</h2>
              {tsTime && (
                <p className="text-xs text-cyan-100 mt-1">
                  {tsLabel}: {tsTime}
                </p>
              )}
            </div>
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
            <p className="mb-4 text-gray-800">{issue?.description}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                {issue?.status}
              </span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                {issue?.priority}
              </span>
              {issue?.severity && (
                <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">
                  {issue.severity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default IssueModal;