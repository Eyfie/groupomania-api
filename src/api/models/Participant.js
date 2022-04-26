module.exports = (sequelize, DataTypes) => {
  const Participant = sequelize.define('Participant', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    tableName: 'participants',
    timestamps: false,
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
