module.exports = (sequelize, DataTypes) => {
  const tagpost = sequelize.define('tagpost', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  tagpost.associate = (models) => {
    tagpost.belongsToMany(models.post, {
      through: 'postHasTag',
    });
  };
  return tagpost;
};
