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
      onDelete: 'CASCADE',
    });
    Post.hasMany(models.Reaction, {
      onDelete: 'CASCADE',
    });
    Post.belongsToMany(models.Tagpost, {
      through: 'PostsHasTags',
    });
    Post.hasMany(models.Report, {
      onDelete: 'CASCADE',
    });
    Post.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
  };
  return Post;
};
