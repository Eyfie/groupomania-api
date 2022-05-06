module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    textcontent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    media: {
      type: DataTypes.STRING.BINARY,
      allowNull: true,
    },
  });
  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      onDelete: 'cascade',
    });
    Post.hasMany(models.Reaction, {
      onDelete: 'cascade',
    });
    Post.belongsToMany(models.Tagpost, {
      through: 'PostsHasTags',
    });
    Post.hasMany(models.Report, {
      onDelete: 'cascade',
    });
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Post;
};
