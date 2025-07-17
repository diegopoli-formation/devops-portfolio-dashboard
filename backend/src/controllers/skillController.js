const { Skill } = require("../db/models");
const { Op } = require("sequelize");

// Get all skills with optional filtering
exports.getAllSkills = async (req, res) => {
  try {
    const { category, isFeatured, search } = req.query;

    // Build where clause
    const where = {};

    if (category) where.category = category;
    if (isFeatured !== undefined) where.isFeatured = isFeatured === "true";

    // Add search functionality
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { category: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const skills = await Skill.findAll({
      where,
      order: [
        ["order", "ASC"],
        ["name", "ASC"],
      ],
    });

    // Group skills by category
    const skillsByCategory = skills.reduce((acc, skill) => {
      const category = skill.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});

    res.json({
      success: true,
      data: skillsByCategory,
      categories: Object.keys(skillsByCategory),
    });
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching skills",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get a single skill by ID
exports.getSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByPk(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    res.json({
      success: true,
      data: skill,
    });
  } catch (error) {
    console.error("Error fetching skill:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching skill",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Create a new skill (admin only)
exports.createSkill = async (req, res) => {
  try {
    const skillData = req.body;

    // Set default values if not provided
    if (!skillData.category) skillData.category = "other";
    if (!skillData.proficiency) skillData.proficiency = 5;
    if (skillData.isFeatured === undefined) skillData.isFeatured = false;

    const skill = await Skill.create(skillData);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Error creating skill:", error);
    res.status(500).json({
      success: false,
      message: "Error creating skill",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update a skill (admin only)
exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const skill = await Skill.findByPk(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    // Update skill with new data
    Object.assign(skill, updateData);
    await skill.save();

    res.json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    console.error("Error updating skill:", error);
    res.status(500).json({
      success: false,
      message: "Error updating skill",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete a skill (admin only)
exports.deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    const skill = await Skill.findByPk(id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    await skill.destroy();

    res.json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting skill:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting skill",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get skill categories
exports.getSkillCategories = async (req, res) => {
  try {
    const categories = await Skill.aggregate("category", "DISTINCT", {
      plain: false,
    });

    const categoryList = categories.map((cat) => cat.DISTINCT);

    res.json({
      success: true,
      data: categoryList,
    });
  } catch (error) {
    console.error("Error fetching skill categories:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching skill categories",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
