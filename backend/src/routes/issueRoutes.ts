import express from "express";
import {createIssue, getIssues, getIssueById, updateIssue, deleteIssue, getIssueStats} from "../controllers/issueController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.use(protect);

router.post("/", createIssue);
router.get("/", getIssues);
router.get("/stats", getIssueStats);
router.get("/:id", getIssueById);
router.put("/:id", updateIssue);
router.delete("/:id", deleteIssue);

export default router;