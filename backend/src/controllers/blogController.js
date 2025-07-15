const { BlogPost } = require('../db/models');
const { Op } = require('sequelize');
const slugify = require('slugify');

// Get all blog posts with optional filtering and pagination
exports.getAllPosts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status = 'published', 
      tag,
      search,
      includeDrafts = false
    } = req.query;
    
    const offset = (page - 1) * limit;
    
    // Build where clause
    const where = {};
    
    // Only include published posts by default, unless overridden for admin
    if (!includeDrafts || includeDrafts === 'false') {
      where.status = 'published';
    } else if (status) {
      where.status = status;
    }
    
    if (tag) where.tags = { [Op.contains]: [tag] };
    
    // Add search functionality
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { tags: { [Op.overlap]: [search] } }
      ];
    }
    
    const { count, rows: posts } = await BlogPost.findAndCountAll({
      where,
      order: [['publishedAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    const totalPages = Math.ceil(count / limit);
    
    res.json({
      success: true,
      data: posts,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    });
    
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog posts',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get a single blog post by ID or slug
exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findOne({
      where: {
        [Op.or]: [
          { id: isNaN(id) ? null : parseInt(id) },
          { slug: id }
        ]
      }
    });
    
    if (!post || (post.status !== 'published' && !req.user?.role === 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found or not published'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
    
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create a new blog post (admin only)
exports.createPost = async (req, res) => {
  try {
    const postData = req.body;
    
    // Generate slug from title if not provided
    if (postData.title && !postData.slug) {
      postData.slug = slugify(postData.title, { 
        lower: true,
        strict: true,
        remove: /[^\w\s-]/g
      });
    }
    
    // Set default values if not provided
    if (!postData.tags) postData.tags = [];
    if (!postData.status) postData.status = 'draft';
    
    // Set publishedAt if status is published and not already set
    if (postData.status === 'published' && !postData.publishedAt) {
      postData.publishedAt = new Date();
    }
    
    const post = await BlogPost.create(postData);
    
    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: post
    });
    
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update a blog post (admin only)
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const post = await BlogPost.findByPk(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Generate new slug if title was changed
    if (updateData.title && updateData.title !== post.title) {
      updateData.slug = slugify(updateData.title, { 
        lower: true,
        strict: true,
        remove: /[^\w\s-]/g
      });
    }
    
    // Set publishedAt if status is being changed to published
    if (updateData.status === 'published' && post.status !== 'published') {
      updateData.publishedAt = new Date();
    }
    
    // Update post with new data
    Object.assign(post, updateData);
    await post.save();
    
    res.json({
      success: true,
      message: 'Blog post updated successfully',
      data: post
    });
    
  } catch (error) {
    console.error('Error updating blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Delete a blog post (admin only)
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await BlogPost.findByPk(id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    await post.destroy();
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting blog post:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get blog post tags
exports.getPostTags = async (req, res) => {
  try {
    const tags = await BlogPost.aggregate('tags', 'DISTINCT', { 
      plain: false,
      where: {
        tags: { [Op.ne]: null },
        status: 'published'
      }
    });
    
    // Flatten and deduplicate tags
    const allTags = [];
    tags.forEach(tagArray => {
      if (tagArray.DISTINCT && Array.isArray(tagArray.DISTINCT)) {
        allTags.push(...tagArray.DISTINCT);
      }
    });
    
    const uniqueTags = [...new Set(allTags)];
    
    res.json({
      success: true,
      data: uniqueTags
    });
    
  } catch (error) {
    console.error('Error fetching blog post tags:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post tags',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
