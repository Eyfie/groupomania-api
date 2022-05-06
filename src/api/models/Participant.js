module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Participant.associate = (models) => {
    Participant.belongsTo(models.Event, {
      foreignKey: {
        allowNull: false,
      },
    });
    Participant.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Participant;
};
