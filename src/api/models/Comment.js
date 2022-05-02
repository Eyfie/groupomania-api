module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    textcontent: {
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
  Comment.associate = (models) => {
    Comment.hasMany(models.Report, {
      onDelete: 'cascade',
    });
    Comment.hasMany(models.Reaction, {
      onDelete: 'cascade',
    });
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Comment;
};
