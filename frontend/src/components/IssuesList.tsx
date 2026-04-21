// src/components/IssuesList.tsx
import React, { useRef } from "react";
import type { Issue } from "../types/issue";
import IssueTile from "./IssueTile";
import IssueModal, { type IssueModalRef } from "./modals/IssueModal";

interface IssuesListProps {
  issues: Issue[];
}

const IssuesList = ({ issues }: IssuesListProps) => {
  const modalRef = useRef<IssueModalRef>(null);

  const handleTileClick = (issue: Issue) => {
    modalRef.current?.open(issue);
  };

  return (
    <>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {issues.map((issue) => (
          <div key={issue._id} onClick={() => handleTileClick(issue)} className="cursor-pointer">
            <IssueTile issue={issue} />
          </div>
        ))}
      </div>
      <IssueModal ref={modalRef} />
    </>
  );
};

export default IssuesList;