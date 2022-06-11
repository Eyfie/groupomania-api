module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    textcontent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media: {
      type: DataTypes.STRING.BINARY,
      allowNull: true,
    },
  });
  Comment.associate = (models) => {
    Comment.hasMany(models.Report, {
      onDelete: 'CASCADE',
    });
    Comment.hasMany(models.Reaction, {
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
    Comment.belongsTo(models.Post, {
      onDelete: 'CASCADE',
    });
  };
  return Comment;
};
