module.exports = (sequelize, DataTypes) => {
  const Tagpost = sequelize.define('Tagpost', {
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
  Tagpost.associate = (models) => {
    Tagpost.belongsToMany(models.Post, {
      through: 'postHasTag',
    });
  };
  return Tagpost;
};
