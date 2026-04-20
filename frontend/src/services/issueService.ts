// src/services/issueService.ts
import api from "./api";

export const getIssues = () => api.get("/issues");

// export const createIssue = (data: any) =>
//   api.post("/issues", data);