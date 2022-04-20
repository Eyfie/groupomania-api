module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
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
    tableName: 'posts',
    timestamps: true,
  });
  post.associate = (models) => {
    post.hasMany(models.comment, {
      onDelete: 'cascade',
    });
    post.hasMany(models.reaction, {
      onDelete: 'cascade',
    });
    post.hasMany(models.tagpost, {
      onDelete: 'cascade',
    });
    post.hasMany(models.report, {
      onDelete: 'cascade',
    });
    post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return post;
};
