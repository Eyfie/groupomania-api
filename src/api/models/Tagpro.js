module.exports = (sequelize, DataTypes) => {
  const Tagpro = sequelize.define('Tagpro', {
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
  }, {
    timestamps: false,
  });
  Tagpro.associate = (models) => {
    Tagpro.belongsToMany(models.User, {
      through: 'userHasTag',
    });
  };
  return Tagpro;
};
