const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const BlogPost = sequelize.define(
  "BlogPost",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [5, 200],
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, // URL-friendly slug
      },
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    featuredImage: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
    },
    status: {
      type: DataTypes.ENUM("draft", "published", "archived"),
      defaultValue: "draft",
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    metaTitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    readTime: {
      type: DataTypes.INTEGER,
      comment: "Estimated reading time in minutes",
      defaultValue: 5,
    },
  },
  {
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ["status"],
      },
      {
        fields: ["published_at"],
      },
      {
        fields: ["tags"],
        using: "GIN",
        operator: "jsonb_ops",
      },
    ],
    hooks: {
      beforeValidate: (post) => {
        // Auto-generate slug from title if not provided
        if (post.title && !post.slug) {
          post.slug = post.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "") // Remove special characters
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/--+/g, "-") // Replace multiple - with single -
            .trim();
        }

        // Set publishedAt when status changes to published
        if (
          post.changed("status") &&
          post.status === "published" &&
          !post.publishedAt
        ) {
          post.publishedAt = new Date();
        }
      },
    },
  },
);

module.exports = BlogPost;
