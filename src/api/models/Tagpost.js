module.exports = (sequelize, DataTypes) => {
  const Tagpost = sequelize.define('Tagpost', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Tagpost.associate = (models) => {
    Tagpost.belongsToMany(models.Post, {
      through: 'PostsHasTags',
    });
  };
  return Tagpost;
};
