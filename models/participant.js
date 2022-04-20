module.exports = (sequelize, DataTypes) => {
  const participant = sequelize.define('participant', {
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
  participant.associate = (models) => {
    participant.belongsTo(models.event, {
      foreignKey: {
        allowNull: false,
      },
    });
    participant.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return participant;
};
