module.exports = (sequelize, DataTypes) => {
  const Tagpro = sequelize.define('Tagpro', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Tagpro.associate = (models) => {
    Tagpro.belongsToMany(models.User, {
      through: 'UsersHasTags',
    });
  };
  return Tagpro;
};
