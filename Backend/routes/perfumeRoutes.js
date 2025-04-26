const express = require("express");
const router = express.Router();
const Perfume = require("../models/perfumeModel"); // Import Perfume model

// 1️.Get all perfumes from MongoDB
router.get("/", async (req, res) => {
  try {
    const perfumes = await Perfume.find(); // Fetch from MongoDB
    res.json(perfumes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching perfumes", error });
  }
});

// 2️. Get a single perfume by ID
router.get("/:id", async (req, res) => {
  try {
    const perfume = await Perfume.findById(req.params.id);
    if (perfume) {
      res.json(perfume);
    } else {
      res.status(404).json({ message: "Perfume not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching perfume", error });
  }
});

// 3️. Add a new perfume to MongoDB
router.post("/", async (req, res) => {
  try {
    const newPerfume = new Perfume({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });

    const savedPerfume = await newPerfume.save(); // Save to MongoDB
    res.status(201).json(savedPerfume);
  } catch (error) {
    res.status(500).json({ message: "Error adding perfume", error });
  }
});

// 4️. Delete a perfume by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPerfume = await Perfume.findByIdAndDelete(req.params.id);
    if (deletedPerfume) {
      res.status(200).json({ message: "Perfume deleted successfully" });
    } else {
      res.status(404).json({ message: "Perfume not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting perfume", error });
  }
});

// 5️. Update a perfume by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedPerfume = await Perfume.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated perfume
        );

        if (!updatedPerfume) {
            return res.status(404).json({ message: "Perfume not found" });
        }

        res.json(updatedPerfume);
    } catch (error) {
        res.status(500).json({ message: "Error updating perfume" });
    }
});


module.exports = router;
