module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tablename: 'reactions',
    timestamps: false,
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
