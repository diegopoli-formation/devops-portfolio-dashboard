const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [2, 50],
    },
  },
  category: {
    type: DataTypes.ENUM(
      'programming',
      'devops',
      'cloud',
      'tools',
      'methodologies',
      'other'
    ),
    allowNull: false,
    defaultValue: 'other',
  },
  proficiency: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
    defaultValue: 5,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Font Awesome or other icon class names',
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, // Matches hex color codes
    },
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  underscored: true,
  indexes: [
    {
      fields: ['category'],
    },
    {
      fields: ['is_featured'],
    },
  ],
});

module.exports = Skill;
