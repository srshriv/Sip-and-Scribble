import Journal from "../models/Journal.js";

export const getJournals = async (req, res) => {
  const journals = await Journal.find({ user: req.userId }).sort({
    createdAt: -1,
  });
  res.json(journals);
};

export const createJournal = async (req, res) => {
  const { title, content, mood, tags } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const journal = await Journal.create({
    title,
    content,
    mood,
    tags,
    user: req.userId,
  });

  res.status(201).json(journal);
};

export const updateJournal = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Nothing to update" });
  }

  // Strip fields that should never be updated by the client
  const { user: _u, _id: _i, ...safeBody } = req.body;

  const journal = await Journal.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { $set: safeBody },
    { new: true, runValidators: true }
  );

  if (!journal) {
    return res.status(404).json({ message: "Journal not found" });
  }

  res.json(journal);
};

export const deleteJournal = async (req, res) => {
  const journal = await Journal.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  if (!journal) {
    return res.status(404).json({ message: "Journal not found" });
  }

  res.json({ message: "Deleted" });
};
