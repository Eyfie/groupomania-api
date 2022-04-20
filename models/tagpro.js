module.exports = (sequelize, DataTypes) => {
  const tagpro = sequelize.define('tagpro', {
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
  tagpro.associate = (models) => {
    tagpro.belongsToMany(models.user, {
      through: 'userHasTag',
    });
  };
  return tagpro;
};
