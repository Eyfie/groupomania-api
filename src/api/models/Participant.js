module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Participant.associate = (models) => {
    Participant.belongsTo(models.Event, {
      onDelete: 'CASCADE',
    });
    Participant.belongsTo(models.User, {
      onDelete: 'CASCADE',
    });
  };
  return Participant;
};
