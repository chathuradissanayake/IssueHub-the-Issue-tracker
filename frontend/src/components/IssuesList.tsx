// src/components/IssuesList.tsx
import { useRef } from "react";
import type { Issue, Status, Priority, Severity } from "../types/issue";
import IssueTile from "./IssueTile";
import IssueModal, { type IssueModalRef } from "./IssueModal";
import { createIssue, updateIssue } from "../services/issueService";

interface IssuesListProps {
  issues: Issue[];
}

const IssuesList = ({ issues }: IssuesListProps) => {
  const modalRef = useRef<IssueModalRef>(null);

  const handleTileClick = (issue: Issue) => {
    modalRef.current?.open(issue); // Open modal in edit mode
  };

  const handleNewIssue = () => {
    modalRef.current?.open(); // Open modal in create mode
  };

  const handleCreateIssue = async (data: { title: string; description: string; status: Status; priority: Priority; severity: Severity | "" }) => {
    try {
      await createIssue({
        ...data,
        severity: data.severity === "" ? undefined : data.severity,
      });
      window.location.reload(); // Reload or refetch issues
      
    } catch (err) {
      alert("Failed to create issue");
      console.error(err);
    }
  };

  const handleUpdateIssue = async (id: string, data: { title: string; description: string; status: Status; priority: Priority; severity: Severity | "" }) => {
    try {
      await updateIssue(id, {
        ...data,
        severity: data.severity === "" ? undefined : data.severity,
      });
      window.location.reload(); // Reload or refetch issues
    } catch (err) {
      alert("Failed to update issue");
      console.error(err);
    }
  };

  return (
    <>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* New Issue Button */}
        <button
          onClick={handleNewIssue}
          className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-lg p-8 bg-white hover:bg-blue-50 transition cursor-pointer"
        >
          <span className="text-4xl text-blue-400 mb-2">+</span>
          <span className="font-semibold text-blue-600">New Issue</span>
        </button>
        {/* Issue Tiles */}
        {issues.map((issue) => (
          <div key={issue._id} onClick={() => handleTileClick(issue)} className="cursor-pointer">
            <IssueTile issue={issue} />
          </div>
        ))}
      </div>
      <IssueModal ref={modalRef} onSubmit={handleCreateIssue} onUpdate={handleUpdateIssue} />
    </>
  );
};

export default IssuesList;