import api from "./api";
import type {CreateIssuePayload, UpdateIssuePayload, IssueQueryParams, Issue} from "../types/issue";

// Get issues
export const getIssues = (params: IssueQueryParams) =>
  api.get<{ issues: Issue[]; total: number }>("/issues", { params });

// Create issue
export const createIssue = (data: CreateIssuePayload) =>
  api.post<Issue>("/issues", data);

// Update issue
export const updateIssue = (id: string, data: UpdateIssuePayload) =>
  api.put<Issue>(`/issues/${id}`, data);

// Delete issue
export const deleteIssue = (id: string) =>
  api.delete<{ message: string }>(`/issues/${id}`);

// Get stats
export const getStats = () =>
  api.get<{ _id: string; count: number }[]>("/issues/stats");