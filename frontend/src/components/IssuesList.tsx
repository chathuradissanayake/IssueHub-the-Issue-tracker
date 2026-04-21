// src/components/IssuesList.tsx
import type { Issue } from "../types/issue";
import IssueTile from "./IssueTile";

interface IssuesListProps {
  issues: Issue[];
}

const IssuesList = ({ issues }: IssuesListProps) => (
  <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {issues.map((issue) => (
      <IssueTile key={issue._id} issue={issue} />
    ))}
  </div>
);

export default IssuesList;