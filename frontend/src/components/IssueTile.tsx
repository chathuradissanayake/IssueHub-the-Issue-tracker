// src/components/IssueTile.tsx
import type { Issue } from "../types/issue";

interface IssueTileProps {
  issue: Issue;
}

const IssueTile = ({ issue }: IssueTileProps) => (
  <div className="p-4 border rounded-lg shadow-sm bg-white">
    <h2 className="font-semibold text-lg">{issue.title}</h2>
    <p className="text-sm text-gray-600">{issue.description}</p>
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
);

export default IssueTile;