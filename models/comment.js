module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    textContent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media: {
      type: DataTypes.STRING.BINARY,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'comments',
    timestamps: true,
  });
  comment.associate = (models) => {
    comment.hasMany(models.comment, {
      onDelete: 'cascade',
    });
    comment.hasMany(models.report, {
      onDelete: 'cascade',
    });
    comment.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
    comment.belongsTo(models.post, {
      foreignKey: {
        allowNull: false,
      },
    });
    comment.belongsTo(models.comment, {
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return comment;
};
