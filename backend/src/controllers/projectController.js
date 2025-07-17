const { Project } = require("../db/models");
const { Op } = require("sequelize");

// Get all projects with optional filtering and pagination
exports.getAllProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, isFeatured, tag, search } = req.query;

    const offset = (page - 1) * limit;

    // Build where clause
    const where = {};

    if (status) where.status = status;
    if (isFeatured !== undefined) where.isFeatured = isFeatured === "true";
    if (tag) where.tags = { [Op.contains]: [tag] };

    // Add search functionality
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { tags: { [Op.overlap]: [search] } },
      ];
    }

    const { count, rows: projects } = await Project.findAndCountAll({
      where,
      order: [
        ["order", "ASC"],
        ["createdAt", "DESC"],
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      success: true,
      data: projects,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get a single project by ID or slug
exports.getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findOne({
      where: {
        [Op.or]: [{ id: isNaN(id) ? null : parseInt(id) }, { slug: id }],
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching project",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Create a new project (admin only)
exports.createProject = async (req, res) => {
  try {
    const projectData = req.body;

    // Set default values if not provided
    if (!projectData.tags) projectData.tags = [];
    if (!projectData.status) projectData.status = "completed";
    if (projectData.isFeatured === undefined) projectData.isFeatured = false;

    const project = await Project.create(projectData);

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Error creating project",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update a project (admin only)
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Update project with new data
    Object.assign(project, updateData);
    await project.save();

    res.json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Error updating project",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete a project (admin only)
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByPk(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting project",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get project tags
exports.getProjectTags = async (req, res) => {
  try {
    const tags = await Project.aggregate("tags", "DISTINCT", {
      plain: false,
      where: {
        tags: { [Op.ne]: null },
      },
    });

    // Flatten and deduplicate tags
    const allTags = [];
    tags.forEach((tagArray) => {
      if (tagArray.DISTINCT && Array.isArray(tagArray.DISTINCT)) {
        allTags.push(...tagArray.DISTINCT);
      }
    });

    const uniqueTags = [...new Set(allTags)];

    res.json({
      success: true,
      data: uniqueTags,
    });
  } catch (error) {
    console.error("Error fetching project tags:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching project tags",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
