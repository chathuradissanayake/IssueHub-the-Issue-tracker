// src/components/modals/IssueModal.tsx
import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "../common/Modal";
import type { Issue } from "../../types/issue";

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

  return (
    <Modal ref={undefined} width={props.width || "w-96"} isVisible={isVisible} onClose={() => setIsVisible(false)}>
      {issue && (
        <div>
          <h2 className="text-xl font-bold mb-2">{issue.title}</h2>
          <p className="mb-2">{issue.description}</p>
          <div className="flex gap-2 mt-2">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
              {issue.status}
            </span>
            <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
              {issue.priority}
            </span>
            {issue.severity && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded">
                {issue.severity}
              </span>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
});

export default IssueModal;