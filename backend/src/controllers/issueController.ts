import { Request, Response } from "express";
import Issue from "../models/Issue";
import { AuthRequest } from "../middleware/authMiddleware";

// CREATE ISSUE
export const createIssue = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, priority, severity } = req.body;

    const issue = await Issue.create({
      title,
      description,
      priority,
      severity,
      user: req.user?.userId,
    });

    res.status(201).json(issue);
  } catch {
    res.status(500).json({ message: "Error creating issue" });
  }
};



// GET ALL (with search, filter, pagination)
export const getIssues = async (req: AuthRequest, res: Response) => {
  try {
    const { search, status, priority, page = 1, limit = 10 } = req.query;

    const filter: any = { user: req.user?.userId };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const issues = await Issue.find(filter)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .sort({ createdAt: -1 });

    const total = await Issue.countDocuments(filter);

    res.json({ issues, total });
  } catch {
    res.status(500).json({ message: "Error fetching issues" });
  }
};



// GET SINGLE
export const getIssueById = async (req: Request, res: Response) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) return res.status(404).json({ message: "Not found" });

    res.json(issue);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};



// UPDATE
export const updateIssue = async (req: Request, res: Response) => {
  try {
    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(issue);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};



// DELETE
export const deleteIssue = async (req: Request, res: Response) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};



// STATUS COUNTS
export const getIssueStats = async (req: AuthRequest, res: Response) => {
  try {
    const stats = await Issue.aggregate([
      { $match: { user: req.user?.userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(stats);
  } catch {
    res.status(500).json({ message: "Stats error" });
  }
};