module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'posts',
    timestamps: true,
  });
  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      onDelete: 'cascade',
    });
    Post.hasMany(models.Reaction, {
      onDelete: 'cascade',
    });
    Post.hasMany(models.Tagpost, {
      onDelete: 'cascade',
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
