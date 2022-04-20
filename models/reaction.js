module.exports = (sequelize, DataTypes) => {
  const reaction = sequelize.define('reaction', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    reactionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tablename: 'reactions',
    timestamps: true,
  });
  reaction.associate = (models) => {
    reaction.belongsTo(models.post, {
      foreignKey: {
        allowNull: true,
      },
    });
    reaction.belongsTo(models.comment, {
      foreignKey: {
        allowNull: true,
      },
    });
  };
  return reaction;
};
