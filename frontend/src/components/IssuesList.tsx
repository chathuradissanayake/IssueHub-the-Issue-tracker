import { useRef } from "react";
import type { Issue, Status, Priority, Severity } from "../types/issue";
import IssueTile from "./IssueTile";
import IssueModal, { type IssueModalRef } from "./IssueModal";
import { createIssue, updateIssue } from "../services/issueService";

interface IssuesListProps {
  issues: Issue[];
}

interface NewIssueTileProps {
  empty?: boolean;
  onClick: () => void;
}

const NewIssueTile = ({ empty, onClick }: NewIssueTileProps) => (
  <div
    onClick={onClick}
    className={`group cursor-pointer rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 flex flex-col items-center justify-center gap-2 ${empty ? "min-h-[220px]" : "h-[168px]"}`}
  >
    <div className="w-10 h-10 rounded-xl bg-white border border-violet-200 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
      <svg className="w-5 h-5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    </div>
    <p className="text-violet-500 font-semibold text-sm">New Issue</p>
  </div>
);

const IssuesList = ({ issues }: IssuesListProps) => {
  const modalRef = useRef<IssueModalRef>(null);

  const handleTileClick = (issue: Issue) => {
    modalRef.current?.open(issue);
  };

  const handleNewIssue = () => {
    modalRef.current?.open();
  };

  const handleCreateIssue = async (data: {
    title: string;
    description: string;
    status: Status;
    priority: Priority;
    severity: Severity | "";
  }) => {
    try {
      await createIssue({ ...data, severity: data.severity === "" ? undefined : data.severity });
      window.location.reload();
    } catch (err) {
      alert("Failed to create issue");
      console.error(err);
    }
  };

  const handleUpdateIssue = async (
    id: string,
    data: {
      title: string;
      description: string;
      status: Status;
      priority: Priority;
      severity: Severity | "";
    }
  ) => {
    try {
      await updateIssue(id, { ...data, severity: data.severity === "" ? undefined : data.severity });
      window.location.reload();
    } catch (err) {
      alert("Failed to update issue");
      console.error(err);
    }
  };

  if (!issues.length) {
    return (
      <>
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          <NewIssueTile empty onClick={handleNewIssue} />
          <div className="col-span-full text-center py-10">
            <p className="text-slate-400 text-base">No issues yet — create your first one!</p>
          </div>
        </div>
        <IssueModal ref={modalRef} onSubmit={handleCreateIssue} onUpdate={handleUpdateIssue} />
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        <NewIssueTile onClick={handleNewIssue} />
        {issues.map((issue) => (
          <div
            key={issue._id}
            onClick={() => handleTileClick(issue)}
            className="cursor-pointer"
          >
            <IssueTile issue={issue} />
          </div>
        ))}
      </div>
      <IssueModal ref={modalRef} onSubmit={handleCreateIssue} onUpdate={handleUpdateIssue} />
    </>
  );
};

export default IssuesList;