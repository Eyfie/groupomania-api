module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Reaction.associate = (models) => {
    Reaction.belongsTo(models.Post, {
      onDelete: 'CASCADE',
    });
    Reaction.belongsTo(models.Comment, {
      onDelete: 'CASCADE',
    });
    Reaction.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
  };
  return Reaction;
};
