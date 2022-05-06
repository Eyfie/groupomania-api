module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Reaction.associate = (models) => {
    Reaction.belongsTo(models.Post, {
      foreignKey: {
        allowNull: true,
      },
    });
    Reaction.belongsTo(models.Comment, {
      foreignKey: {
        allowNull: true,
      },
    });
    Reaction.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Reaction;
};
