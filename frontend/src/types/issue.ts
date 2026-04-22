export type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type Priority = "LOW" | "MEDIUM" | "HIGH";
export type Severity = "MINOR" | "MAJOR" | "CRITICAL";

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  severity?: Severity;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIssuePayload {
  title: string;
  description: string;
  priority?: Priority;
  severity?: Severity;
}

export interface UpdateIssuePayload {
  title?: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  severity?: Severity;
}

export interface IssueQueryParams {
  search?: string;
  status?: Status;
  priority?: Priority;
  severity?: Severity;
  page?: number;
  limit?: number;
}