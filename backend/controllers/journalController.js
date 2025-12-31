import Journal from "../models/Journal.js";

export const getJournals = async (req, res) => {
  const data = await Journal.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(data);
};

export const createJournal = async (req, res) => {
  const journal = await Journal.create({ ...req.body, user: req.userId });
  res.status(201).json(journal);
};

export const updateJournal = async (req, res) => {
  try {
    console.log("UPDATE BODY:", req.body);
    console.log("UPDATE PARAM ID:", req.params.id);
    console.log("USER ID:", req.userId);

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Empty update body" });
    }

    const journal = await Journal.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId
      },
      { $set: req.body },
      { new: true }
    );

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    res.json(journal);
  } catch (error) {
    console.error("❌ UPDATE ERROR FULL:", error);
    res.status(500).json({ message: "Update failed" });
  }
};



export const deleteJournal = async (req, res) => {
  await Journal.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
